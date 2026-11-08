import { cn } from "@/lib/cn";

/** TrueConvos Federal mark + wordmark. Matches public/favicon.svg. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <svg
        width={36}
        height={36}
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="1" y="1" width="34" height="34" rx="6" fill="#0B2545" />
        <path
          d="M10 12h16M18 12v14"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M10 27h16"
          stroke="#B8892B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-extrabold tracking-[-0.01em]">
        TrueConvos <span className="font-medium">Federal</span>
      </span>
    </span>
  );
}
