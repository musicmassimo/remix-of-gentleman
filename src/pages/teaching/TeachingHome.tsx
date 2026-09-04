import { Link } from "react-router-dom";
import { tg } from "./styles";

const lessonTypes = [
  {
    title: "Beginner Trumpet Lessons & Foundation Training",
    desc: "Build tone, rhythm, and reading skills with beginner coaching. Start trumpet with clear habits and personal guidance.",
  },
  {
    title: "Intermediate & School Band Trumpet Lessons",
    desc: "Improve range, endurance, and musicianship through focused coaching. Prepare for auditions, performances, and school band success.",
  },
  {
    title: "Jazz Trumpet Lessons & Improvisation Coaching",
    desc: "Develop improvisation, ear training, and jazz vocabulary. Learn to create confident solos and stronger musical expression.",
  },
  {
    title: "Audition Prep & Advanced Trumpet Coaching",
    desc: "Prepare for auditions, advanced ensembles, and college programs. Build consistency, confidence, and performance-ready skills.",
  },
  {
    title: "Professional Musician Development & Artist Coaching",
    desc: "Develop your artistic voice and professional musicianship. Build skills for performance, recording, and creative growth.",
  },
  {
    title: "Online Trumpet Lessons & Personalized Music Coaching",
    desc: "Learn trumpet from anywhere with live personalized coaching. Build skills, confidence, and consistency through online instruction.",
  },
];

const faqs = [
  {
    q: "Who are these lessons for?",
    a: "He teaches middle school students, high school students, adult beginners, returning players, jazz students, auditioning musicians, and advanced performers.",
  },
  {
    q: "Do you offer online trumpet lessons?",
    a: "Yes. Online trumpet lessons are available for students who want live coaching, practice guidance, technique feedback, and goal tracking from any location.",
  },
  {
    q: "What information should I send before booking?",
    a: "Please include the student's age, experience level, lesson goals, and location if you are asking about travel lessons.",
  },
  {
    q: "How are payments accepted?",
    a: "Payments may be made through Zelle, Venmo, or cash for in-person lessons. Payment is due at the lesson or in advance for monthly blocks.",
  },
  {
    q: "What is the cancellation policy?",
    a: "A 24-hour notice is required to cancel or reschedule. Late cancellations may be charged in full, and no-shows are charged in full.",
  },
];

const TeachingHome = () => (
  <>
    <section style={tg.section}>
      <p className="tg-heading">Trumpet Studio</p>
      <h1 className="tg-title">
        Get Professional Trumpet Lessons in South Bay and the Greater Los
        Angeles Area
      </h1>
      <p style={tg.body}>
        He helps middle school, high school, and adult players improve tone,
        reading, range, improvisation, and practice habits through structured
        private instruction.
      </p>
    </section>

    <hr className="tg-rule" />

    <section style={tg.section}>
      <p className="tg-heading">Learn From a Performer Who Teaches With Structure</p>
      <p style={tg.body}>
        His trumpet instruction draws from years of performance, arranging,
        recording, and ensemble leadership experience. Students receive clear
        goals, personalized feedback, and focused practice plans built around
        their age, skill level, schedule, and musical interests.
      </p>
    </section>

    <hr className="tg-rule" />

    <section style={tg.section}>
      <p className="tg-heading">Train With Purpose</p>
      <p style={{ ...tg.body, marginBottom: 32 }}>
        From first notes to advanced improvisation, each lesson is built
        around real musical progress. His private trumpet lessons help
        students improve technique, confidence, and independence.
      </p>
      <div className="tg-items">
        {lessonTypes.map(({ title, desc }) => (
          <div key={title}>
            <p className="tg-item-title">{title}</p>
            <p style={tg.body}>{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <hr className="tg-rule" />

    <section style={tg.section}>
      <p className="tg-heading">Frequently Asked Questions</p>
      <div className="tg-faq">
        {faqs.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}</summary>
            <p style={tg.note}>{a}</p>
          </details>
        ))}
      </div>
    </section>

    <section style={{ ...tg.section, paddingBottom: 100 }}>
      <Link className="tg-btn" to="/teaching/signup">
        Sign Up
      </Link>
    </section>
  </>
);

export default TeachingHome;
