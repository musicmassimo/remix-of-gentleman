import { tg } from "./styles";

const bio = [
  "Trumpet performer, educator, and arranger with 18 years of professional experience and conservatory-level training from the New England Conservatory. He has performed internationally across 39 countries through cruise ship touring and at major venues including the Monterey Jazz Festival, Dizzy's Club, Smalls Jazz Club, Jordan Hall, and Walt Disney Concert Hall. His performance background spans jazz, funk, soul, pop, R&B, indie, hip hop, and blues, along with experience in studio recording, remote sessions, and live ensemble work.",
  "As a modern musician, he integrates traditional trumpet performance with contemporary tools, including looping-based solo performance combining trumpet, keyboards, and drum pads. He has led and directed ensembles, conducted school bands, written horn arrangements for full bands, and developed original compositions for small ensembles and brass groups. His experience also includes transcription work, ear-based arranging, and professional rehearsal leadership in both educational and performance settings.",
  "His teaching approach is structured and results-driven, combining traditional fundamentals with modern creative approaches. He emphasizes tone development, reading fluency, ear training, improvisation, and stylistic versatility, with a strong focus on real-world performance skills. Students are trained to function in both academic and gigging environments with clarity, consistency, and confidence.",
  "He works with students from middle school through professional level, offering personalized instruction tailored to individual goals — whether that involves building foundational technique, preparing for auditions, improving improvisation, or developing stylistic fluency across genres. His instruction prioritizes musical independence, strong fundamentals, and adaptability in live performance situations.",
];

const studentsLearn = [
  "Tone production",
  "Range development",
  "Articulation",
  "Endurance",
  "Music theory",
  "Ear training",
  "Improvisation",
  "Practice strategy",
  "Musical confidence",
];

const TeachingAbout = () => (
  <>
    <section style={tg.section}>
      <p className="tg-heading">Trumpet Studio</p>
      <h1 className="tg-title">About</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {bio.map((paragraph, i) => (
          <p key={i} style={tg.body}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>

    <hr className="tg-rule" />

    <section style={{ ...tg.section, paddingBottom: 100 }}>
      <p className="tg-heading">What Students Learn</p>
      <ul className="tg-list">
        {studentsLearn.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  </>
);

export default TeachingAbout;
