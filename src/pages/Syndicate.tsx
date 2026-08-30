import TopNav from "@/components/TopNav";

// Placeholder — real SYNDICATE page content is built in a later step.
const Syndicate = () => (
  <main
    style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace", minHeight: "100vh", display: "flex", flexDirection: "column" }}
  >
    <TopNav />

    <section
      style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px", gap: 16, textAlign: "center" }}
    >
      <h1 style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
        SYNDICATE
      </h1>
      <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
        Coming soon
      </p>
    </section>

    <footer style={{ padding: "40px 24px", textAlign: "center", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
      © 2026 Massimo Paparello. All rights reserved.
    </footer>
  </main>
);

export default Syndicate;
