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
 * Teaching's design is deliberately NOT this site's black/gold "SYNDICATE"
 * house style. At the user's request it reproduces the actual visual design
 * of the live OllyOlly-built WordPress site (massimopaparello.com) — colors,
 * type, and button treatments pulled directly from that site's rendered
 * DOM: navy #112C4C + gold/olive #856C1B on white/off-white, set in Lora
 * (the live site's body and heading typeface throughout). Still scoped
 * under `.tg` so none of it leaks into the rest of this site.
 */
const tgCss = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

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
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid rgba(17,44,76,0.12);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tg-subnav::-webkit-scrollbar { display: none; }

  .tg-subnav a {
    flex: none;
    font-size: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Lora', serif;
    font-weight: 500;
    padding: 0 12px;
    line-height: 42px;
    color: rgba(17,44,76,0.6);
    transition: color 0.25s;
    white-space: nowrap;
  }
  .tg-subnav a:hover { color: #112c4c; }
  .tg-subnav a[aria-current="page"] {
    color: #112c4c;
    box-shadow: inset 0 -2px 0 0 #856c1b;
  }

  /* Hero photo banner, matching the live site's dark charcoal hero
     (rgb(36,41,46)) with a white Lora headline over it. The source photo is
     a 16:9 landscape with Massimo positioned in the right third of the
     frame and a lot of empty dark background on the left — a centred
     object-position crop on a narrow mobile viewport shows only that empty
     background, which is exactly the "hero not visible on mobile" bug seen
     elsewhere on this site. Biasing the crop hard to the right keeps him in
     frame at every width. */
  /* display:flex (rather than absolutely positioning the text overlay) is
     the point here: the background photo is absolutely positioned and so
     never contributes to this box's height, so if the overlay text were
     absolute too the box would sit at min-height and clip anything taller
     — which is exactly what happened on mobile, where the headline needs
     more room than min-height gives it. Flex with an in-flow content child
     lets the box grow to fit the real text at any width. */
  .tg-hero {
    position: relative;
    width: 100%;
    min-height: clamp(320px, 48vw, 560px);
    overflow: hidden;
    background: #24292e;
    display: flex;
    align-items: flex-end;
  }
  .tg-hero-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 75% center;
    opacity: 0.6;
  }
  .tg-hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(36,41,46,0.1) 40%, #24292e 100%);
  }
  .tg-hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 24px 24px 40px;
  }
  @media (max-width: 600px) {
    .tg-hero-img { object-position: 85% center; }
  }

  .tg-heading {
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 20px;
    color: #856c1b;
  }

  .tg-title {
    font-family: 'Lora', serif;
    font-size: clamp(28px, 4.4vw, 40px);
    line-height: 1.25;
    font-weight: 600;
    margin: 0 0 24px;
    color: #112c4c;
  }

  /* On the dark hero the same title needs to read in white instead. */
  .tg-title--on-dark { color: #fff; }

  .tg-rule {
    height: 1px;
    border: 0;
    margin: 0 auto 56px;
    max-width: 800px;
    background: rgba(17,44,76,0.12);
  }

  /* Solid navy button, matching the live site's "Talk to a Pro" CTA. */
  .tg-btn {
    display: inline-block;
    padding: 12px 28px;
    font-size: 14px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Lora', serif;
    font-weight: 500;
    color: #fff;
    background: #112c4c;
    border: 1px solid #112c4c;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.3s;
  }
  .tg-btn:hover { opacity: 0.85; }

  /* Navy outline button, matching "Learn About His Studio" / "Read More". */
  .tg-btn-outline {
    display: inline-block;
    padding: 12px 28px;
    font-size: 14px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Lora', serif;
    font-weight: 500;
    color: #112c4c;
    background: transparent;
    border: 1px solid #112c4c;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }
  .tg-btn-outline:hover { background: #112c4c; color: #fff; }

  /* Same outline button, recolored for use over the dark hero photo where
     navy-on-navy would be unreadable. */
  .tg-btn-outline--on-dark {
    color: #fff;
    border-color: rgba(255,255,255,0.7);
  }
  .tg-btn-outline--on-dark:hover { background: #fff; color: #112c4c; }

  .tg-link {
    color: #112c4c;
    text-decoration: underline;
    text-decoration-color: rgba(17,44,76,0.35);
    transition: opacity 0.3s;
    overflow-wrap: anywhere;
  }
  .tg-link:hover { opacity: 0.7; }

  /* Title + description entries (lesson categories, core values). */
  .tg-items {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }
  .tg-item-title {
    font-family: 'Lora', serif;
    font-size: 16px;
    letter-spacing: 0;
    color: #856c1b;
    margin: 0 0 6px;
    font-weight: 600;
  }

  /* FAQ accordion, native <details> so no JS is needed. */
  .tg-faq details {
    border-bottom: 1px solid rgba(17,44,76,0.12);
    padding: 16px 0;
  }
  .tg-faq details:first-of-type { border-top: 1px solid rgba(17,44,76,0.12); }
  .tg-faq summary {
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    color: #112c4c;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
  .tg-faq summary::-webkit-details-marker { display: none; }
  .tg-faq summary::after {
    content: "+";
    flex: none;
    color: #856c1b;
    font-size: 18px;
  }
  .tg-faq details[open] summary::after { content: "\\2212"; }
  .tg-faq p { margin: 12px 0 0; }

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
    font-size: 13px;
    letter-spacing: 0.03em;
    color: rgba(23,23,23,0.8);
  }
  .tg-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 6px;
    height: 1px;
    background: #856c1b;
  }

  /* Label/value rows: stack on narrow screens so long values never overflow,
     matching the Contact page behaviour. */
  .tg-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    letter-spacing: 0.02em;
    color: rgba(23,23,23,0.85);
  }
  .tg-row > :last-child { overflow-wrap: anywhere; }
  @media (max-width: 600px) {
    .tg-row { flex-direction: column; align-items: flex-start; gap: 4px; }
  }

  /* Forms — light fields with a navy focus ring, matching the editorial
     white-background look instead of the rest of this site's dark inputs. */
  .tg-field { display: flex; flex-direction: column; gap: 8px; }
  .tg-field label {
    font-size: 12px;
    letter-spacing: 0.04em;
    color: rgba(23,23,23,0.6);
  }
  .tg-field .tg-optional { color: rgba(23,23,23,0.35); }

  .tg-field input,
  .tg-field select,
  .tg-field textarea {
    width: 100%;
    background: #fff;
    border: 1px solid rgba(17,44,76,0.25);
    color: #171717;
    font-family: 'Lora', serif;
    font-size: 14px;
    padding: 11px 13px;
    outline: none;
    border-radius: 4px;
    transition: border-color 0.25s, background 0.25s;
  }
  .tg-field textarea { min-height: 120px; resize: vertical; }
  .tg-field select { appearance: none; cursor: pointer; }
  .tg-field input:focus,
  .tg-field select:focus,
  .tg-field textarea:focus {
    border-color: #112c4c;
    background: #f9f9f9;
  }
  .tg-field input::placeholder,
  .tg-field textarea::placeholder { color: rgba(23,23,23,0.3); }

  .tg-form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 22px;
  }
  .tg-form-wide { grid-column: 1 / -1; }

  .tg-confirm {
    border: 1px solid rgba(133,108,27,0.35);
    background: #f9f9f9;
    padding: 24px;
    font-size: 14px;
    line-height: 1.8;
    color: #171717;
  }

  /* Off-white section band, matching the live site's alternating
     rgb(249,249,249) sections ("Train With Purpose", the contact bar). */
  .tg-alt {
    background: #f9f9f9;
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
        background: "#fff",
        color: "#171717",
        fontFamily: "'Lora', serif",
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

      {/* 44px main nav + 42px sub-nav. Sections add their own top padding,
          so the hero (which has none) sits flush against the sub-nav like
          the live site, matching its hero-touches-nav layout. */}
      <div style={{ paddingTop: 86 }}>
        <Outlet />
      </div>

      <footer
        style={{
          padding: "40px 24px",
          textAlign: "center",
          fontSize: 12,
          color: "rgba(23,23,23,0.5)",
          background: "#f9f9f9",
          borderTop: "1px solid rgba(17,44,76,0.1)",
        }}
      >
        © 2026 Massimo Paparello. All rights reserved.
      </footer>
    </main>
  );
};

export default TeachingLayout;
