import TopNav from "@/components/TopNav";

const lineup = [
  { role: "Trumpet", name: "Massimo Paparello" },
  { role: "Alto Saxophone & Flute", name: "Evan O'Brien" },
  { role: "Piano", name: "Sam Smylie" },
  { role: "Bass", name: "Adam Hernandez" },
  { role: "Drums", name: "Dante Newcombe-Kenealy" },
];

const tracks = [
  { title: "Rosebush", credit: "Massimo Paparello", src: "/audio/rosebush.mp3" },
  { title: "PAI", credit: "Sam Smylie", src: "/audio/pai.mp3" },
];

// youtu.be/M0e5tfIwKMU with the ?t=371 timestamp preserved as ?start=
const VIDEO_EMBED = "https://www.youtube.com/embed/M0e5tfIwKMU?start=371";

const s = {
  section: { padding: "0 24px 80px", maxWidth: 800, margin: "0 auto" } as const,
  body: {
    fontSize: 13,
    lineHeight: 1.9,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: "0.03em",
  } as const,
  footer: {
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.3)",
  },
};

/*
 * SYNDICATE's own visual identity: a red→orange gradient used for the title,
 * section headings and accent elements. Everything is namespaced under `.syn`
 * so none of it leaks into the rest of the site's palette.
 *
 * Gradient text needs a real fallback: setting `color: transparent` without
 * background-clip support would render the text invisible, so the solid colour
 * is declared first and the gradient only applied inside @supports.
 */
const synCss = `
  .syn-title {
    font-family: 'Archivo Black', 'Space Grotesk', system-ui, sans-serif;
    font-weight: 400;
    font-size: clamp(52px, 15vw, 132px);
    line-height: 0.95;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    display: inline-block;
    transform: skewX(-8deg);
    color: #ff5a3b;
  }
  @supports ((background-clip: text) or (-webkit-background-clip: text)) {
    .syn-title {
      background-image: linear-gradient(100deg, #ff3b3b 0%, #ff9d4d 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  .syn-heading {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 32px;
    color: #ff7a42;
  }
  @supports ((background-clip: text) or (-webkit-background-clip: text)) {
    .syn-heading {
      background-image: linear-gradient(90deg, #ff3b3b 0%, #ff9d4d 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      width: fit-content;
    }
  }

  /* Gradient rule standing in for the site's plain 1px section divider. */
  .syn-rule {
    height: 1px;
    border: 0;
    margin: 0 auto 60px;
    max-width: 800px;
    background: linear-gradient(90deg, #ff3b3b 0%, #ff9d4d 60%, rgba(255,157,77,0) 100%);
    opacity: 0.5;
  }

  .syn-btn {
    display: inline-block;
    padding: 14px 28px;
    font-size: 11px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-decoration: none;
    color: #140503;
    background: linear-gradient(100deg, #ff3b3b 0%, #ff9d4d 100%);
    transition: opacity 0.3s;
  }
  .syn-btn:hover { opacity: 0.85; }

  .syn-link {
    color: #ff9d4d;
    text-decoration: none;
    transition: opacity 0.3s;
    overflow-wrap: anywhere;
  }
  .syn-link:hover { opacity: 0.75; }

  /* Same stacking behaviour as the Contact page rows: long values wrap
     instead of pushing past a narrow viewport. */
  .syn-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
  }
  .syn-row > :last-child { overflow-wrap: anywhere; }
  @media (max-width: 600px) {
    .syn-row { flex-direction: column; align-items: flex-start; gap: 4px; }
  }

  .syn-video {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 1px solid rgba(255,157,77,0.35);
    background: #0a0a0a;
  }
  .syn-video iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .syn-audio {
    width: 100%;
    margin-top: 10px;
  }
`;

