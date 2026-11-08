/**
 * Minimal, framework-agnostic Web3Forms client.
 * https://docs.web3forms.com/getting-started/api-reference
 */

/** Single submit endpoint for every form; the access key picks the form. */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const DEFAULT_TIMEOUT_MS = 15_000;

export const SUBMISSION_ERRORS = {
  generic: "Something went wrong. Please try again.",
  network: "Network error. Please check your connection and try again.",
} as const;

export type SubmissionResult = { ok: true } | { ok: false; message: string };

/** Normalize an access key from env; `undefined` when unset or blank. */
export function readAccessKey(value: string | undefined): string | undefined {
  const key = value?.trim();
  return key ? key : undefined;
}

/**
 * POST form data as AJAX. Never throws — failures resolve to `{ ok: false }`.
 * The access key is (re)applied here so a submission can't go out without it,
 * even if the hidden `access_key` input is missing from the form.
 */
export async function submitToWeb3Forms(
  accessKey: string,
  data: FormData,
  { timeoutMs = DEFAULT_TIMEOUT_MS }: { timeoutMs?: number } = {},
): Promise<SubmissionResult> {
  const payload = new FormData();
  for (const [field, value] of data) payload.append(field, value);
  payload.set("access_key", accessKey);

  let response: Response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    return { ok: false, message: SUBMISSION_ERRORS.network };
  }

  const body: unknown = await response.json().catch(() => null);
  const reportedFailure = isRecord(body) && body.success === false;

  if (response.ok && !reportedFailure) return { ok: true };

  return {
    ok: false,
    message: readErrorMessage(body) ?? SUBMISSION_ERRORS.generic,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Web3Forms error bodies vary by status: `{ message }` (most errors),
 * `{ body: { message } }` (documented 400 shape) or `{ error }` (500).
 */
function readErrorMessage(body: unknown): string | undefined {
  if (!isRecord(body)) return undefined;

  const candidates = [
    body.message,
    isRecord(body.body) ? body.body.message : undefined,
    body.error,
  ];
  return candidates.find(
    (value): value is string => typeof value === "string" && value.length > 0,
  );
}
