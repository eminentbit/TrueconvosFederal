import { AccentRule, ButtonLink, Section } from "@/components/ui";
import { capabilityStatementUrl } from "@/config/site";

export function Hero() {
  return (
    <Section
      id="top"
      tone="muted"
      aria-labelledby="hero-heading"
      className="border-b border-line"
      containerClassName="flex flex-col gap-7 md:pt-24 md:pb-22"
    >
      <AccentRule />
      <h1
        id="hero-heading"
        className="max-w-headline text-display font-extrabold"
      >
        DevOps, cloud and platform engineering for federal missions.
      </h1>
      <p className="max-w-narrow text-xl leading-relaxed text-body">
        We build, migrate and run secure cloud infrastructure for government
        programs. Four years of hands-on delivery supporting the Department of
        Veterans Affairs as a subcontractor to a large federal prime.
      </p>
      <p className="flex max-w-narrow items-start gap-3 rounded-md border border-l-4 border-line border-l-accent bg-white px-4.5 py-3.5 text-lead leading-normal font-semibold">
        <span
          aria-hidden="true"
          className="mt-2 size-2.5 flex-none rounded-full bg-success"
        />
        <span>
          Available corp-to-corp and as a subcontractor; one senior engineer
          available now, up to three in 30–60 days.
        </span>
      </p>
      <div className="mt-2 flex flex-wrap gap-4">
        <ButtonLink href="#contact">Partner with us</ButtonLink>
        <ButtonLink href={capabilityStatementUrl} download variant="outline">
          Download capability statement
        </ButtonLink>
      </div>
    </Section>
  );
}
