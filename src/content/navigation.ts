export interface NavLink {
  label: string;
  href: `#${string}`;
}

/** In-page anchors; each `href` must match a section `id` (see App.test.tsx). */
export const primaryNav = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Past Performance", href: "#past-performance" },
  { label: "Key Personnel", href: "#key-personnel" },
  { label: "Company Data", href: "#company-data" },
] as const satisfies readonly NavLink[];

export const contactCta = {
  label: "Contact Us",
  href: "#contact",
} as const satisfies NavLink;
