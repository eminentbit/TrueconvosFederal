import {
  ChartIcon,
  ChipIcon,
  CloudIcon,
  ClusterIcon,
  PulseIcon,
  ShieldCheckIcon,
  type IconComponent,
} from "@/components/icons";

export interface Capability {
  title: string;
  description: string;
  icon: IconComponent;
}

export const capabilities = [
  {
    title: "Cloud Migration & Infrastructure as Code",
    description:
      "AWS-to-Azure and on-prem-to-cloud migrations built with Terraform. Repeatable, auditable environments from day one.",
    icon: CloudIcon,
  },
  {
    title: "Kubernetes & Platform Engineering",
    description:
      "Container platforms on Kubernetes with Helm. Hardened clusters, self-service deployment and secure application gateways.",
    icon: ClusterIcon,
  },
  {
    title: "CI/CD & Automation",
    description:
      "GitLab pipelines and Ansible automation that cut manual work and make every release consistent and traceable.",
    icon: PulseIcon,
  },
  {
    title: "Identity, Access & Security",
    description:
      "Entra ID access management, virtual desktop (AVD) environments and least-privilege controls for regulated workloads.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Observability & Operations",
    description:
      "Monitoring and alerting with New Relic and cloud-native tools, so issues are caught and fixed before users notice.",
    icon: ChartIcon,
  },
  {
    title: "MLOps & AI Infrastructure",
    description:
      "Pipelines and infrastructure to deploy, monitor and govern machine-learning models in secure environments.",
    icon: ChipIcon,
  },
] as const satisfies readonly Capability[];
