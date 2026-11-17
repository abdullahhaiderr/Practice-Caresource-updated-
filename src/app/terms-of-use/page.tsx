import type { Metadata } from "next";
import { LegalPageShell, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Preliminary terms for using the Practice Care Source website. This page is a draft pending business and legal review.",
  robots: { index: false, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: "1. Draft status and acceptance",
    paragraphs: [
      "These terms are a preliminary website-content draft for Practice Care Source. They have not been approved by the business or reviewed for a particular jurisdiction. The legal operator, governing law, dispute process, and any mandatory consumer notices must be confirmed with qualified counsel before these terms are treated as final.",
      "Using this website does not create a client, supplier, employment, agency, or other professional relationship with Practice Care Source.",
    ],
  },
  {
    heading: "2. Website information is general",
    paragraphs: [
      "The website and resource library provide general information about business workflows and services that may be relevant to healthcare practices. They are not medical, legal, tax, coding, reimbursement, payer, or other professional advice for a particular situation.",
      "Requirements and processes may vary by payer, plan, location, contract, and circumstances. Verify current requirements with the relevant source and consult appropriately qualified advisers before making operational, clinical, financial, or legal decisions.",
    ],
  },
  {
    heading: "3. Services require a separate agreement",
    paragraphs: [
      "Descriptions of medical billing, credentialing and enrollment, virtual assistant services, AR recovery, denial management, and website development are general descriptions of areas the website currently presents. They are not an offer, guarantee of availability, or promise that a particular task is included in a service.",
      "Any engagement should be governed by a separate written agreement that defines the parties, scope, responsibilities, fees, timelines, information access, confidentiality, security requirements, and any other terms that apply. No service begins, and no access to practice systems should be granted, solely because someone submits the website contact form.",
    ],
  },
  {
    heading: "4. Contact form and information you provide",
    paragraphs: [
      "The contact form is only for general business inquiries. Do not submit patient names, dates of birth, medical record details, insurance identifiers, protected health information (PHI), confidential practice records, passwords, or other sensitive information through the form or general inquiry email.",
      "You should provide contact information that you are authorized to share and keep it accurate. Submitting an inquiry gives the business permission to contact you about that inquiry only where you have selected the required contact-permission option. Contact-form submissions do not establish an agreement for services.",
    ],
  },
  {
    heading: "5. Acceptable website use",
    paragraphs: [
      "Do not knowingly interfere with the operation or security of the website, attempt unauthorized access, introduce malicious code, misuse the contact form, or use the website in a way that violates applicable law or another person's rights.",
      "Do not treat information on this website as a substitute for current payer instructions, professional advice, or an agreement that has been signed by the relevant parties.",
    ],
  },
  {
    heading: "6. Content, links, and availability",
    paragraphs: [
      "The website may contain links to third-party sites or services. Those destinations are not controlled by this website operator, and visitors should review the relevant third party's own terms and privacy information.",
      "Pages and resource materials may be updated, changed, or removed. The website may not always be available or free from errors. The business should confirm the rights and permissions for all logos, images, text, and other materials before publication.",
    ],
  },
  {
    heading: "7. Warranties, liability, and applicable law",
    paragraphs: [
      "This draft does not attempt to define enforceable warranty exclusions, liability limits, indemnities, dispute procedures, or governing law. Those provisions can depend on the legal operator, contract structure, the services offered, and mandatory laws in relevant jurisdictions. They must be prepared or approved by qualified counsel rather than inferred from this generic website draft.",
      "Nothing in a final version should be used to remove a right or protection that cannot lawfully be excluded or limited.",
    ],
  },
  {
    heading: "8. Changes and contact",
    paragraphs: [
      "The final terms should be reviewed when the website, business offerings, or applicable requirements change. Add an accurate effective date and a process for notifying visitors if required by the applicable law.",
      "For general questions about the website, contact info@practicecaresource.com. Do not send patient information or confidential records in that message.",
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalPageShell
      title="Terms of Use"
      summary="Preliminary terms for browsing the Practice Care Source website, reading general resources, and submitting a business inquiry."
      sections={sections}
    />
  );
}
