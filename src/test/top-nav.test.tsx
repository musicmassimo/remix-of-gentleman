import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TopNav from "@/components/TopNav";

const renderNav = (initialPath = "/") =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <TopNav />
    </MemoryRouter>
  );

afterEach(cleanup);

// The desktop and mobile trees are both in the DOM under jsdom (Tailwind's
// responsive classes aren't evaluated), so queries are scoped to the relevant
// container rather than the whole document.
const desktopNav = () => document.querySelector(".md\\:flex") as HTMLElement;
const mobileNav = () => document.querySelector(".md\\:hidden") as HTMLElement;

describe("TopNav — structure", () => {
  it("renders every top-level entry in the desktop bar", () => {
    renderNav();
    const bar = within(desktopNav());
    for (const label of [
      "HOME",
      "ABOUT",
      "MUSIC",
      "GALLERY",
      "SHOWS",
      "TEACHING",
      "CONTACT",
    ]) {
      expect(bar.getByText(label)).toBeInTheDocument();
    }
  });

  it("points SHOWS at the existing /tour route", () => {
    renderNav();
    expect(within(desktopNav()).getByText("SHOWS").closest("a")).toHaveAttribute(
      "href",
      "/tour"
    );
  });

  it("keeps dropdown children hidden until opened", () => {
    renderNav();
    expect(within(desktopNav()).queryByText("SYNDICATE")).toBeNull();
    expect(within(desktopNav()).queryByText("PHOTOS")).toBeNull();
  });
});

describe("TopNav — desktop dropdowns", () => {
  it("opens MUSIC on hover and links SYNDICATE to /music/syndicate", async () => {
    const user = userEvent.setup();
    renderNav();
    const bar = within(desktopNav());

    await user.hover(bar.getByText("MUSIC"));

    const syndicate = bar.getByText("SYNDICATE");
    expect(syndicate).toBeInTheDocument();
    expect(syndicate.closest("a")).toHaveAttribute("href", "/music/syndicate");
  });

  it("opens GALLERY on click with both PHOTOS and VIDEOS", async () => {
    const user = userEvent.setup();
    renderNav();
    const bar = within(desktopNav());

    await user.click(bar.getByText("GALLERY"));

    expect(bar.getByText("PHOTOS").closest("a")).toHaveAttribute(
      "href",
      "/gallery/photos"
    );
    expect(bar.getByText("VIDEOS").closest("a")).toHaveAttribute(
      "href",
      "/gallery/videos"
    );
  });

  it("closes an open dropdown on Escape", async () => {
    const user = userEvent.setup();
    renderNav();
    const bar = within(desktopNav());

    await user.click(bar.getByText("GALLERY"));
    expect(bar.getByText("PHOTOS")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(bar.queryByText("PHOTOS")).toBeNull();
  });

  it("closes an open dropdown when clicking outside the nav", async () => {
    const user = userEvent.setup();
    renderNav();
    const bar = within(desktopNav());

    await user.click(bar.getByText("GALLERY"));
    expect(bar.getByText("PHOTOS")).toBeInTheDocument();

    await user.click(document.body);
    expect(bar.queryByText("PHOTOS")).toBeNull();
  });

  it("marks a group active when one of its children is the current route", () => {
    renderNav("/gallery/photos");
    const trigger = within(desktopNav()).getByText("GALLERY").closest("button")!;
    expect(trigger).toHaveStyle({ color: "rgb(255, 255, 255)" });
  });
});

describe("TopNav — mobile hamburger", () => {
  it("hides the menu until the hamburger is tapped", async () => {
    const user = userEvent.setup();
    renderNav();
    const mobile = within(mobileNav());

    expect(mobile.queryByText("HOME")).toBeNull();

    await user.click(mobile.getByRole("button", { name: "Open menu" }));
    expect(mobile.getByText("HOME")).toBeInTheDocument();
    expect(mobile.getByText("TEACHING")).toBeInTheDocument();
  });

  it("expands a nested section in place", async () => {
    const user = userEvent.setup();
    renderNav();
    const mobile = within(mobileNav());

    await user.click(mobile.getByRole("button", { name: "Open menu" }));
    expect(mobile.queryByText("PHOTOS")).toBeNull();

    await user.click(mobile.getByText("GALLERY"));
    expect(mobile.getByText("PHOTOS").closest("a")).toHaveAttribute(
      "href",
      "/gallery/photos"
    );
    expect(mobile.getByText("VIDEOS")).toBeInTheDocument();
  });

  it("closes the whole menu when a nested link is tapped", async () => {
    const user = userEvent.setup();
    renderNav();
    const mobile = within(mobileNav());

    await user.click(mobile.getByRole("button", { name: "Open menu" }));
    await user.click(mobile.getByText("GALLERY"));
    await user.click(mobile.getByText("PHOTOS"));

    expect(mobile.queryByText("HOME")).toBeNull();
  });
});