const Syndicate = () => (
  <main
    className="syn"
    style={{
      background: "#000",
      color: "#fff",
      fontFamily: "'Space Grotesk', monospace",
      minHeight: "100vh",
    }}
  >
    <style>{synCss}</style>
    <TopNav />

    {/* Title */}
    <section style={{ ...s.section, paddingTop: 120, paddingBottom: 60 }}>
      <h1 style={{ margin: 0 }}>
        <span className="syn-title">Syndicate</span>
      </h1>
      <p
        style={{
          marginTop: 20,
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Los Angeles Jazz Quintet
      </p>
    </section>

    <hr className="syn-rule" />

    {/* About */}
    <section style={s.section}>
      <p className="syn-heading">About</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <p style={s.body}>
          SYNDICATE is a Los Angeles-based jazz quintet led by trumpeter Massimo
          Paparello. The group performs original compositions shaped
          collectively by its members, drawing from a wide range of influences
          across modern jazz, bebop, and contemporary improvised music. Writing
          is shared within the ensemble, resulting in material that reflects
          multiple compositional voices rather than a single perspective.
        </p>
        <p style={s.body}>
          With instrumentation of trumpet, alto saxophone/flute, piano, bass,
          and drums, SYNDICATE emphasizes interactive ensemble playing, detailed
          arrangements, and open improvisation. The result is a repertoire that
          shifts between structured writing and spontaneous improvisation,
          highlighting the voice of each player within a cohesive identity.
        </p>
      </div>
    </section>

    <hr className="syn-rule" />

    {/* Featured video */}
    <section style={s.section}>
      <p className="syn-heading">Featured Video</p>
      <div className="syn-video">
        <iframe
          src={VIDEO_EMBED}
          title="SYNDICATE — Live at Jazz Fest in The Backyard"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <p
        style={{
          marginTop: 16,
          fontSize: 11,
          lineHeight: 1.7,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Featured Live Video — SYNDICATE, Live at Jazz Fest in The Backyard
        (6/27/2026), filmed on Super 8 film.
      </p>
    </section>

    <hr className="syn-rule" />

    {/* Music */}
    <section style={s.section}>
      <p className="syn-heading">Music</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {tracks.map((t) => (
          <div key={t.src}>
            <div className="syn-row">
              <span>{t.title}</span>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>{t.credit}</span>
            </div>
            {/* preload="none": these files are 16–22 MB, so nothing is
                fetched until a visitor actually presses play. */}
            <audio
              className="syn-audio"
              controls
              preload="none"
              src={t.src}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </section>

    <hr className="syn-rule" />

    {/* Lineup */}
    <section style={s.section}>
      <p className="syn-heading">Lineup</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {lineup.map((m) => (
          <div key={m.role} className="syn-row">
            <span>{m.role}</span>
            <span style={{ color: "rgba(255,255,255,0.9)" }}>{m.name}</span>
          </div>
        ))}
      </div>
    </section>

    <hr className="syn-rule" />

    {/* Contact */}
    <section style={s.section}>
      <p className="syn-heading">Contact</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="syn-row">
          <span>Bookings</span>
          <a
            className="syn-link"
            href="mailto:syndicatebookings@massimopaparello.com"
          >
            syndicatebookings@massimopaparello.com
          </a>
        </div>
        <div className="syn-row">
          <span>Instagram</span>
          <a
            className="syn-link"
            href="https://instagram.com/syndicatequintet"
            target="_blank"
            rel="noopener noreferrer"
          >
            @syndicatequintet
          </a>
        </div>
      </div>
    </section>

    <hr className="syn-rule" />

    {/* EPK */}
    <section style={{ ...s.section, paddingBottom: 100 }}>
      <p className="syn-heading">Press Kit</p>
      <a className="syn-btn" href="/syndicate-epk.pdf" download>
        Download EPK
      </a>
    </section>

    <footer style={{ padding: "40px 24px", textAlign: "center", ...s.footer }}>
      © 2026 Massimo Paparello. All rights reserved.
    </footer>
  </main>
);

export default Syndicate;
