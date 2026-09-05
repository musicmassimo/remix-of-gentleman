import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavLeaf {
  label: string;
  to: string;
}

interface NavGroup {
  label: string;
  children: NavLeaf[];
}

type NavEntry = NavLeaf | NavGroup;

const isGroup = (entry: NavEntry): entry is NavGroup => "children" in entry;

// Adding another band under MUSIC (or another gallery section) is just one
// more entry in the relevant `children` array — no component changes needed.
const navItems: NavEntry[] = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "MUSIC", to: "/music" },
  {
    label: "GALLERY",
    children: [
      { label: "PHOTOS", to: "/gallery/photos" },
      { label: "VIDEOS", to: "/gallery/videos" },
    ],
  },
  { label: "SHOWS", to: "/tour" },
  { label: "INQUIRIES", to: "/inquiries" },
];

const linkFont = {
  fontSize: 12,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  fontFamily: "'Space Grotesk', monospace",
};

const ACTIVE = "#fff";
const INACTIVE = "rgba(255,255,255,0.7)";
const PANEL_BG = "#000";
const PANEL_BORDER = "1px solid rgba(255,255,255,0.1)";
const ITEM_DIVIDER = "1px solid rgba(255,255,255,0.08)";

/** Hover-intent grace period so a diagonal mouse path doesn't snap the menu shut. */
const CLOSE_DELAY_MS = 120;

const TopNav = () => {
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement | null>(null);

  const [openGroup, setOpenGroup] = useState<string | null>(null);
  // A hover-opened menu closes when the pointer leaves; a click "pins" it open
  // so it survives mouseleave and can be dismissed by clicking the trigger
  // again. Without this, hovering then clicking would immediately re-close it.
  const [pinned, setPinned] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const closeTimer = useRef<number | undefined>(undefined);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== undefined) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  }, []);

  const closeAll = useCallback(() => {
    setOpenGroup(null);
    setPinned(false);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, []);

  const scheduleClose = useCallback(() => {
    if (pinned) return;
    cancelClose();
    closeTimer.current = window.setTimeout(
      () => setOpenGroup(null),
      CLOSE_DELAY_MS
    );
  }, [cancelClose, pinned]);

  // A group is "active" when the current route is one of its children.
  const isEntryActive = useCallback(
    (entry: NavEntry) =>
      isGroup(entry)
        ? entry.children.some((c) => c.to === pathname)
        : entry.to === pathname,
    [pathname]
  );

  // Close everything whenever the route changes.
  useEffect(() => {
    cancelClose();
    closeAll();
  }, [pathname, cancelClose, closeAll]);

  // Close on a tap/click outside the nav, or on Escape.
  useEffect(() => {
    if (!openGroup && !mobileOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroup, mobileOpen, closeAll]);

  // Don't leave a hover-close timer running after unmount.
  useEffect(() => cancelClose, [cancelClose]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 flex justify-center items-center h-[44px] z-50"
    >
      {/* Desktop / tablet (>= 768px): horizontal links with dropdowns */}
      <div className="hidden md:flex justify-center items-center gap-3 lg:gap-8">
        {navItems.map((entry) => {
          const active = isEntryActive(entry);

          if (!isGroup(entry)) {
            return (
              <Link
                key={entry.to}
                to={entry.to}
                className="transition-opacity hover:opacity-80 px-2 lg:px-3"
                style={{
                  ...linkFont,
                  color: active ? ACTIVE : INACTIVE,
                  lineHeight: "44px",
                }}
              >
                {entry.label}
              </Link>
            );
          }

          const open = openGroup === entry.label;
          return (
            <div
              key={entry.label}
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpenGroup(entry.label);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => {
                  cancelClose();
                  if (open && pinned) {
                    setOpenGroup(null);
                    setPinned(false);
                  } else {
                    setOpenGroup(entry.label);
                    setPinned(true);
                  }
                }}
                className="flex items-center gap-1 border-none bg-transparent cursor-pointer transition-opacity hover:opacity-80 px-2 lg:px-3"
                style={{
                  ...linkFont,
                  color: active || open ? ACTIVE : INACTIVE,
                  height: 44,
                }}
              >
                {entry.label}
                <ChevronDown
                  size={12}
                  style={{
                    transition: "transform 0.2s ease",
                    transform: open ? "rotate(180deg)" : "none",
                  }}
                />
              </button>

              {open && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-[44px] flex flex-col"
                  style={{
                    minWidth: 180,
                    background: PANEL_BG,
                    border: PANEL_BORDER,
                  }}
                >
                  {entry.children.map((child, i) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      onClick={closeAll}
                      className="transition-opacity hover:opacity-80 whitespace-nowrap"
                      style={{
                        ...linkFont,
                        color: pathname === child.to ? ACTIVE : INACTIVE,
                        padding: "14px 20px",
                        borderTop: i === 0 ? undefined : ITEM_DIVIDER,
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile (< 768px): hamburger + dropdown with expandable sections */}
      <div className="md:hidden">
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="topnav-mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="absolute right-3 top-0 flex h-[44px] w-[44px] items-center justify-center border-none bg-transparent cursor-pointer transition-opacity hover:opacity-80"
          style={{ color: ACTIVE }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {mobileOpen && (
          <div
            id="topnav-mobile-menu"
            className="absolute right-3 top-[44px] z-50 flex flex-col"
            style={{
              minWidth: 200,
              background: PANEL_BG,
              border: PANEL_BORDER,
            }}
          >
            {navItems.map((entry, i) => {
              const divider = i === 0 ? undefined : ITEM_DIVIDER;

              if (!isGroup(entry)) {
                return (
                  <Link
                    key={entry.to}
                    to={entry.to}
                    onClick={() => setMobileOpen(false)}
                    className="transition-opacity hover:opacity-80"
                    style={{
                      ...linkFont,
                      color: isEntryActive(entry) ? ACTIVE : INACTIVE,
                      padding: "14px 20px",
                      borderTop: divider,
                    }}
                  >
                    {entry.label}
                  </Link>
                );
              }

              const expanded = mobileExpanded === entry.label;
              return (
                <div key={entry.label} style={{ borderTop: divider }}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileExpanded(expanded ? null : entry.label)
                    }
                    className="flex w-full items-center justify-between border-none bg-transparent cursor-pointer transition-opacity hover:opacity-80"
                    style={{
                      ...linkFont,
                      color: isEntryActive(entry) || expanded ? ACTIVE : INACTIVE,
                      padding: "14px 20px",
                      textAlign: "left",
                    }}
                  >
                    {entry.label}
                    <ChevronDown
                      size={12}
                      style={{
                        transition: "transform 0.2s ease",
                        transform: expanded ? "rotate(180deg)" : "none",
                      }}
                    />
                  </button>

                  {expanded && (
                    <div className="flex flex-col">
                      {entry.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setMobileOpen(false)}
                          className="transition-opacity hover:opacity-80"
                          style={{
                            ...linkFont,
                            fontSize: 11,
                            color: pathname === child.to ? ACTIVE : INACTIVE,
                            padding: "12px 20px 12px 36px",
                            borderTop: ITEM_DIVIDER,
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
