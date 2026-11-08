import { DescriptionItem, Section, SectionHeading } from "@/components/ui";
import { engagements } from "@/content/past-performance";

export function PastPerformance() {
  return (
    <Section
      id="past-performance"
      tone="brand"
      aria-labelledby="past-performance-heading"
      containerClassName="flex flex-col gap-10"
    >
      <SectionHeading
        id="past-performance-heading"
        tone="brand"
        eyebrow="Past performance"
        title="Proven on a federal health mission"
      />

      {engagements.map((engagement) => (
        <article
          key={engagement.id}
          className="flex flex-wrap gap-10 rounded-lg border border-brand-line p-6 sm:p-10"
        >
          <div className="flex flex-[2_1_420px] flex-col gap-4">
            <h3 className="text-2xl font-bold">{engagement.title}</h3>
            <p className="text-lead leading-relaxed text-on-brand">
              {engagement.summary}
            </p>
            <ul className="list-disc pl-5 leading-[1.8] text-on-brand">
              {engagement.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>

          <dl className="grid flex-[1_1_260px] content-start gap-5">
            {engagement.facts.map((fact) => (
              <DescriptionItem key={fact.term} term={fact.term} tone="brand">
                {fact.value}
              </DescriptionItem>
            ))}
          </dl>
        </article>
      ))}
    </Section>
  );
}
