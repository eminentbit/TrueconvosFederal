import { describe, expect, it, vi } from "vitest";

import {
  getFormspreeEndpoint,
  SUBMISSION_ERRORS,
  submitToFormspree,
} from "./formspree";

const ENDPOINT = "https://formspree.io/f/test123";

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("getFormspreeEndpoint", () => {
  it("builds the endpoint from a form ID", () => {
    expect(getFormspreeEndpoint(" test123 ")).toBe(ENDPOINT);
  });

  it.each([undefined, "", "   "])("returns undefined for %j", (id) => {
    expect(getFormspreeEndpoint(id)).toBeUndefined();
  });
});

describe("submitToFormspree", () => {
  it("posts the form data as AJAX and resolves ok", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ ok: true }, 200));
    vi.stubGlobal("fetch", fetchMock);
    const data = new FormData();
    data.set("email", "a@agency.gov");

    await expect(submitToFormspree(ENDPOINT, data)).resolves.toEqual({
      ok: true,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      ENDPOINT,
      expect.objectContaining({
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      }),
    );
  });

  it("joins Formspree validation messages", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(
        jsonResponse(
          {
            errors: [
              { message: "Email is invalid." },
              { message: "Try again." },
            ],
          },
          422,
        ),
      ),
    );

    await expect(submitToFormspree(ENDPOINT, new FormData())).resolves.toEqual({
      ok: false,
      message: "Email is invalid. Try again.",
    });
  });

  it("falls back to a generic message for non-JSON errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(new Response("Bad gateway", { status: 502 })),
    );

    await expect(submitToFormspree(ENDPOINT, new FormData())).resolves.toEqual({
      ok: false,
      message: SUBMISSION_ERRORS.generic,
    });
  });

  it("reports network failures without throwing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockRejectedValue(new TypeError("offline")),
    );

    await expect(submitToFormspree(ENDPOINT, new FormData())).resolves.toEqual({
      ok: false,
      message: SUBMISSION_ERRORS.network,
    });
  });
});
