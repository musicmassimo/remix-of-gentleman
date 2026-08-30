import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import TeachingLayout from "@/pages/teaching/TeachingLayout";
import TeachingHome from "@/pages/teaching/TeachingHome";
import TeachingAbout from "@/pages/teaching/TeachingAbout";
import TeachingSignup from "@/pages/teaching/TeachingSignup";
import TeachingResources from "@/pages/teaching/TeachingResources";
import TeachingContact from "@/pages/teaching/TeachingContact";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/teaching" element={<TeachingLayout />}>
          <Route index element={<TeachingHome />} />
          <Route path="about" element={<TeachingAbout />} />
          <Route path="signup" element={<TeachingSignup />} />
          <Route path="resources" element={<TeachingResources />} />
          <Route path="contact" element={<TeachingContact />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

const subnav = () =>
  within(document.querySelector(".tg-subnav") as HTMLElement);

afterEach(cleanup);

describe("Teaching sub-nav", () => {
  it("renders all five sub-pages on every teaching route", () => {
    for (const path of [
      "/teaching",
      "/teaching/about",
      "/teaching/signup",
      "/teaching/resources",
      "/teaching/contact",
    ]) {
      renderAt(path);
      const nav = subnav();
      expect(nav.getByText("Home").closest("a")).toHaveAttribute(
        "href",
        "/teaching"
      );
      expect(nav.getByText("Sign Up").closest("a")).toHaveAttribute(
        "href",
        "/teaching/signup"
      );
      expect(nav.getByText("Resources")).toBeInTheDocument();
      cleanup();
    }
  });

  it("keeps the main site nav mounted above the sub-nav", () => {
    const { container } = renderAt("/teaching/about");
    // TopNav's own links are still present alongside the teaching sub-nav.
    expect(container.querySelector('a[href="/contact"]')).not.toBeNull();
    expect(container.querySelector(".tg-subnav")).not.toBeNull();
  });

  it("marks only the active sub-page with aria-current", () => {
    renderAt("/teaching/resources");
    const nav = subnav();
    expect(nav.getByText("Resources").closest("a")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(nav.getByText("Home").closest("a")).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("marks Home active on the index route, not About", () => {
    renderAt("/teaching");
    const nav = subnav();
    expect(nav.getByText("Home").closest("a")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(nav.getByText("About").closest("a")).not.toHaveAttribute(
      "aria-current"
    );
  });
});

describe("Teaching — Home", () => {
  it("shows the headline, body copy and who lessons are for", () => {
    renderAt("/teaching");
    expect(
      screen.getByText("Modern Trumpet Lessons for Serious Students")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I help middle school, high school, and adult trumpet/)
    ).toBeInTheDocument();
    for (const item of [
      "School band",
      "Jazz band",
      "Honor band auditions",
      "Chair placements",
      "Solo preparation",
      "Modern performance and improvisation",
    ]) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("links the Sign Up call to action", () => {
    renderAt("/teaching");
    // The sub-nav also has a "Sign Up" link; this is the CTA button.
    const cta = screen.getByText("Sign Up", { selector: "a.tg-btn" });
    expect(cta).toHaveAttribute("href", "/teaching/signup");
  });
});

describe("Teaching — About", () => {
  it("renders the bio as four paragraphs", () => {
    renderAt("/teaching/about");
    expect(
      screen.getByText(/18 years of professional experience/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/looping-based solo performance/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/His teaching approach is structured/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/middle school through professional level/)
    ).toBeInTheDocument();
  });

  it("lists all nine What Students Learn items", () => {
    const { container } = renderAt("/teaching/about");
    const items = Array.from(
      container.querySelectorAll(".tg-list li")
    ).map((li) => li.textContent);
    expect(items).toEqual([
      "Tone production",
      "Range development",
      "Articulation",
      "Endurance",
      "Music theory",
      "Ear training",
      "Improvisation",
      "Practice strategy",
      "Musical confidence",
    ]);
  });
});

describe("Teaching — Sign Up", () => {
  it("renders every requested field with the right controls", () => {
    renderAt("/teaching/signup");
    expect(screen.getByLabelText(/Student Name/)).toBeRequired();
    expect(screen.getByLabelText(/Parent \/ Guardian Name/)).not.toBeRequired();
    expect(screen.getByLabelText(/^Email$/)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/Phone/)).toHaveAttribute("type", "tel");
    expect(screen.getByLabelText(/Student Age/)).toBeInTheDocument();

    const experience = screen.getByLabelText(/Experience Level/);
    expect(
      Array.from(experience.querySelectorAll("option")).map((o) => o.value)
    ).toEqual(["", "Beginner", "Intermediate", "Advanced", "Professional"]);

    const format = screen.getByLabelText(/Lesson Format/);
    expect(
      Array.from(format.querySelectorAll("option")).map((o) => o.textContent)
    ).toEqual(["Select…", "In-Person", "Zoom / Online"]);

    expect(screen.getByLabelText(/Location/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Goals/)).toHaveAttribute(
      "placeholder",
      "e.g. school band, audition prep, beginner fundamentals"
    );
  });

  it("shows a confirmation message after submitting", async () => {
    const user = userEvent.setup();
    renderAt("/teaching/signup");

    await user.type(screen.getByLabelText(/Student Name/), "Alex Rivera");
    await user.type(screen.getByLabelText(/^Email$/), "alex@example.com");
    await user.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      /your lesson inquiry has been received/i
    );
    expect(screen.getByRole("status")).toHaveTextContent("Alex Rivera");
    expect(screen.queryByLabelText(/Goals/)).toBeNull();
  });
});

describe("Teaching — Resources", () => {
  it("posts directly to the Brevo endpoint", () => {
    const { container } = renderAt("/teaching/resources");
    const form = container.querySelector("form")!;
    expect(form).toHaveAttribute("method", "POST");
    expect(form.getAttribute("action")).toContain(
      "https://3e1c021a.sibforms.com/serve/MUIFAOHT4Pxvs0t2E3d0szrZaJFFwsUePmwE2t8_J4pxNRkc-"
    );
  });

  it("includes the intro copy and all Brevo fields", () => {
    const { container } = renderAt("/teaching/resources");
    expect(
      screen.getByText(/Sign up below for access to practice guides/)
    ).toBeInTheDocument();

    expect(screen.getByLabelText("First Name")).toHaveAttribute(
      "name",
      "FIRSTNAME"
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("name", "EMAIL");

    const instrument = screen.getByLabelText(/What instrument do you play\?/);
    expect(instrument).toHaveAttribute("name", "INSTRUMENT");
    const options = Array.from(instrument.querySelectorAll("option")).slice(1);
    expect(options.map((o) => [o.getAttribute("value"), o.textContent])).toEqual(
      [
        ["1", "Trumpet"],
        ["2", "Saxophone"],
        ["3", "Guitar"],
        ["4", "Piano"],
        ["5", "Bass"],
        ["6", "Trombone"],
        ["7", "Voice"],
      ]
    );

    for (const [name, value] of [
      ["email_address_check", ""],
      ["locale", "en"],
      ["html_type", "simple"],
    ]) {
      const hidden = container.querySelector(
        `input[type="hidden"][name="${name}"]`
      );
      expect(hidden).not.toBeNull();
      expect(hidden).toHaveValue(value);
    }

    expect(
      screen.getByRole("button", { name: "Access Resources" })
    ).toHaveAttribute("type", "submit");
  });
});

describe("Teaching — Contact", () => {
  it("links email and every social profile", () => {
    renderAt("/teaching/contact");
    expect(
      screen.getByText("massimo@massimopaparello.com").closest("a")
    ).toHaveAttribute("href", "mailto:massimo@massimopaparello.com");
    expect(
      screen.getByText("@massimotrumpetstudio").closest("a")
    ).toHaveAttribute("href", "https://instagram.com/massimotrumpetstudio");
    expect(
      screen.getByText("@massimo.paparello").closest("a")
    ).toHaveAttribute("href", "https://tiktok.com/@massimo.paparello");
    // YouTube and Facebook share the same display text, so they're
    // distinguished by their row label.
    const rowLink = (label: string) => {
      const row = screen
        .getAllByText(label)
        .map((el) => el.closest(".tg-row"))
        .find(Boolean)!;
      return within(row as HTMLElement).getByRole("link");
    };

    expect(rowLink("YouTube")).toHaveAttribute(
      "href",
      "https://www.youtube.com/channel/UCExmNqfwVrOhwgYC63UrKC"
    );
    expect(rowLink("Facebook")).toHaveAttribute(
      "href",
      "https://www.facebook.com/profile.php?id=61590589289425"
    );
  });

  it("opens every external social link safely in a new tab", () => {
    const { container } = renderAt("/teaching/contact");
    const external = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('.tg-row a[href^="http"]')
    );
    expect(external).toHaveLength(4); // Instagram, YouTube, TikTok, Facebook
    for (const a of external) {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a).toHaveAttribute("rel", "noopener noreferrer");
      expect(a).toHaveClass("tg-link");
    }
    // The mailto link should not get target/rel.
    const mail = container.querySelector('a[href^="mailto:"]')!;
    expect(mail).not.toHaveAttribute("target");
  });

  it("publishes no phone number or street address", () => {
    const { container } = renderAt("/teaching/contact");
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent).not.toMatch(/\+?\d[\d\s().-]{7,}\d/);
    expect(container.textContent).not.toMatch(
      /\d+\s+\w+\s+(St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road)\b/i
    );
  });

  it("lists both service areas with all their cities", () => {
    const { container } = renderAt("/teaching/contact");
    const cities = Array.from(
      container.querySelectorAll(".tg-list li")
    ).map((li) => li.textContent);
    expect(cities).toEqual([
      "El Segundo",
      "Manhattan Beach",
      "Torrance",
      "Hawthorne",
      "Redondo Beach",
      "Hermosa Beach",
      "Westchester",
      "Marina Del Rey",
      "Playa del Rey",
      "Culver City",
      "Venice",
      "Santa Monica",
      "Beverly Hills",
    ]);
    expect(screen.getByText("South Bay")).toBeInTheDocument();
    expect(screen.getByText("Westside LA")).toBeInTheDocument();
  });

  it("shows the formats, scheduling, travel and cancellation notes", () => {
    renderAt("/teaching/contact");
    expect(
      screen.getByText("Lessons are available in-person or via Zoom.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Travel radius may vary depending on scheduling/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Lessons scheduled weekly or biweekly/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/24-hour notice required for cancellation/)
    ).toBeInTheDocument();
  });
});

describe("Teaching — visual identity", () => {
  it("scopes every gold rule to the .tg namespace", () => {
    const { container } = renderAt("/teaching");
    const css = container.querySelector("style")!.textContent!;
    const selectors = css.match(/^\s*\.[a-z-]+/gim) ?? [];
    expect(selectors.length).toBeGreaterThan(0);
    for (const sel of selectors) {
      expect(sel.trim().startsWith(".tg")).toBe(true);
    }
  });

  it("uses brass/gold rather than SYNDICATE's red-orange", () => {
    const { container } = renderAt("/teaching");
    const css = container.querySelector("style")!.textContent!.toLowerCase();
    expect(css).toContain("#e8c87a");
    expect(css).toContain("#b8862b");
    expect(css).not.toContain("#ff3b3b");
    expect(css).not.toContain("#ff9d4d");
  });

  it("declares a solid colour before the gradient-text @supports block", () => {
    const { container } = renderAt("/teaching");
    const css = container.querySelector("style")!.textContent!;
    expect(css).toMatch(/\.tg-heading\s*\{[^}]*color:\s*#d9a94c/);
  });
});
