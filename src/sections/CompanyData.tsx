import { DescriptionItem, Section, SectionHeading } from "@/components/ui";
import { capabilityStatementUrl, company } from "@/config/site";

const companyFacts = [
  { term: "Legal name", value: company.legalName },
  { term: "UEI", value: company.uei },
  { term: "CAGE", value: company.cage },
  { term: "Business size", value: company.businessSize },
  { term: "Primary NAICS", value: company.naics.join(" · ") },
] as const;

export function CompanyData() {
  return (
    <Section
      id="company-data"
      aria-labelledby="company-data-heading"
      containerClassName="flex flex-wrap gap-12"
    >
      <div className="flex flex-[1_1_340px] flex-col gap-4">
        <SectionHeading
          id="company-data-heading"
          eyebrow="Company data"
          title="Ready to team"
        />
        <p className="text-lead leading-relaxed text-body">
          We support primes as a subcontractor and teaming partner, and staff
          individual seats on existing task orders.
        </p>
        <a
          id="capability-statement"
          href={capabilityStatementUrl}
          download
          className="mt-2 self-start text-lead font-semibold"
        >
          Download our capability statement (PDF){" "}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <dl className="grid flex-[2_1_520px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] border-t border-line">
        {companyFacts.map((fact) => (
          <DescriptionItem
            key={fact.term}
            term={fact.term}
            className="border-b border-line py-5"
          >
            {fact.value}
          </DescriptionItem>
        ))}
      </dl>
    </Section>
  );
}
