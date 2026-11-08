import { Container } from "@/components/ui";
import { company } from "@/config/site";

export function TopBar() {
  return (
    <div className="bg-brand text-sm text-on-brand-muted">
      <Container className="flex flex-wrap justify-between gap-x-6 gap-y-2 py-2.5">
        <span>
          {company.businessSize} · {company.registration}
        </span>
        <span>
          UEI: {company.uei} · CAGE: {company.cage}
        </span>
      </Container>
    </div>
  );
}
