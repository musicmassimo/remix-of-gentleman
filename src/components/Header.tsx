import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const scrollLinks = [
  { label: "About", href: "#about" },
  { label: "Videos", href: "#videos" },
  { label: "Releases", href: "#releases" },
  { label: "Contact", href: "#contact" },
];

const routeLinks = [
  { label: "Tour", to: "/tour" },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-white text-2xl font-bold tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Gentleman
        </Link>

        <nav className="hidden lg:flex items-center">
          {routeLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-white uppercase hover:opacity-80 transition-opacity"
              style={{ fontSize: 12, height: 44, lineHeight: "44px", padding: "0 12px", letterSpacing: "0.1em" }}
            >
              {label}
            </Link>
          ))}
          {scrollLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-white uppercase hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
              style={{ fontSize: 12, height: 44, lineHeight: "44px", padding: "0 12px", letterSpacing: "0.1em" }}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-64 bg-black z-50 flex flex-col p-8 pt-20 gap-6 lg:hidden"
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <Link to="/" className="text-white text-lg tracking-wider uppercase">Home</Link>
            {routeLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg tracking-wider uppercase"
              >
                {label}
              </Link>
            ))}
            {scrollLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => { scrollTo(href); setMenuOpen(false); }}
                className="text-white text-lg tracking-wider uppercase text-left bg-transparent border-none cursor-pointer"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
