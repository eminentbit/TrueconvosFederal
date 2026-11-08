import { Logo } from "@/components/brand/Logo";
import { ButtonLink, Container } from "@/components/ui";
import { contactCta, primaryNav } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <Container>
        <nav
          aria-label="Main"
          className="flex flex-wrap items-center justify-between gap-4 py-5"
        >
          <a href="#top" className="text-brand no-underline">
            <Logo />
          </a>

          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 font-medium">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="no-underline">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <ButtonLink
                href={contactCta.href}
                size="sm"
                className="font-medium"
              >
                {contactCta.label}
              </ButtonLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
