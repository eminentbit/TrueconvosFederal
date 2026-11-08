import { Container } from "@/components/ui";
import { highlights } from "@/content/highlights";

export function ProofStrip() {
  return (
    <section aria-label="At a glance" className="border-b border-line">
      <Container>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-8 py-10">
          {highlights.map((item) => (
            <li key={item.value} className="flex flex-col gap-1.5">
              <span className="text-stat font-extrabold">{item.value}</span>
              <span className="text-ui text-muted">{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
