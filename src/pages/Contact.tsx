import { useState } from "react";
import TopNav from "@/components/TopNav";

const contacts = [
  { label: "General Bookings", value: "bookings@gentleman.live", href: "mailto:bookings@gentleman.live" },
  { label: "Press & Media", value: "press@gentleman.live", href: "mailto:press@gentleman.live" },
  { label: "The Velvet Hour", value: "events@thevelvethour.live", href: "mailto:events@thevelvethour.live" },
  { label: "Based in", value: "Metro City" },
];

const socials = [
  { label: "Instagram", handle: "@gentleman" },
  { label: "YouTube", handle: "Gentleman Music" },
  { label: "Facebook", handle: "gentlemanmusic" },
  { label: "Spotify", handle: "Gentleman" },
  { label: "Soundcloud", handle: "gentleman" },
  { label: "Beatport", handle: "Gentleman" },
];

const velvetSocials = [
  { label: "Instagram", handle: "@thevelvethour" },
  { label: "YouTube", handle: "The Velvet Hour" },
  { label: "Facebook", handle: "thevelvethour" },
];

const faqs = [
  { q: "What is your typical set length?", a: "Standard sets are 2 hours, but I love extended 4-6 hour sessions for the right event. Open-to-close sets are available for select venues." },
  { q: "Do you play at private events?", a: "Yes, selectively. Please reach out to the booking email with details about your event, date, and vision." },
  { q: "What are your technical requirements?", a: "A detailed tech rider is available upon request. Minimum requirements include a Pioneer CDJ-3000/DJM-V10 setup or equivalent." },
  { q: "How can I submit a demo for The Velvet Hour?", a: "Send a private SoundCloud or Dropbox link to events@thevelvethour.live with 'Demo Submission' in the subject line." },
];

const s = {
  label: { fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" },
  row: { fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.7)", transition: "opacity 0.3s", cursor: "default" },
  footer: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" },
};

const HoverRow = ({ children, style, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) => (
  <div
    style={{ ...s.row, opacity: 0.7, ...style }}
    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
    onClick={onClick}
  >
    {children}
  </div>
);

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace", minHeight: "100vh" }}>
      <TopNav />

      {/* Title */}
      <section style={{ height: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 400, display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>get in</span>
          <span style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>TOUCH</span>
        </div>
      </section>

      {/* Contact rows */}
      <section style={{ padding: "0 24px 80px", maxWidth: 800, margin: "0 auto" }}>
        <p style={{ ...s.label, marginBottom: 32 }}>Booking & Management</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {contacts.map((c, i) => (
            <HoverRow key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

      {/* Gentleman socials */}
      <section style={{ padding: "0 24px 80px", maxWidth: 800, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 60 }}>
        <p style={{ ...s.label, marginBottom: 32 }}>Follow Gentleman</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {socials.map((item, i) => (
            <HoverRow key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{item.label}</span>
              <span>{item.handle}</span>
            </HoverRow>
          ))}
        </div>
      </section>

      {/* Velvet Hour socials */}
      <section style={{ padding: "0 24px 80px", maxWidth: 800, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 60 }}>
        <p style={{ ...s.label, marginBottom: 32 }}>Follow The Velvet Hour</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {velvetSocials.map((item, i) => (
            <HoverRow key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{item.label}</span>
              <span>{item.handle}</span>
            </HoverRow>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 24px 100px", maxWidth: 800, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 60 }}>
        <p style={{ ...s.label, marginBottom: 32 }}>Frequently Asked</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {faqs.map((faq, i) => (
            <HoverRow
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{faq.q}</span>
                <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: 16 }}>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && (
                <p style={{ marginTop: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, textTransform: "none", letterSpacing: "0.05em", fontSize: 11 }}>
                  {faq.a}
                </p>
              )}
            </HoverRow>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 24px", textAlign: "center", ...s.footer }}>
        © 2026 Gentleman. All rights reserved.
      </footer>
    </main>
  );
};

export default Contact;
