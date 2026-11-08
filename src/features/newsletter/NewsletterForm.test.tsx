import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FORM_UNAVAILABLE_MESSAGE } from "@/hooks/useFormspree";

import { NewsletterForm } from "./NewsletterForm";

// Simulate a build without Formspree IDs, independent of any local .env file.
vi.mock("@/config/env", () => ({
  formEndpoints: { contact: undefined, newsletter: undefined },
}));

const ENDPOINT = "https://formspree.io/f/newsletter";

function setup(props: { endpoint?: string } = { endpoint: ENDPOINT }) {
  const user = userEvent.setup();
  render(<NewsletterForm {...props} />);
  return {
    user,
    email: screen.getByLabelText("Email address"),
    submit: screen.getByRole("button", { name: "Subscribe" }),
    status: screen.getByRole("status"),
  };
}

describe("NewsletterForm", () => {
  it("keeps the native POST fallback for no-JS visitors", () => {
    const { submit } = setup();
    const form = submit.closest("form");

    expect(form).toHaveAttribute("action", ENDPOINT);
    expect(form).toHaveAttribute("method", "POST");
  });

  it("subscribes in place and clears the field on success", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { user, email, submit, status } = setup();

    await user.type(email, "officer@agency.gov");
    await user.click(submit);

    expect(
      await screen.findByText("Thanks — you're on the list."),
    ).toBeInTheDocument();
    expect(status).toHaveTextContent("Thanks — you're on the list.");
    expect(email).toHaveValue("");
    expect(submit).toBeEnabled();

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
      ENDPOINT,
      expect.objectContaining({ method: "POST" }),
    );
    const body = fetchMock.mock.calls[0]?.[1]?.body;
    expect(body).toBeInstanceOf(FormData);
    expect((body as FormData).get("email")).toBe("officer@agency.gov");
  });

  it("shows Formspree errors and keeps the visitor's input", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(
        new Response(JSON.stringify({ errors: [{ message: "Blocked." }] }), {
          status: 422,
        }),
      ),
    );
    const { user, email, submit } = setup();

    await user.type(email, "officer@agency.gov");
    await user.click(submit);

    expect(await screen.findByText("Blocked.")).toBeInTheDocument();
    expect(email).toHaveValue("officer@agency.gov");
  });

  it("explains when the form is not configured", async () => {
    const fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
    const { user, email, submit } = setup({});

    await user.type(email, "officer@agency.gov");
    await user.click(submit);

    expect(
      await screen.findByText(FORM_UNAVAILABLE_MESSAGE),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
