export interface Assignment {
  role: string;
  organization: string;
  period: string;
}

export interface Person {
  id: string;
  name: string;
  title: string;
  federalExperience: readonly Assignment[];
}

// TODO: replace the [Name] / [Title] placeholders before launch.
export const keyPersonnel = [
  {
    id: "lead-engineer",
    name: "[Name]",
    title: "[Title]",
    federalExperience: [
      {
        role: "DevSecOps & SOAR Integration Engineer",
        organization: "Department of Homeland Security (DHS), via FedITC",
        period: "Jan 2024 – Jul 2025",
      },
    ],
  },
] as const satisfies readonly Person[];
