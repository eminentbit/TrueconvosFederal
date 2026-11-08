import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { WEB3FORMS_ENDPOINT } from "@/lib/web3forms";

import { ContactForm } from "./ContactForm";

const ACCESS_KEY = "00000000-0000-4000-8000-000000000000";

describe("ContactForm", () => {
  it("sends the fields Web3Forms expects and resets on success", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm formKey={ACCESS_KEY} />);

    await user.type(screen.getByLabelText("Name"), "Pat Officer");
    await user.type(screen.getByLabelText("Organization"), "Prime Corp");
    await user.type(screen.getByLabelText("Email"), "pat@prime.example");
    await user.type(
      screen.getByLabelText("How can we help?"),
      "Teaming on a VA recompete.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      await screen.findByText("Thanks — we'll be in touch shortly."),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
      WEB3FORMS_ENDPOINT,
      expect.objectContaining({ method: "POST" }),
    );

    const body = fetchMock.mock.calls[0]?.[1]?.body as FormData;
    expect(Object.fromEntries(body)).toEqual({
      access_key: ACCESS_KEY,
      Name: "Pat Officer",
      Organization: "Prime Corp",
      // Lowercase `email` is what Web3Forms uses for Reply-To.
      email: "pat@prime.example",
      "How can we help?": "Teaming on a VA recompete.",
    });
    expect(screen.getByLabelText("Email")).toHaveValue("");
  });
});
