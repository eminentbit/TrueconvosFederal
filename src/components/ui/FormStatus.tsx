import type { FormStatus as Status } from "@/hooks/useWeb3Forms";
import { cn } from "@/lib/cn";

interface FormStatusProps {
  status: Status;
  message: string;
  /** Surface the form sits on — picks readable colors. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Polite live region for submission feedback. Always rendered (even when
 * empty) so screen readers are already observing it when the message changes.
 * Has no `name`, so it is never submitted with the form.
 */
export function FormStatus({
  status,
  message,
  tone = "light",
  className,
}: FormStatusProps) {
  const isError = status === "error";

  return (
    // <output> carries an implicit role="status"; aria-live is explicit for
    // screen readers that don't map it.
    <output
      aria-live="polite"
      className={cn(
        "block min-h-5.5 text-ui",
        tone === "dark"
          ? isError
            ? "text-danger-on-brand"
            : "text-white"
          : isError
            ? "text-danger"
            : "text-brand",
        className,
      )}
    >
      {message}
    </output>
  );
}
