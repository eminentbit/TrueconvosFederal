import { Container } from "@/components/ui";
import { company, primaryNaics } from "@/config/site";
import { NewsletterForm } from "@/features/newsletter/NewsletterForm";

const UPDATES_HEADING_ID = "updates-heading";

// Evaluated once at module load (build time for the prerendered HTML) rather
// than during render, which must stay pure.
const COPYRIGHT_YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="bg-brand text-sm text-on-brand-muted">
      <Container className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 border-b border-brand-line pt-14 pb-10">
        <div className="flex max-w-130 flex-[1_1_320px] flex-col gap-2">
          <h2
            id={UPDATES_HEADING_ID}
            className="text-card-title font-bold text-white"
          >
            Get teaming updates
          </h2>
          <p className="text-base leading-relaxed">
            Occasional news on our capabilities, certifications and teaming
            opportunities.
          </p>
        </div>
        <NewsletterForm
          labelledBy={UPDATES_HEADING_ID}
          className="flex-[1_1_380px]"
        />
      </Container>

      <Container className="flex flex-wrap justify-between gap-x-8 gap-y-3 pt-6 pb-8">
        {/* Tolerate a New Year rollover between the build and a visit. */}
        <span suppressHydrationWarning>
          © {COPYRIGHT_YEAR} {company.dba}
        </span>
        <span>
          UEI {company.uei} · CAGE {company.cage} · NAICS {primaryNaics}
        </span>
      </Container>
    </footer>
  );
}
