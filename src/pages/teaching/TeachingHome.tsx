import { Link } from "react-router-dom";
import { tg } from "./styles";

const designedFor = [
  "School band",
  "Jazz band",
  "Honor band auditions",
  "Chair placements",
  "Solo preparation",
  "Modern performance and improvisation",
];

const TeachingHome = () => (
  <>
    <section style={tg.section}>
      <p className="tg-heading">Trumpet Lessons</p>
      <h1 className="tg-title">Modern Trumpet Lessons for Serious Students</h1>
      <p style={tg.body}>
        I help middle school, high school, and adult trumpet players develop
        strong fundamentals, confidence, range, musicianship, and consistent
        practice habits through structured private lessons tailored to each
        student's goals.
      </p>
    </section>

    <hr className="tg-rule" />

    <section style={tg.section}>
      <p className="tg-heading">Lessons Are Designed For</p>
      <ul className="tg-list">
        {designedFor.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>

    <section style={{ ...tg.section, paddingBottom: 100 }}>
      <Link className="tg-btn" to="/teaching/signup">
        Sign Up
      </Link>
    </section>
  </>
);

export default TeachingHome;
