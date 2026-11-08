import {
  Button,
  Field,
  FormStatus,
  Honeypot,
  Input,
  Textarea,
} from "@/components/ui";
import { formAccessKeys } from "@/config/env";
import { useWeb3Forms } from "@/hooks/useWeb3Forms";
import { cn } from "@/lib/cn";
import { WEB3FORMS_ENDPOINT } from "@/lib/web3forms";

interface ContactFormProps {
  /** Web3Forms access key override (tests/previews); defaults to env config. */
  formKey?: string | undefined;
  /** id of the visible heading that names this form. */
  labelledBy?: string;
  className?: string;
}

/**
 * Teaming/contact inquiry. Field `name`s double as the labels in the
 * notification email, so they're human-readable. `email` must stay lowercase:
 * Web3Forms uses it as the Reply-To address. Subject line and recipient are
 * configured on the "TrueConvos Federal — Contact" form in Web3Forms.
 */
export function ContactForm({
  formKey = formAccessKeys.contact,
  labelledBy,
  className,
}: ContactFormProps) {
  const { status, message, isPending, handleSubmit } = useWeb3Forms({
    accessKey: formKey,
    messages: {
      pending: "Sending…",
      success: "Thanks — we'll be in touch shortly.",
    },
  });

  return (
    <form
      action={WEB3FORMS_ENDPOINT}
      method="POST"
      aria-labelledby={labelledBy}
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-4.5 rounded-lg border border-line bg-white p-6 sm:p-8",
        className,
      )}
    >
      {formKey ? (
        <input type="hidden" name="access_key" value={formKey} />
      ) : null}
      <Honeypot />

      <Field label="Name">
        <Input type="text" name="Name" autoComplete="name" />
      </Field>
      <Field label="Organization">
        <Input type="text" name="Organization" autoComplete="organization" />
      </Field>
      <Field label="Email">
        <Input type="email" name="email" required autoComplete="email" />
      </Field>
      <Field label="How can we help?">
        <Textarea name="How can we help?" rows={4} />
      </Field>

      <Button type="submit" disabled={isPending} className="self-start">
        Send message
      </Button>
      <FormStatus status={status} message={message} />
    </form>
  );
}
