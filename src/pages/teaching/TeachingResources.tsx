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

const TeachingResources = () => (
  <section style={{ ...tg.section, paddingBottom: 100 }}>
    <p className="tg-heading">Trumpet Studio</p>
    <h1 className="tg-title">Resources</h1>
    <p style={{ ...tg.body, marginBottom: 40 }}>
      Sign up below for access to practice guides, recommended gear lists, and
      other resources for trumpet students.
    </p>

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
        Access Resources
      </button>
    </form>
  </section>
);

export default TeachingResources;
