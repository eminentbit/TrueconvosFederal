import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FORM_UNAVAILABLE_MESSAGE } from "@/hooks/useWeb3Forms";
import { WEB3FORMS_ENDPOINT } from "@/lib/web3forms";

import { NewsletterForm } from "./NewsletterForm";

// Simulate a build without access keys, independent of any local .env file.
vi.mock("@/config/env", () => ({
  formAccessKeys: { contact: undefined, newsletter: undefined },
}));

const ACCESS_KEY = "00000000-0000-4000-8000-000000000000";

function okResponse() {
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

function setup(props: { formKey?: string } = { formKey: ACCESS_KEY }) {
  const user = userEvent.setup();
  const { container } = render(<NewsletterForm {...props} />);
  return {
    user,
    form: container.querySelector("form")!,
    email: screen.getByLabelText("Email address"),
    submit: screen.getByRole("button", { name: "Subscribe" }),
    status: screen.getByRole("status"),
  };
}

describe("NewsletterForm", () => {
  it("keeps a working native POST for no-JS visitors", () => {
    const { form } = setup();

    expect(form).toHaveAttribute("action", WEB3FORMS_ENDPOINT);
    expect(form).toHaveAttribute("method", "POST");
    expect(form).toHaveFormValues({ access_key: ACCESS_KEY });
  });

  it("subscribes in place and clears the field on success", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(okResponse());
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

    const body = fetchMock.mock.calls[0]?.[1]?.body as FormData;
    expect(body.get("email")).toBe("officer@agency.gov");
    expect(body.get("access_key")).toBe(ACCESS_KEY);
    expect(body.has("botcheck")).toBe(false);
  });

  it("shows the API error and keeps the visitor's input", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(
          new Response(
            JSON.stringify({ success: false, message: "Blocked." }),
            { status: 400 },
          ),
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
    const { user, form, email, submit } = setup({});

    expect(form.querySelector('[name="access_key"]')).toBeNull();

    await user.type(email, "officer@agency.gov");
    await user.click(submit);

    expect(
      await screen.findByText(FORM_UNAVAILABLE_MESSAGE),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
