import { Link, Outlet, useLocation } from "react-router-dom";
import TopNav from "@/components/TopNav";

const subNav = [
  { label: "Home", to: "/teaching" },
  { label: "About", to: "/teaching/about" },
  { label: "Sign Up", to: "/teaching/signup" },
  { label: "Resources", to: "/teaching/resources" },
  { label: "Contact", to: "/teaching/contact" },
];

/*
 * Teaching's brass/gold accent. Scoped under `.tg` exactly like SYNDICATE's
 * `.syn` red-orange, so the two identities can't bleed into each other or
 * into the rest of the site.
 *
 * Gradient text declares its solid colour first and only applies
 * background-clip inside @supports — without that, unsupported browsers get
 * `color: transparent` and the text renders invisible.
 */
const tgCss = `
  .tg-subnav {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 40;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    height: 42px;
    background: rgba(0,0,0,0.92);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid rgba(217,169,76,0.25);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tg-subnav::-webkit-scrollbar { display: none; }

  .tg-subnav a {
    flex: none;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Space Grotesk', monospace;
    padding: 0 12px;
    line-height: 42px;
    color: rgba(255,255,255,0.55);
    transition: color 0.25s, opacity 0.25s;
    white-space: nowrap;
  }
  .tg-subnav a:hover { color: #e8c87a; }
  .tg-subnav a[aria-current="page"] {
    color: #e8c87a;
    box-shadow: inset 0 -2px 0 0 #d9a94c;
  }

  .tg-heading {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 28px;
    color: #d9a94c;
  }
  @supports ((background-clip: text) or (-webkit-background-clip: text)) {
    .tg-heading {
      background-image: linear-gradient(90deg, #b8862b 0%, #e8c87a 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      width: fit-content;
    }
  }

  .tg-title {
    font-size: clamp(26px, 5vw, 40px);
    line-height: 1.2;
    letter-spacing: -0.01em;
    font-weight: 500;
    margin: 0 0 24px;
    color: #fff;
  }

  .tg-rule {
    height: 1px;
    border: 0;
    margin: 0 auto 56px;
    max-width: 800px;
    background: linear-gradient(90deg, #b8862b 0%, #e8c87a 55%, rgba(232,200,122,0) 100%);
    opacity: 0.45;
  }

  .tg-btn {
    display: inline-block;
    padding: 14px 28px;
    font-size: 11px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Space Grotesk', monospace;
    color: #140f03;
    background: linear-gradient(100deg, #b8862b 0%, #e8c87a 100%);
    border: 0;
    cursor: pointer;
    transition: opacity 0.3s;
  }
  .tg-btn:hover { opacity: 0.85; }

  .tg-link {
    color: #e8c87a;
    text-decoration: none;
    transition: opacity 0.3s;
    overflow-wrap: anywhere;
  }
  .tg-link:hover { opacity: 0.75; }

  /* Bulleted lists with a gold marker. */
  .tg-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px 24px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .tg-list li {
    position: relative;
    padding-left: 18px;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.72);
  }
  .tg-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 6px;
    height: 1px;
    background: #d9a94c;
  }

  /* Label/value rows: stack on narrow screens so long values never overflow,
     matching the Contact page behaviour. */
  .tg-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
  }
  .tg-row > :last-child { overflow-wrap: anywhere; }
  @media (max-width: 600px) {
    .tg-row { flex-direction: column; align-items: flex-start; gap: 4px; }
  }

  /* Forms — dark fields with a gold focus ring, overriding the embedded
     provider's default serif/blue styling. */
  .tg-field { display: flex; flex-direction: column; gap: 8px; }
  .tg-field label {
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }
  .tg-field .tg-optional { color: rgba(255,255,255,0.3); }

  .tg-field input,
  .tg-field select,
  .tg-field textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    font-family: 'Space Grotesk', monospace;
    font-size: 13px;
    letter-spacing: 0.05em;
    padding: 11px 13px;
    outline: none;
    border-radius: 0;
    transition: border-color 0.25s, background 0.25s;
  }
  .tg-field textarea { min-height: 120px; resize: vertical; }
  .tg-field select { appearance: none; cursor: pointer; }
  .tg-field option { background: #0a0a0a; color: #fff; }
  .tg-field input:focus,
  .tg-field select:focus,
  .tg-field textarea:focus {
    border-color: #d9a94c;
    background: rgba(217,169,76,0.06);
  }
  .tg-field input::placeholder,
  .tg-field textarea::placeholder { color: rgba(255,255,255,0.28); }

  .tg-form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 22px;
  }
  .tg-form-wide { grid-column: 1 / -1; }

  .tg-confirm {
    border: 1px solid rgba(217,169,76,0.4);
    background: rgba(217,169,76,0.07);
    padding: 24px;
    font-size: 13px;
    line-height: 1.8;
    color: rgba(255,255,255,0.8);
    letter-spacing: 0.03em;
  }
`;

const TeachingLayout = () => {
  const { pathname } = useLocation();
  // Trailing slashes shouldn't break the Home highlight.
  const current = pathname.replace(/\/+$/, "") || "/teaching";

  return (
    <main
      className="tg"
      style={{
        background: "#000",
        color: "#fff",
        fontFamily: "'Space Grotesk', monospace",
        minHeight: "100vh",
      }}
    >
      <style>{tgCss}</style>

      {/* Main site nav stays fixed above the sub-nav at all times. */}
      <TopNav />

      <nav className="tg-subnav" aria-label="Teaching">
        {subNav.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            aria-current={current === to ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* 44px main nav + 42px sub-nav, plus breathing room. */}
      <div style={{ paddingTop: 130 }}>
        <Outlet />
      </div>

      <footer
        style={{
          padding: "40px 24px",
          textAlign: "center",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        © 2026 Massimo Paparello. All rights reserved.
      </footer>
    </main>
  );
};

export default TeachingLayout;
