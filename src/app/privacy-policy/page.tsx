import type { Metadata } from "next";
import { LegalPageShell, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Preliminary privacy information for the Practice Care Source website. This page is a draft pending business and legal review.",
  robots: { index: false, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: "1. Who operates this website",
    paragraphs: [
      "This website is presented under the name Practice Care Source. The legal entity or individual responsible for operating the business, its registered address, and the jurisdictions in which it operates have not yet been confirmed for publication. Those details must be completed and reviewed before this draft is treated as an effective privacy notice.",
      "For general website inquiries, the currently configured public contact address is info@practicecaresource.com.",
    ],
  },
  {
    heading: "2. Information that may be submitted",
    paragraphs: [
      "The contact form is designed for general business inquiries. It asks for a name, practice or organization name, email address, phone number, a free-text practice specialty, a service of interest, a message, and permission to be contacted about the inquiry.",
      "Do not enter patient names, dates of birth, medical record details, insurance identifiers, protected health information (PHI), or other sensitive patient information. The form includes a limited check for some obvious identifier patterns, but that check cannot recognize every form of sensitive or patient-specific information and is not a substitute for the warning.",
      "When the website is accessed or a form is submitted, the hosting and infrastructure services used to deliver the site may process technical request information such as an IP address, browser details, request time, and security logs. The exact hosting provider, log contents, and retention settings must be confirmed by the site operator.",
    ],
  },
  {
    heading: "3. How inquiry information is used",
    paragraphs: [
      "Information submitted through the contact form is intended to let Practice Care Source review and respond to a business inquiry, understand the service being explored, and communicate about the request. The form's contact-permission checkbox records the visitor's agreement to be contacted about that inquiry.",
      "The website may also process technical information to deliver pages, diagnose failures, and help protect the inquiry form against automated or abusive submissions. The final purposes and any additional uses must be confirmed by the business before publication.",
    ],
  },
  {
    heading: "4. Email and security service providers",
    paragraphs: [
      "The contact workflow is designed to use Resend to send an inquiry notification to the configured business inbox and to attempt a separate receipt email to the address entered by the visitor. These email workflows operate only when valid service credentials and a verified sender are configured. The business must confirm its active provider account, settings, and applicable vendor terms.",
      "Cloudflare Turnstile is an optional form security integration. If both its public site key and matching server secret are configured, the form displays a security challenge and the server asks Cloudflare to verify the response. If Turnstile is not configured, this additional challenge is not active.",
      "Service providers may process information on behalf of the website to supply email, hosting, delivery, and security services. The operator must confirm the providers actually in use, their processing locations, contracts, and any required disclosures before approving this policy.",
    ],
  },
  {
    heading: "5. Browser storage and privacy preferences",
    paragraphs: [
      "The privacy-preferences control stores the visitor's selection in browser local storage so that the choice can be remembered on that browser. The preference records whether optional analytics would be allowed if they are introduced later. It is not a contact-form cookie and does not store the message or other inquiry details.",
      "The current application configuration does not enable an analytics integration. Saving an 'allow optional analytics' preference therefore does not activate tracking or load an analytics script. Any future analytics integration should read the saved preference before it is initialized, and this notice should be updated to identify the technology and data involved.",
      "A visitor can reopen the privacy-preferences panel using the Privacy preferences control displayed at the bottom of the page and change the saved choice. Clearing browser storage may also remove the saved preference.",
    ],
  },
  {
    heading: "6. Sharing, transfers, and retention",
    paragraphs: [
      "The website's contact workflow may pass inquiry information to the configured email service and to infrastructure providers that support the website. This draft does not claim that information is never shared, sold, or transferred, because the business's complete vendor and data-flow arrangements have not been confirmed.",
      "No approved retention schedule, deletion process, or international-transfer description has been supplied for this draft. The business must document how long inquiries and technical logs are retained, how deletion requests are handled, and whether service providers process information in other countries. Do not rely on this draft as a complete description until those details are confirmed.",
    ],
  },
  {
    heading: "7. Requests and questions",
    paragraphs: [
      "For a question about a website inquiry or privacy preference, contact info@practicecaresource.com. The business should confirm a process for receiving, verifying, and responding to requests to access, correct, or delete personal information, and should explain any applicable legal limits.",
      "Available rights and response requirements depend on the laws that apply to the visitor and the website operator. This draft does not determine which jurisdiction-specific rights apply or promise a particular response period.",
    ],
  },
  {
    heading: "8. Information security",
    paragraphs: [
      "Do not use this website form or the general inquiry email to send patient records or confidential practice information. Before discussing access to a practice system or sharing confidential information, ask Practice Care Source to confirm the safeguards and written agreements that apply to the proposed work.",
      "This website does not claim a security certification, HIPAA certification, or a particular contractual status. The published security page is a discussion checklist, not a certification or compliance statement.",
    ],
  },
  {
    heading: "9. Updates to this notice",
    paragraphs: [
      "This preliminary notice may need to change when the business confirms its legal identity, jurisdictions, vendors, data-retention practices, and website technologies. The final notice should show an accurate effective or last-updated date after it has been reviewed and approved.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      summary="A preliminary explanation of information the Practice Care Source website may receive through general business inquiries and privacy preferences."
      sections={sections}
    />
  );
}
