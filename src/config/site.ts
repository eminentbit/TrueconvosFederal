/**
 * Company facts reused across the page (top bar, company data, footer).
 * Update here once; every section picks it up.
 */
export const company = {
  brandName: "TrueConvos Federal",
  legalName: "TrueConvos LLC",
  dba: "TrueConvos LLC, d/b/a TrueConvos Federal",
  uei: "MPYJRF59JTH3",
  cage: "9GYL7",
  businessSize: "Small Business",
  registration: "Registered in SAM.gov",
  naics: ["541512", "541519", "541511"],
  contact: {
    email: "bd@trueconvos.com",
    phone: { display: "737-320-8300", href: "tel:+17373208300" },
    location: "Frederick, Maryland",
  },
} as const;

export const primaryNaics = company.naics[0];

/** Served from /public — drop the PDF there with this exact file name. */
export const capabilityStatementUrl = `${import.meta.env.BASE_URL}TrueConvos-Federal-Capability-Statement.pdf`;
