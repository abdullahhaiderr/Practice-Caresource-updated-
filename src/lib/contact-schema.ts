import { z } from "zod";

export const serviceOptions = [
  "Medical Billing",
  "Credentialing & Enrollment",
  "Virtual Assistant Services",
  "AR Recovery",
  "Denial Management",
  "Website Development",
  "Not sure yet",
] as const;

/**
 * Website contact requests are limited to general business inquiries.
 * Phone and practice specialty are optional to keep the first enquiry low friction.
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Name must be 100 characters or fewer."),
  practiceName: z
    .string()
    .trim()
    .min(2, "Enter your practice name.")
    .max(120, "Practice name must be 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email address is too long."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or fewer.")
    .refine(
      (value) => value.length === 0 || (value.length >= 7 && /^[+0-9().\-\s]+$/.test(value)),
      "Enter a valid phone number or leave this field blank.",
    ),
  specialty: z
    .string()
    .trim()
    .max(120, "Specialty must be 120 characters or fewer."),
  serviceInterestedIn: z
    .string()
    .min(1, "Choose a service or select Not sure yet.")
    .refine(
      (value) => serviceOptions.includes(value as (typeof serviceOptions)[number]),
      { message: "Choose a service from the list." },
    ),
  message: z
    .string()
    .trim()
    .min(20, "Add a little more detail so we can understand your request.")
    .max(2000, "Message must be 2,000 characters or fewer."),
  consent: z.boolean().refine((value) => value, {
    message: "Please confirm that Practice Care Source may contact you about this inquiry.",
  }),
  website: z.string().max(200).optional(),
  turnstileToken: z.string().trim().max(2048).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
