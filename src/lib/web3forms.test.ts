import { describe, expect, it, vi } from "vitest";

import {
  readAccessKey,
  SUBMISSION_ERRORS,
  submitToWeb3Forms,
  WEB3FORMS_ENDPOINT,
} from "./web3forms";

const ACCESS_KEY = "00000000-0000-4000-8000-000000000000";

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("readAccessKey", () => {
  it("trims a configured key", () => {
    expect(readAccessKey(` ${ACCESS_KEY} `)).toBe(ACCESS_KEY);
  });

  it.each([undefined, "", "   "])("returns undefined for %j", (value) => {
    expect(readAccessKey(value)).toBeUndefined();
  });
});

describe("submitToWeb3Forms", () => {
  it("posts the fields plus the access key and resolves ok", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        jsonResponse(
          { success: true, message: "Email sent successfully!" },
          200,
        ),
      );
    vi.stubGlobal("fetch", fetchMock);
    const data = new FormData();
    data.set("email", "a@agency.gov");

    await expect(submitToWeb3Forms(ACCESS_KEY, data)).resolves.toEqual({
      ok: true,
    });

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
      WEB3FORMS_ENDPOINT,
      expect.objectContaining({
        method: "POST",
        headers: { Accept: "application/json" },
      }),
    );
    const sent = fetchMock.mock.calls[0]?.[1]?.body as FormData;
    expect(sent.get("email")).toBe("a@agency.gov");
    expect(sent.get("access_key")).toBe(ACCESS_KEY);
    expect(data.has("access_key")).toBe(false); // caller's data is untouched
  });

  it.each([
    ["top-level message", { success: false, message: "Invalid key." }, 400],
    [
      "nested body.message",
      { success: false, body: { message: "Invalid key." } },
      400,
    ],
    ["error field", { statusCode: 500, error: "Invalid key." }, 500],
  ])("surfaces the API error (%s)", async (_label, body, status) => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(jsonResponse(body, status)),
    );

    await expect(
      submitToWeb3Forms(ACCESS_KEY, new FormData()),
    ).resolves.toEqual({ ok: false, message: "Invalid key." });
  });

  it("treats `success: false` on a 200 as a failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(jsonResponse({ success: false }, 200)),
    );

    await expect(
      submitToWeb3Forms(ACCESS_KEY, new FormData()),
    ).resolves.toEqual({ ok: false, message: SUBMISSION_ERRORS.generic });
  });

  it("falls back to a generic message for non-JSON errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(new Response("Bad gateway", { status: 502 })),
    );

    await expect(
      submitToWeb3Forms(ACCESS_KEY, new FormData()),
    ).resolves.toEqual({ ok: false, message: SUBMISSION_ERRORS.generic });
  });

  it("reports network failures without throwing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockRejectedValue(new TypeError("offline")),
    );

    await expect(
      submitToWeb3Forms(ACCESS_KEY, new FormData()),
    ).resolves.toEqual({ ok: false, message: SUBMISSION_ERRORS.network });
  });
});
