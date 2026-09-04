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

const coreValues = [
  {
    title: "Practical Musicianship",
    desc: "He teaches skills students can apply in rehearsals, performances, auditions, recording sessions, and real musical situations.",
  },
  {
    title: "Individualized Instruction",
    desc: "Every lesson is built around the student's experience level, goals, strengths, and areas for growth.",
  },
  {
    title: "Long-Term Development",
    desc: "He is focused on building lasting habits and strong fundamentals that support continued progress over time.",
  },
  {
    title: "Performance-Based Learning",
    desc: "His teaching draws from professional experience in live performance, touring, arranging, recording, and ensemble leadership.",
  },
  {
    title: "Consistency & Accountability",
    desc: "Students receive clear guidance, structured practice goals, and ongoing feedback that supports measurable improvement.",
  },
  {
    title: "Musical Independence",
    desc: "He helps students become confident readers, listeners, improvisers, and performers who can solve musical challenges on their own.",
  },
];

const TeachingAbout = () => (
  <>
    <section style={tg.section}>
      <p className="tg-heading">Trumpet Studio</p>
      <h1 className="tg-title">About</h1>
      <p style={{ ...tg.body, marginBottom: 20 }}>
        Personalized trumpet instruction built on professional performance
        experience, practical musicianship, and long-term student growth.
        Trumpet lessons should do more than teach notes and exercises — the
        goal is to help students become confident, capable musicians who can
        read, perform, improvise, and continue developing long after a lesson
        ends.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {bio.map((paragraph, i) => (
          <p key={i} style={tg.body}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>

    <hr className="tg-rule" />

    <section style={tg.section}>
      <p className="tg-heading">What Students Learn</p>
      <ul className="tg-list">
        {studentsLearn.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>

    <hr className="tg-rule" />

    <section style={{ ...tg.section, paddingBottom: 100 }}>
      <p className="tg-heading">Core Values</p>
      <div className="tg-items">
        {coreValues.map(({ title, desc }) => (
          <div key={title}>
            <p className="tg-item-title">{title}</p>
            <p style={tg.body}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default TeachingAbout;
