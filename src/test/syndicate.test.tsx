import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Syndicate from "@/pages/Syndicate";

const renderPage = () =>
  render(
    <MemoryRouter>
      <Syndicate />
    </MemoryRouter>
  );

// Several names legitimately appear more than once on the page (Massimo
// Paparello is a track credit, a lineup credit and the footer), so assertions
// are scoped to the section under test.
const section = (container: HTMLElement, heading: string) => {
  const el = Array.from(container.querySelectorAll(".syn-heading")).find(
    (h) => h.textContent === heading
  );
  if (!el) throw new Error(`no section headed "${heading}"`);
  return within(el.closest("section")!);
};

afterEach(cleanup);

describe("SYNDICATE page", () => {
  it("renders all six sections in the specified order", () => {
    const { container } = renderPage();
    const headings = Array.from(
      container.querySelectorAll(".syn-heading")
    ).map((el) => el.textContent);
    expect(headings).toEqual([
      "About",
      "Featured Video",
      "Music",
      "Lineup",
      "Contact",
      "Press Kit",
    ]);
  });

  it("renders the About copy as two paragraphs", () => {
    renderPage();
    expect(
      screen.getByText(/SYNDICATE is a Los Angeles-based jazz quintet/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/With instrumentation of trumpet, alto saxophone\/flute/)
    ).toBeInTheDocument();
  });

  it("embeds the YouTube video preserving the t=371 timestamp", () => {
    const { container } = renderPage();
    const iframe = container.querySelector("iframe")!;
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/M0e5tfIwKMU?start=371"
    );
    expect(iframe).toHaveAttribute("allowfullscreen");
  });

  it("shows the video caption", () => {
    renderPage();
    expect(
      screen.getByText(
        /Featured Live Video — SYNDICATE, Live at Jazz Fest in The Backyard \(6\/27\/2026\), filmed on Super 8 film\./
      )
    ).toBeInTheDocument();
  });

  it("renders both audio tracks without preloading the large files", () => {
    const { container } = renderPage();
    const players = Array.from(container.querySelectorAll("audio"));
    expect(players).toHaveLength(2);
    expect(players.map((a) => a.getAttribute("src"))).toEqual([
      "/audio/rosebush.m4a",
      "/audio/pai.m4a",
    ]);
    for (const a of players) {
      expect(a).toHaveAttribute("preload", "none");
      expect(a).toHaveAttribute("controls");
    }

    const music = section(container, "Music");
    expect(music.getByText("Rosebush")).toBeInTheDocument();
    expect(music.getByText("Massimo Paparello")).toBeInTheDocument();
    expect(music.getByText("PAI")).toBeInTheDocument();
    expect(music.getByText("Sam Smylie")).toBeInTheDocument();
  });

  it("lists the full lineup including the flute credit", () => {
    const { container } = renderPage();
    const band = section(container, "Lineup");

    expect(band.getByText("Alto Saxophone & Flute")).toBeInTheDocument();
    for (const [role, name] of [
      ["Trumpet", "Massimo Paparello"],
      ["Alto Saxophone & Flute", "Evan O'Brien"],
      ["Piano", "Sam Smylie"],
      ["Bass", "Adam Hernandez"],
      ["Drums", "Dante Newcombe-Kenealy"],
    ]) {
      expect(band.getByText(role)).toBeInTheDocument();
      expect(band.getByText(name)).toBeInTheDocument();
    }
  });

  it("exposes email and Instagram, and no phone number", () => {
    const { container } = renderPage();
    expect(
      screen.getByText("syndicatebookings@massimopaparello.com").closest("a")
    ).toHaveAttribute("href", "mailto:syndicatebookings@massimopaparello.com");

    const ig = screen.getByText("@syndicatequintet").closest("a")!;
    expect(ig).toHaveAttribute("href", "https://instagram.com/syndicatequintet");
    expect(ig).toHaveAttribute("rel", "noopener noreferrer");

    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent).not.toMatch(/\+?\d[\d\s().-]{7,}\d/);
  });

  it("links the EPK download", () => {
    renderPage();
    const epk = screen.getByText("Download EPK").closest("a")!;
    expect(epk).toHaveAttribute("href", "/syndicate-epk.pdf");
    expect(epk).toHaveAttribute("download");
  });

  it("keeps the red-orange identity scoped to this page", () => {
    const { container } = renderPage();
    // Every gradient rule is namespaced under a .syn* selector.
    const css = container.querySelector("style")!.textContent!;
    const selectors = css.match(/^\s*\.[a-z-]+/gim) ?? [];
    expect(selectors.length).toBeGreaterThan(0);
    for (const sel of selectors) {
      expect(sel.trim().startsWith(".syn")).toBe(true);
    }
    // Gradient text must declare a solid colour before the @supports block.
    expect(css).toMatch(/\.syn-heading\s*\{[^}]*color:\s*#ff7a42/);
  });
});

describe("SYNDICATE stencil header", () => {
  it("is the page's only title, with no leftover heading above it", () => {
    const { container } = renderPage();

    const h1s = Array.from(container.querySelectorAll("h1"));
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveClass("syn-hero-title");
    expect(h1s[0].textContent).toBe("Syndicate");

    // The old gradient title and its tagline are gone entirely.
    expect(container.querySelector(".syn-title")).toBeNull();
    expect(container.textContent).not.toContain("Los Angeles Jazz Quintet");

    // The header is the first thing after the nav, so About follows it directly.
    const sections = Array.from(container.querySelectorAll("section"));
    expect(sections[0]).toHaveClass("syn-hero");
    expect(sections[1].querySelector(".syn-heading")?.textContent).toBe("About");
  });

  it("puts the photo behind a blended plate", () => {
    const { container } = renderPage();
    const hero = container.querySelector(".syn-hero")!;

    const img = hero.querySelector("img")!;
    expect(img).toHaveAttribute("src", "/images/syndicate-header.jpg");
    // Decorative: the h1 already carries the accessible name.
    expect(img).toHaveAttribute("aria-hidden", "true");
    expect(img).toHaveAttribute("alt", "");

    expect(hero.querySelector(".syn-hero-plate")).not.toBeNull();
  });

  it("uses darken with a near-black plate and white letterforms", () => {
    const { container } = renderPage();
    const css = container.querySelector("style")!.textContent!;

    // darken => min(photo, plate): dark surround, photo inside the type.
    expect(css).toMatch(/\.syn-hero-plate\s*\{[^}]*mix-blend-mode:\s*darken/);
    expect(css).toMatch(/\.syn-hero-plate\s*\{[^}]*background:\s*#17130f/);
    expect(css).toMatch(/\.syn-hero-title\s*\{[^}]*color:\s*#fff/);
    // Blend must not escape the section and tint the page behind it.
    expect(css).toMatch(/\.syn-hero\s*\{[^}]*isolation:\s*isolate/);
  });
});
