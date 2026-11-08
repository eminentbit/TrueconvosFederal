import { useId } from "react";

import { Button, FormStatus, Honeypot, Input } from "@/components/ui";
import { formEndpoints } from "@/config/env";
import { useFormspree } from "@/hooks/useFormspree";
import { cn } from "@/lib/cn";

interface NewsletterFormProps {
  /** Override for tests/previews; defaults to the configured Formspree form. */
  endpoint?: string | undefined;
  /** id of the visible heading that names this form. */
  labelledBy?: string;
  className?: string;
}

export function NewsletterForm({
  endpoint = formEndpoints.newsletter,
  labelledBy,
  className,
}: NewsletterFormProps) {
  const emailId = useId();
  const { status, message, isPending, handleSubmit } = useFormspree({
    endpoint,
    messages: {
      pending: "Subscribing…",
      success: "Thanks — you're on the list.",
    },
  });

  return (
    <form
      action={endpoint}
      method="POST"
      aria-labelledby={labelledBy}
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-2", className)}
    >
      <input
        type="hidden"
        name="_subject"
        value="Mailing list signup — TrueConvos Federal"
      />
      <Honeypot />

      <label htmlFor={emailId} className="text-sm font-semibold text-white">
        Email address
      </label>
      <div className="flex flex-wrap gap-3">
        <Input
          id={emailId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@agency.gov"
          className="min-h-12 flex-[1_1_220px]"
        />
        <Button type="submit" variant="accent" size="md" disabled={isPending}>
          Subscribe
        </Button>
      </div>

      <FormStatus tone="dark" status={status} message={message} />
    </form>
  );
}
