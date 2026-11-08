import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "./App";

describe("App", () => {
  it("renders a single page-level heading", () => {
    render(<App />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("points every in-page link at an element that exists", () => {
    const { container } = render(<App />);
    const anchors =
      container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) {
      const id = decodeURIComponent(anchor.hash.slice(1));
      expect(document.getElementById(id), `missing #${id}`).not.toBeNull();
    }
  });

  it("exposes the main landmark regions", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Main" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
