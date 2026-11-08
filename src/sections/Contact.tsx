import { AccentRule, Section, SectionTitle } from "@/components/ui";
import { company } from "@/config/site";
import { ContactForm } from "@/features/contact/ContactForm";

const HEADING_ID = "contact-heading";

export function Contact() {
  const { email, phone, location } = company.contact;

  return (
    <Section
      id="contact"
      tone="muted"
      aria-labelledby={HEADING_ID}
      className="border-t border-line"
      containerClassName="flex flex-wrap items-start gap-12"
    >
      <div className="flex flex-[1_1_340px] flex-col gap-4">
        <AccentRule />
        <SectionTitle id={HEADING_ID}>Let's talk teaming</SectionTitle>
        <p className="text-lead leading-relaxed text-body">
          Primes, contracting officers and program teams — reach out for
          teaming, subcontracting or staffing needs.
        </p>
        <address className="mt-2 text-lead leading-[1.8] not-italic">
          <a href={`mailto:${email}`}>{email}</a>
          <br />
          <a href={phone.href}>{phone.display}</a>
          <br />
          {location}
        </address>
      </div>

      <ContactForm labelledBy={HEADING_ID} className="flex-[1_1_420px]" />
    </Section>
  );
}
