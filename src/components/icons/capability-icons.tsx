import type { ComponentType, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;
export type IconComponent = ComponentType<IconProps>;

/** 24×24 line icon drawn in `currentColor`. Decorative by default. */
function LineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CloudIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-1 9z" />
    </LineIcon>
  );
}

export function ClusterIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </LineIcon>
  );
}

export function PulseIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 12h4l2-5 4 10 2-5h4" />
    </LineIcon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </LineIcon>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 3 3 5-6" />
    </LineIcon>
  );
}

export function ChipIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </LineIcon>
  );
}
