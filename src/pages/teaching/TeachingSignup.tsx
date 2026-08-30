import { useState } from "react";
import { tg } from "./styles";

const experienceLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Professional",
];

const lessonFormats = ["In-Person", "Zoom / Online"];

const TeachingSignup = () => {
  const [submitted, setSubmitted] = useState(false);
  const [studentName, setStudentName] = useState("");

  // No backend yet — the form validates natively, then swaps to a
  // confirmation message in place.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStudentName(String(data.get("studentName") ?? "").trim());
    setSubmitted(true);
  };

  return (
    <section style={{ ...tg.section, paddingBottom: 100 }}>
      <p className="tg-heading">Trumpet Studio</p>
      <h1 className="tg-title">Sign Up</h1>

      {submitted ? (
        <div className="tg-confirm" role="status">
          <p style={{ margin: 0 }}>
            Thanks{studentName ? `, ${studentName}` : ""} — your lesson inquiry
            has been received. Massimo will follow up by email within a few
            days to discuss goals, scheduling, and availability.
          </p>
          <button
            type="button"
            className="tg-btn"
            style={{ marginTop: 24 }}
            onClick={() => setSubmitted(false)}
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate={false}>
          <div className="tg-form-grid">
            <div className="tg-field">
              <label htmlFor="studentName">Student Name</label>
              <input
                id="studentName"
                name="studentName"
                type="text"
                required
                autoComplete="name"
              />
            </div>

            <div className="tg-field">
              <label htmlFor="guardianName">
                Parent / Guardian Name{" "}
                <span className="tg-optional">(optional)</span>
              </label>
              <input id="guardianName" name="guardianName" type="text" />
            </div>

            <div className="tg-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>

            <div className="tg-field">
              <label htmlFor="phone">
                Phone <span className="tg-optional">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
              />
            </div>

            <div className="tg-field">
              <label htmlFor="studentAge">Student Age</label>
              <input
                id="studentAge"
                name="studentAge"
                type="number"
                min={5}
                max={99}
                inputMode="numeric"
              />
            </div>

            <div className="tg-field">
              <label htmlFor="experience">Experience Level</label>
              <select id="experience" name="experience" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="tg-field">
              <label htmlFor="format">Lesson Format</label>
              <select id="format" name="format" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {lessonFormats.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            <div className="tg-field">
              <label htmlFor="location">
                Location <span className="tg-optional">(in-person only)</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="City or neighborhood"
                aria-describedby="location-help"
              />
              <span
                id="location-help"
                style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.03em" }}
              >
                Used for travel lesson scheduling.
              </span>
            </div>

            <div className="tg-field tg-form-wide">
              <label htmlFor="goals">Goals</label>
              <textarea
                id="goals"
                name="goals"
                placeholder="e.g. school band, audition prep, beginner fundamentals"
              />
            </div>
          </div>

          <button type="submit" className="tg-btn" style={{ marginTop: 32 }}>
            Submit Inquiry
          </button>
        </form>
      )}
    </section>
  );
};

export default TeachingSignup;
