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
 * The specialty is free text because the supported-specialty list has not
 * been confirmed by the business.
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
    .min(7, "Enter a phone number with at least 7 characters.")
    .max(30, "Phone number must be 30 characters or fewer.")
    .regex(/^[+0-9().\-\s]+$/, "Use numbers and common phone symbols only."),
  specialty: z
    .string()
    .trim()
    .min(2, "Enter your practice specialty.")
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
