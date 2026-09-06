import TopNav from "@/components/TopNav";

const contacts = [
  { label: "General, Bookings & Teaching", value: "massimo@massimopaparello.com", href: "mailto:massimo@massimopaparello.com" },
  { label: "Syndicate Bookings", value: "syndicatebookings@massimopaparello.com", href: "mailto:syndicatebookings@massimopaparello.com" },
  { label: "Based in", value: "Los Angeles, CA" },
];

const socials = [
  { label: "Instagram", handle: "@musicmassimo", href: "https://www.instagram.com/musicmassimo/" },
  { label: "YouTube", handle: "@massimopaparello0213", href: "https://youtube.com/@massimopaparello0213" },
  { label: "Facebook", handle: "orangefoot13", href: "https://www.facebook.com/orangefoot13/" },
  { label: "Threads", handle: "@musicmassimo", href: "https://www.threads.com/@musicmassimo" },
];

const s = {
  label: { fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" },
  row: { fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.7)", transition: "opacity 0.3s", cursor: "default" },
  footer: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" },
};

const HoverRow = ({ children, style, onClick, className }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void; className?: string }) => (
  <div
    className={className}
    style={{ ...s.row, opacity: 0.7, ...style }}
    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
    onClick={onClick}
  >
    {children}
  </div>
);

/*
 * Label / value rows. On desktop these sit on one line (label left, value
 * right). On narrow screens the long email addresses and handles are single
 * unbreakable tokens that push past the viewport and get clipped, so below
 * 600px the row stacks vertically and long values are allowed to wrap.
 */
const rowCss = `
  .cx-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cx-row > :last-child {
    overflow-wrap: anywhere;
  }
  @media (max-width: 600px) {
    .cx-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }
`;

const Inquiries = () => {
  return (
    <main style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{rowCss}</style>
      <TopNav />

      {/* Header banner */}
      <section style={{ position: "relative", height: "60vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src="/images/massimo-11.jpg"
          alt="Massimo Paparello"
          loading="eager"
          decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "relative", width: "100%", maxWidth: 400, display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>get in</span>
          <span style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>TOUCH</span>
        </div>
      </section>

      {/* Inquiries rows */}
      <section style={{ padding: "0 24px 80px", maxWidth: 800, margin: "0 auto" }}>
        <p style={{ ...s.label, marginBottom: 32 }}>Booking & Management</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {contacts.map((c, i) => (
            <HoverRow key={i} className="cx-row">
              <span>{c.label}</span>
              {c.href ? (
                <a href={c.href} style={{ color: "inherit", textDecoration: "none" }}>{c.value}</a>
              ) : (
                <span>{c.value}</span>
              )}
            </HoverRow>
          ))}
        </div>
      </section>

      {/* Socials */}
      <section style={{ padding: "0 24px 80px", maxWidth: 800, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 60 }}>
        <p style={{ ...s.label, marginBottom: 32 }}>Follow Massimo Paparello</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {socials.map((item, i) => (
            <HoverRow key={i} className="cx-row">
              <span>{item.label}</span>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {item.handle}
              </a>
            </HoverRow>
          ))}
        </div>
      </section>

    {/* Footer */}
    <footer style={{ padding: "40px 24px", textAlign: "center", ...s.footer }}>
      © 2026 Massimo Paparello. All rights reserved.
    </footer>
    </main>
  );
};

export default Inquiries;
