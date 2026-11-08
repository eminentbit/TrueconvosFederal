import { Section, SectionHeading } from "@/components/ui";
import { capabilities } from "@/content/capabilities";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      containerClassName="flex flex-col gap-12"
    >
      <SectionHeading
        id="capabilities-heading"
        eyebrow="Core capabilities"
        title="What we deliver"
      />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
        {capabilities.map(({ title, description, icon: Icon }) => (
          <li
            key={title}
            className="flex flex-col gap-3.5 rounded-lg border border-line p-6 sm:p-8"
          >
            <Icon className="text-brand" />
            <h3 className="text-card-title font-bold">{title}</h3>
            <p className="leading-relaxed text-body">{description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
