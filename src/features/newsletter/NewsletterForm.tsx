import { useId } from "react";

import { Button, FormStatus, Honeypot, Input } from "@/components/ui";
import { formAccessKeys } from "@/config/env";
import { useWeb3Forms } from "@/hooks/useWeb3Forms";
import { cn } from "@/lib/cn";
import { WEB3FORMS_ENDPOINT } from "@/lib/web3forms";

interface NewsletterFormProps {
  /** Web3Forms access key override (tests/previews); defaults to env config. */
  formKey?: string | undefined;
  /** id of the visible heading that names this form. */
  labelledBy?: string;
  className?: string;
}

/**
 * Footer mailing-list signup. Subject line and recipient are configured on
 * the "TrueConvos Federal — Mailing list" form in the Web3Forms dashboard.
 */
export function NewsletterForm({
  formKey = formAccessKeys.newsletter,
  labelledBy,
  className,
}: NewsletterFormProps) {
  const emailId = useId();
  const { status, message, isPending, handleSubmit } = useWeb3Forms({
    accessKey: formKey,
    messages: {
      pending: "Subscribing…",
      success: "Thanks — you're on the list.",
    },
  });

  return (
    <form
      action={WEB3FORMS_ENDPOINT}
      method="POST"
      aria-labelledby={labelledBy}
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-2", className)}
    >
      {formKey ? (
        <input type="hidden" name="access_key" value={formKey} />
      ) : null}
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
