export interface Highlight {
  value: string;
  label: string;
}

/** "At a glance" proof strip under the hero. */
export const highlights = [
  { value: "4 years", label: "Continuous federal delivery (VA)" },
  { value: "Public Trust", label: "Active VA Public Trust personnel" },
  { value: "AWS · Azure", label: "Multi-cloud build and migration" },
  { value: "Small Business", label: "Agile, senior-led delivery" },
] as const satisfies readonly Highlight[];
