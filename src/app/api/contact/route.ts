import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_TRACKED_CLIENTS = 2000;
const MAX_BODY_BYTES = 20_000;

// Best-effort per-process protection. Serverless instances do not share this Map;
// use a provider-level WAF or shared rate-limit store for a distributed limit.
type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitEntries = new Map<string, RateLimitEntry>();

function getClientKey(request: NextRequest) {
  const directIp = request.headers.get("x-real-ip")?.trim();
  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return directIp || forwardedIp || "unknown-client";
}

function checkRateLimit(clientKey: string, now = Date.now()) {
  for (const [key, entry] of rateLimitEntries) {
    if (entry.resetAt <= now) rateLimitEntries.delete(key);
  }

  const current = rateLimitEntries.get(clientKey);
  if (!current || current.resetAt <= now) {
    if (rateLimitEntries.size >= MAX_TRACKED_CLIENTS) {
      const oldestKey = rateLimitEntries.keys().next().value;
      if (oldestKey) rateLimitEntries.delete(oldestKey);
    }
    rateLimitEntries.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function jsonResponse(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAllowedOrigin(request: NextRequest) {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return true;

  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return false;
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const requestHost = forwardedHost || request.headers.get("host") || "";
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const requestProto = forwardedProto || request.nextUrl.protocol.replace(":", "");
  if (
    requestHost &&
    origin.host.toLowerCase() === requestHost.toLowerCase() &&
    origin.protocol.toLowerCase() === `${requestProto.toLowerCase()}:`
  ) {
    return true;
  }

  const canonical = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (canonical) {
    try {
      return origin.origin === new URL(canonical).origin;
    } catch {
      return false;
    }
  }

  return false;
}

async function readJsonBody(request: NextRequest): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing request body.");

  const chunks: Uint8Array[] = [];
  let byteCount = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    byteCount += value.byteLength;

    if (byteCount > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new RangeError("Request body is too large.");
    }
    chunks.push(value);
  }

  const bodyBytes = new Uint8Array(byteCount);
  let offset = 0;
  for (const chunk of chunks) {
    bodyBytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(bodyBytes)) as unknown;
}

const patientIdentifierPatterns = [
  /\b\d{3}-\d{2}-\d{4}\b/,
  /\b(?:mrn|medical record(?: number)?|patient id|member id|insurance id)\s*(?:number|no\.?)?\s*[:#-]?\s*[a-z0-9-]{4,}\b/i,
  /\b(?:dob|date of birth)\s*[:#-]?\s*(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2})/i,
];

function containsObviousPatientIdentifier(message: string) {
  return patientIdentifierPatterns.some((pattern) => pattern.test(message));
}

type TurnstileResult = "disabled" | "verified" | "invalid" | "unavailable";

async function verifyTurnstile(
  token: string | undefined,
  request: NextRequest,
): Promise<TurnstileResult> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!siteKey && !secret) return "disabled";
  if (!siteKey || !secret) return "unavailable";
  if (!token) return "invalid";

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  const clientIp = getClientKey(request);
  if (clientIp !== "unknown-client") body.set("remoteip", clientIp);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      },
    );
    if (!response.ok) return "unavailable";

    const result = (await response.json()) as {
      success?: boolean;
      hostname?: string;
    };
    if (!result.success) return "invalid";

    const requestHost =
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      request.headers.get("host") ||
      "";
    const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    const expectedHost = requestHost
      ? new URL(`http://${requestHost}`).hostname.toLowerCase()
      : configuredUrl
        ? new URL(configuredUrl).hostname.toLowerCase()
        : "";

    if (
      result.hostname &&
      expectedHost &&
      result.hostname.toLowerCase() !== expectedHost
    ) {
      return "invalid";
    }

    return "verified";
  } catch {
    return "unavailable";
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse(
      { message: "Send the form using the website contact form." },
      415,
    );
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse(
      { message: "Your message is too large. Please shorten it and try again." },
      413,
    );
  }

  if (!isAllowedOrigin(request)) {
    return jsonResponse(
      { message: "This request could not be verified. Please use the website contact form." },
      403,
    );
  }

  let body: unknown;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    if (error instanceof RangeError) {
      return jsonResponse(
        { message: "Your message is too large. Please shorten it and try again." },
        413,
      );
    }
    return jsonResponse(
      { message: "We couldn't read the form. Please review it and try again." },
      400,
    );
  }

  // Silently accept the honeypot so basic bots do not learn the field is monitored.
  if (isRecord(body) && typeof body.website === "string" && body.website.trim()) {
    return jsonResponse({
      success: true,
      message: "Thanks for contacting Practice Care Source.",
    });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const errors = Object.fromEntries(
      parsed.error.issues
        .filter((issue) => typeof issue.path[0] === "string")
        .map((issue) => [String(issue.path[0]), issue.message]),
    );
    return jsonResponse(
      {
        message: "Please review the fields marked on the form and try again.",
        errors,
      },
      400,
    );
  }

  if (containsObviousPatientIdentifier(parsed.data.message)) {
    return jsonResponse(
      {
        message: "Please remove patient-specific identifiers and resend a general business inquiry.",
        errors: {
          message: "This form cannot accept patient identifiers or patient-specific information.",
        },
      },
      400,
    );
  }

  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return jsonResponse(
      { message: "Too many messages were sent. Please wait a few minutes and try again." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) },
    );
  }

  const captchaResult = await verifyTurnstile(parsed.data.turnstileToken, request);
  if (captchaResult === "unavailable") {
    return jsonResponse(
      { message: "The security check is temporarily unavailable. Please try again later." },
      503,
    );
  }
  if (captchaResult === "invalid") {
    return jsonResponse(
      { message: "Please complete the security check and try again." },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient =
    process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.contactEmail;
  const sender = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !recipient || !sender) {
    return jsonResponse(
      { message: "Contact email is not configured yet. Please try again later." },
      503,
    );
  }

  const resend = new Resend(apiKey);
  const safeName = parsed.data.fullName.replace(/[\r\n]+/g, " ").slice(0, 100);
  const adminSubject = `Practice Care Source website inquiry from ${safeName}`;

  const adminText = [
    "New Practice Care Source website contact request",
    "",
    `Name: ${parsed.data.fullName}`,
    `Practice / organization: ${parsed.data.practiceName}`,
    `Email: ${parsed.data.email}`,
    `Phone: ${parsed.data.phone}`,
    `Practice specialty (visitor supplied): ${parsed.data.specialty}`,
    `Service of interest: ${parsed.data.serviceInterestedIn}`,
    `Contact permission: ${parsed.data.consent ? "Yes" : "No"}`,
    "",
    "Business inquiry message:",
    parsed.data.message,
    "",
    "The website form instructs visitors not to submit patient names, PHI, or sensitive patient information.",
  ].join("\n");

  try {
    const notification = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: parsed.data.email,
      subject: adminSubject,
      text: adminText,
    });

    if (notification.error || !notification.data) {
      console.error("Practice Care Source contact notification failed.");
      return jsonResponse(
        { message: "We couldn't send your request right now. Please email us directly." },
        502,
      );
    }

    let confirmationSent = false;
    try {
      const confirmation = await resend.emails.send({
        from: sender,
        to: [parsed.data.email],
        replyTo: recipient,
        subject: "We received your inquiry | Practice Care Source",
        text: [
          `Hello ${parsed.data.fullName},`,
          "",
          "Thank you for contacting Practice Care Source. We have received your business inquiry.",
          "",
          `Practice / organization: ${parsed.data.practiceName}`,
          `Service of interest: ${parsed.data.serviceInterestedIn}`,
          "",
          "Please do not reply with patient names, protected health information (PHI), or sensitive patient data.",
          "",
          "Practice Care Source",
          recipient,
        ].join("\n"),
      });
      confirmationSent = !confirmation.error && Boolean(confirmation.data);
    } catch {
      confirmationSent = false;
    }

    if (!confirmationSent) {
      console.error("Practice Care Source customer confirmation email failed.");
    }

    return jsonResponse({
      success: true,
      confirmationSent,
      message: confirmationSent
        ? "Your request has been sent. A confirmation email was sent to the address you provided."
        : "Your request has been sent to Practice Care Source, but we couldn't send an email receipt. Please keep this confirmation on screen.",
    });
  } catch {
    console.error("Practice Care Source contact email processing failed.");
    return jsonResponse(
      { message: "We couldn't send your request right now. Please email us directly." },
      502,
    );
  }
}
