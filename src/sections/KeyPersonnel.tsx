import { Section, SectionHeading } from "@/components/ui";
import { keyPersonnel } from "@/content/personnel";

export function KeyPersonnel() {
  return (
    <Section
      id="key-personnel"
      tone="muted"
      aria-labelledby="key-personnel-heading"
      className="border-b border-line"
      containerClassName="flex flex-col gap-10"
    >
      <SectionHeading
        id="key-personnel-heading"
        eyebrow="Key personnel"
        title="Who you'll work with"
      />

      {keyPersonnel.map((person) => (
        <article
          key={person.id}
          className="flex flex-wrap gap-8 rounded-lg border border-line bg-white p-6 sm:p-8"
        >
          <div className="flex flex-[1_1_260px] flex-col gap-1.5">
            <h3 className="text-2xl font-bold">{person.name}</h3>
            <p className="text-muted">{person.title}</p>
          </div>

          <div className="flex flex-[2_1_420px] flex-col gap-3.5">
            <h4 className="text-label font-normal tracking-label text-muted uppercase">
              Federal experience
            </h4>
            <ul className="flex flex-col gap-4">
              {person.federalExperience.map((assignment) => (
                <li
                  key={`${assignment.role}-${assignment.period}`}
                  className="border-l-3 border-accent pl-4"
                >
                  <p className="text-lg font-semibold">{assignment.role}</p>
                  <p className="mt-1 leading-relaxed text-body">
                    {assignment.organization} · {assignment.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </Section>
  );
}
