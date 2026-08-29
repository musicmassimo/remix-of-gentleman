import TopNav from "@/components/TopNav";
import portraitAsset from "@/assets/massimo-portrait.jpg.asset.json";
const portraitImg = portraitAsset.url;

const bioLines = [
  "Born and raised in Los Angeles, CA, trumpeter Massimo Paparello brings nearly two decades of performance experience across jazz, soul, funk, pop, R&B, indie, and hip hop. He holds a Bachelor's and Master's degree in Jazz Performance from the New England Conservatory in Boston, where he developed the ear training, sight-reading, and harmonic foundation that anchors his playing today, mentored by Jason Palmer, Jason Moran, and Cecil McBee.",
  "Massimo has performed at some of the country's most storied stages, including the Monterey Jazz Festival, Jordan Hall, Walt Disney Concert Hall, Dizzy's Club, Smalls Jazz Club, and The Lighthouse Cafe. His touring credits include nine months on the road with the BB King Allstars, and multi-month cruise ship contracts that took him to 39 countries, performing entirely by ear across international ports and onboard entertainment circuits.",
  "Beyond the stage, Massimo is an active arranger and composer, writing horn section parts and full band arrangements. He also leads his own jazz quintet, SYNDICATE, and works regularly as a transcriber for solos, horn lines, and ensemble parts.",
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
        <span style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>MASSIMO PAPARELLO</span>
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

    {/* Footer */}
    <footer style={{ padding: "40px 24px", textAlign: "center", ...s.footer }}>
      © 2026 Massimo Paparello. All rights reserved.
    </footer>
  </main>
);

export default About;
