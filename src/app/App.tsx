import { SiteFooter, SiteHeader, SkipLink, TopBar } from "@/components/layout";
import {
  Capabilities,
  CompanyData,
  Contact,
  Hero,
  PastPerformance,
  ProofStrip,
} from "@/sections";

export function App() {
  return (
    <>
      <SkipLink />
      <TopBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Capabilities />
        <PastPerformance />
        <CompanyData />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
