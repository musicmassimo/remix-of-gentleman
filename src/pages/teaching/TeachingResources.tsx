import { tg } from "./styles";

// Brevo hosted-form endpoint. This posts as a plain HTML form straight to
// Brevo — no script embed, no client-side JS.
const BREVO_ACTION =
  "https://3e1c021a.sibforms.com/serve/MUIFAOHT4Pxvs0t2E3d0szrZaJFFwsUePmwE2t8_J4pxNRkc-DFwRAok_FVd7PHy7v-kcOU2mTHeaJXdUaXTuCLjGivwxTvUSRan80Z8tlbx8xPkw5grWxpn_-A2qhpM0WvJlhtBBklUDrmDrrf8IallXXEqENSTu3xOPCd_lMFRMPbFMLAB9VXH3W0Y4GHPP8JJZ2XYeXpJ6FaY8g==";

const instruments = [
  { value: "1", label: "Trumpet" },
  { value: "2", label: "Saxophone" },
  { value: "3", label: "Guitar" },
  { value: "4", label: "Piano" },
  { value: "5", label: "Bass" },
  { value: "6", label: "Trombone" },
  { value: "7", label: "Voice" },
];

const whatsInside = [
  {
    title: "For Beginners",
    desc: "Foundational tone and rhythm work that builds good habits from day one.",
  },
  {
    title: "For School Band",
    desc: "Range and endurance patterns that translate directly to chair placements.",
  },
  {
    title: "For Jazz Players",
    desc: "Flexibility and articulation drills that carry into phrasing and improvisation.",
  },
  {
    title: "For Advanced Players",
    desc: "A structure disciplined enough to support audition and performance prep.",
  },
];

const TeachingResources = () => (
  <section style={{ ...tg.section, paddingBottom: 100 }}>
    <p className="tg-heading">Trumpet Studio</p>
    <h1 className="tg-title">The Daily Practice Routine & Pattern Library</h1>
    <p style={{ ...tg.body, marginBottom: 20 }}>
      Two free guides — the exact daily structure and the technical patterns
      that fill it — built from training at the New England Conservatory and
      years of touring and teaching. A routine without patterns is just a
      warm-up; patterns without a routine never get practiced. Sign up below
      for both.
    </p>

    <div className="tg-items" style={{ marginBottom: 40 }}>
      {whatsInside.map(({ title, desc }) => (
        <div key={title}>
          <p className="tg-item-title">{title}</p>
          <p style={tg.body}>{desc}</p>
        </div>
      ))}
    </div>

    <form method="POST" action={BREVO_ACTION}>
      <div className="tg-form-grid">
        <div className="tg-field">
          <label htmlFor="FIRSTNAME">First Name</label>
          <input
            id="FIRSTNAME"
            name="FIRSTNAME"
            type="text"
            required
            autoComplete="given-name"
          />
        </div>

        <div className="tg-field">
          <label htmlFor="EMAIL">Email</label>
          <input
            id="EMAIL"
            name="EMAIL"
            type="email"
            required
            autoComplete="email"
          />
        </div>

        <div className="tg-field tg-form-wide">
          <label htmlFor="INSTRUMENT">What instrument do you play?</label>
          <select id="INSTRUMENT" name="INSTRUMENT" defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {instruments.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Brevo plumbing: email_address_check is their spam honeypot and must
          stay present and empty. */}
      <input type="hidden" name="email_address_check" value="" />
      <input type="hidden" name="locale" value="en" />
      <input type="hidden" name="html_type" value="simple" />

      <button type="submit" className="tg-btn" style={{ marginTop: 32 }}>
        Send Me the Guides
      </button>
    </form>
  </section>
);

export default TeachingResources;
