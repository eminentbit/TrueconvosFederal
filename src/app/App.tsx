import { SiteFooter, SiteHeader, SkipLink, TopBar } from "@/components/layout";
import {
  Capabilities,
  CompanyData,
  Contact,
  Hero,
  KeyPersonnel,
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
        <KeyPersonnel />
        <CompanyData />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
