import {
  Button,
  Field,
  FormStatus,
  Honeypot,
  Input,
  Textarea,
} from "@/components/ui";
import { formEndpoints } from "@/config/env";
import { useFormspree } from "@/hooks/useFormspree";
import { cn } from "@/lib/cn";

interface ContactFormProps {
  /** Override for tests/previews; defaults to the configured Formspree form. */
  endpoint?: string | undefined;
  /** id of the visible heading that names this form. */
  labelledBy?: string;
  className?: string;
}

export function ContactForm({
  endpoint = formEndpoints.contact,
  labelledBy,
  className,
}: ContactFormProps) {
  const { status, message, isPending, handleSubmit } = useFormspree({
    endpoint,
    messages: {
      pending: "Sending…",
      success: "Thanks — we'll be in touch shortly.",
    },
  });

  return (
    <form
      action={endpoint}
      method="POST"
      aria-labelledby={labelledBy}
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-4.5 rounded-lg border border-line bg-white p-6 sm:p-8",
        className,
      )}
    >
      <input
        type="hidden"
        name="_subject"
        value="Website inquiry — TrueConvos Federal"
      />
      <Honeypot />

      <Field label="Name">
        <Input type="text" name="name" autoComplete="name" />
      </Field>
      <Field label="Organization">
        <Input type="text" name="org" autoComplete="organization" />
      </Field>
      <Field label="Email">
        <Input type="email" name="email" required autoComplete="email" />
      </Field>
      <Field label="How can we help?">
        <Textarea name="message" rows={4} />
      </Field>

      <Button type="submit" disabled={isPending} className="self-start">
        Send message
      </Button>
      <FormStatus status={status} message={message} />
    </form>
  );
}
