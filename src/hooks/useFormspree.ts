import { startTransition, useActionState, type FormEvent } from "react";

import { SUBMISSION_ERRORS, submitToFormspree } from "@/lib/formspree";

export type FormStatus = "idle" | "pending" | "success" | "error";

type SubmissionState = {
  status: Exclude<FormStatus, "pending">;
  message: string;
};

type Submission = { form: HTMLFormElement; data: FormData };

interface UseFormspreeOptions {
  /** Formspree endpoint; when `undefined` the form reports it is unavailable. */
  endpoint: string | undefined;
  messages: { pending: string; success: string };
}

const INITIAL_STATE: SubmissionState = { status: "idle", message: "" };

export const FORM_UNAVAILABLE_MESSAGE =
  "This form is temporarily unavailable. Please email us directly.";

/**
 * Progressive-enhancement form handler built on React 19 Actions.
 *
 * The <form> keeps its native `action`/`method`, so the prerendered page still
 * works without JavaScript. Once hydrated, `handleSubmit` intercepts the submit
 * and posts via fetch so visitors stay on the page.
 *
 * We dispatch from `onSubmit` rather than passing a function to `<form action>`
 * because React auto-resets forms after function actions — which would wipe
 * the visitor's input on a failed submit. Here fields reset only on success.
 */
export function useFormspree({ endpoint, messages }: UseFormspreeOptions) {
  const [state, dispatch, isPending] = useActionState<
    SubmissionState,
    Submission
  >(async (_previous, { form, data }) => {
    if (!endpoint) {
      return { status: "error", message: FORM_UNAVAILABLE_MESSAGE };
    }

    try {
      const result = await submitToFormspree(endpoint, data);
      if (!result.ok) return { status: "error", message: result.message };
    } catch {
      // A throw inside an Action propagates to the nearest error boundary and
      // would take down the page — degrade to an inline message instead.
      return { status: "error", message: SUBMISSION_ERRORS.generic };
    }

    form.reset();
    return { status: "success", message: messages.success };
  }, INITIAL_STATE);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    startTransition(() => dispatch({ form, data }));
  }

  return {
    status: isPending ? "pending" : state.status,
    message: isPending ? messages.pending : state.message,
    isPending,
    handleSubmit,
  } as const;
}
