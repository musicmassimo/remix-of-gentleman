import TopNav from "@/components/TopNav";
const portraitImg = "https://images.unsplash.com/photo-1766939228519-5f498be33e65?w=1600&q=80";

const milestones = [
  { year: "2016", text: "First gig at a dimly lit lounge in the city. Played a two-hour set of deep house to a room that didn't want to leave." },
  { year: "2018", text: "Self-released debut EP 'Midnight Suede' — picked up by underground blogs and tastemaker playlists overnight." },
  { year: "2019", text: "First headline show sold out in three days. Toured the east coast with a crate of vinyl and a vision." },
  { year: "2020", text: "Launched THE VELVET HOUR — a monthly listening series and radio show connecting his music to a global audience during lockdown." },
  { year: "2021", text: "Signed to Afterglow Records. Released 'Golden Thread' — named one of the year's best deep house tracks." },
  { year: "2022", text: "First international shows in Europe and Japan. The Velvet Hour surpassed 500K streams." },
  { year: "2023", text: "Released 'Lucid Architecture' — his most streamed single with over 4 million plays across platforms." },
  { year: "2025", text: "Debut album 'Infinite Drift' released on Afterglow Records. Launched The Velvet Hour Sessions outdoor summer series." },
  { year: "2026", text: "Currently touring worldwide with new EP and growing The Velvet Hour community." },
];

const bioLines = [
  "Massimo Paparello makes music for rooms that remember. His sound lives at the intersection of deep house warmth and progressive elegance — built from late-night atmospheres and an obsession with the perfect groove.",
  "Growing up between cities, he found his voice in borrowed spaces — borrowed decks, borrowed studios, borrowed time. His earliest mixes were recorded on a laptop with headphones on, layering tracks until the bedroom felt like a whole club.",
  "His live sets are known for their tension — the way he builds a room, makes the audience lean in. Whether playing intimate lounges or festival stages, every set feels like a journey.",
  "With releases on Afterglow Records, Midnight Structures, and Balance Music, he has performed across North America, Europe, and Japan — always playing rooms that feel right even as the rooms get bigger.",
];

const velvetHourLines = [
  "THE VELVET HOUR is more than a radio show — it's a listening practice. Each monthly episode is a carefully shaped hour of music that feels overlooked, underplayed, or simply too good to keep quiet.",
  "The live sessions bring that same intimacy to real rooms. Small venues, great sound, and an audience that actually listens.",
  "Over 150 episodes · Streamed in 20+ countries · 40+ live events",
];

const s = {
  label: { fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" },
  row: { fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.7)", transition: "opacity 0.3s", cursor: "default" },
  footer: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" },
};

const HoverRow = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{ ...s.row, opacity: 0.7, ...style }}
    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
  >
    {children}
  </div>
);

const About = () => (
  <main style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace", minHeight: "100vh" }}>
    <TopNav />

    {/* Hero */}
    <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <img
        src={portraitImg}
        alt="Massimo Paparello"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: 400, display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
        <span style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>about</span>
        <span style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>GENTLEMAN</span>
      </div>
    </section>

    {/* Bio */}
    <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
      <p style={{ ...s.label, marginBottom: 32 }}>The Artist</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {bioLines.map((line, i) => (
          <HoverRow key={i}>
            <p style={{ lineHeight: 1.8 }}>{line}</p>
          </HoverRow>
        ))}
      </div>
    </section>

    {/* The Velvet Hour */}
    <section style={{ padding: "60px 24px 80px", maxWidth: 800, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <p style={{ ...s.label, marginBottom: 32 }}>The Velvet Hour</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {velvetHourLines.map((line, i) => (
          <HoverRow key={i}>
            <p style={{ lineHeight: 1.8 }}>{line}</p>
          </HoverRow>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section style={{ padding: "60px 24px 100px", maxWidth: 800, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <p style={{ ...s.label, marginBottom: 32 }}>Timeline</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {milestones.map((m, i) => (
          <HoverRow key={i} style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
            <span style={{ minWidth: 50, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>{m.year}</span>
            <span style={{ lineHeight: 1.8 }}>{m.text}</span>
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

export default About;
