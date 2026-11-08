/**
 * Minimal, framework-agnostic Formspree client.
 * https://help.formspree.io/hc/en-us/articles/360013470814
 */

const FORMSPREE_ORIGIN = "https://formspree.io";
const DEFAULT_TIMEOUT_MS = 15_000;

export const SUBMISSION_ERRORS = {
  generic: "Something went wrong. Please try again.",
  network: "Network error. Please check your connection and try again.",
} as const;

export type SubmissionResult = { ok: true } | { ok: false; message: string };

/** Build the POST endpoint for a form ID; `undefined` when the ID is unset. */
export function getFormspreeEndpoint(
  formId: string | undefined,
): string | undefined {
  const id = formId?.trim();
  return id ? `${FORMSPREE_ORIGIN}/f/${encodeURIComponent(id)}` : undefined;
}

/** POST form data as AJAX. Never throws — failures resolve to `{ ok: false }`. */
export async function submitToFormspree(
  endpoint: string,
  data: FormData,
  { timeoutMs = DEFAULT_TIMEOUT_MS }: { timeoutMs?: number } = {},
): Promise<SubmissionResult> {
  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    return { ok: false, message: SUBMISSION_ERRORS.network };
  }

  if (response.ok) return { ok: true };

  const body: unknown = await response.json().catch(() => null);
  return {
    ok: false,
    message: readErrorMessage(body) ?? SUBMISSION_ERRORS.generic,
  };
}

/** Formspree replies with `{ errors: [{ message }] }` or `{ error: string }`. */
function readErrorMessage(body: unknown): string | undefined {
  if (typeof body !== "object" || body === null) return undefined;

  if ("errors" in body && Array.isArray(body.errors)) {
    const messages = body.errors
      .map((error: unknown) =>
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "",
      )
      .filter(Boolean);
    if (messages.length > 0) return messages.join(" ");
  }

  if ("error" in body && typeof body.error === "string" && body.error) {
    return body.error;
  }

  return undefined;
}
