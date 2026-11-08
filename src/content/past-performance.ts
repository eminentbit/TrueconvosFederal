export interface Engagement {
  id: string;
  title: string;
  summary: string;
  outcomes: readonly string[];
  facts: readonly { term: string; value: string }[];
}

export const engagements = [
  {
    id: "va-devops",
    title: "Department of Veterans Affairs — DevOps & Cloud Engineering",
    summary:
      "Subcontractor to a large federal prime integrator. Delivered cloud infrastructure, automation and platform support for VA systems in a Public Trust position.",
    outcomes: [
      "Automated security patching across 22 servers in six environments with Ansible, saving five days per patch cycle",
      "Provisioned and maintained AWS infrastructure with Terraform; containerized production workloads on Kubernetes/Helm",
      "Four years of continuous production support with incident response and security incident management — no coverage gaps",
    ],
    facts: [
      { term: "Agency", value: "Dept. of Veterans Affairs" },
      { term: "Role", value: "Subcontractor" },
      { term: "Period", value: "2022 – Present" },
      { term: "Suitability", value: "Public Trust" },
    ],
  },
] as const satisfies readonly Engagement[];
