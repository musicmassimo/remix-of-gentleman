import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "TOUR", to: "/tour" },
  { label: "MUSIC", to: "/music" },
  { label: "ABOUT", to: "/about" },
  { label: "CONTACT", to: "/contact" },
];

const linkFont = {
  fontSize: 12,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  fontFamily: "'Space Grotesk', monospace",
};

const TopNav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close the mobile dropdown whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open, close the mobile dropdown on a tap outside it or on Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-center items-center gap-8 h-[44px] z-50">
      {/* Desktop / tablet (>= 768px): horizontal links — unchanged */}
      <div className="hidden md:flex justify-center items-center gap-8">
        {navItems.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="transition-opacity hover:opacity-80"
            style={{
              ...linkFont,
              color: pathname === to ? "#fff" : "rgba(255,255,255,0.7)",
              padding: "0 12px",
              lineHeight: "44px",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile (< 768px): hamburger button + dropdown */}
      <div ref={menuRef} className="md:hidden">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="topnav-mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="absolute right-3 top-0 flex h-[44px] w-[44px] items-center justify-center border-none bg-transparent cursor-pointer transition-opacity hover:opacity-80"
          style={{ color: "#fff" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {open && (
          <div
            id="topnav-mobile-menu"
            className="absolute right-3 top-[44px] z-50 flex flex-col"
            style={{
              minWidth: 180,
              background: "#000",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {navItems.map(({ label, to }, i) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="transition-opacity hover:opacity-80"
                style={{
                  ...linkFont,
                  color: pathname === to ? "#fff" : "rgba(255,255,255,0.7)",
                  padding: "14px 20px",
                  borderTop: i === 0 ? undefined : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
