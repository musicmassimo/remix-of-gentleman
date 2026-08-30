import { tg } from "./styles";

const socials = [
  {
    label: "Email",
    value: "massimo@massimopaparello.com",
    href: "mailto:massimo@massimopaparello.com",
  },
  {
    label: "Instagram",
    value: "@massimotrumpetstudio",
    href: "https://instagram.com/massimotrumpetstudio",
  },
  {
    label: "YouTube",
    value: "Massimo Trumpet Studio",
    href: "https://www.youtube.com/channel/UCExmNqfwVrOhwgYC63UrKC",
  },
  {
    label: "TikTok",
    value: "@massimo.paparello",
    href: "https://tiktok.com/@massimo.paparello",
  },
  // No public URL supplied for the Facebook page, so this stays plain text.
  { label: "Facebook", value: "Massimo Trumpet Studio" },
];

const serviceAreas = [
  {
    region: "South Bay",
    cities: [
      "El Segundo",
      "Manhattan Beach",
      "Torrance",
      "Hawthorne",
      "Redondo Beach",
      "Hermosa Beach",
    ],
  },
  {
    region: "Westside LA",
    cities: [
      "Westchester",
      "Marina Del Rey",
      "Playa del Rey",
      "Culver City",
      "Venice",
      "Santa Monica",
      "Beverly Hills",
    ],
  },
];

const isExternal = (href: string) => href.startsWith("http");

const TeachingContact = () => (
  <>
    <section style={tg.section}>
      <p className="tg-heading">Trumpet Studio</p>
      <h1 className="tg-title">Contact</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {socials.map(({ label, value, href }) => (
          <div key={label} className="tg-row">
            <span>{label}</span>
            {href ? (
              <a
                className="tg-link"
                href={href}
                {...(isExternal(href)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {value}
              </a>
            ) : (
              <span style={{ color: "rgba(255,255,255,0.9)" }}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </section>

    <hr className="tg-rule" />

    <section style={tg.section}>
      <p className="tg-heading">Lesson Formats</p>
      <p style={tg.note}>Lessons are available in-person or via Zoom.</p>
    </section>

    <hr className="tg-rule" />

    <section style={tg.section}>
      <p className="tg-heading">Service Areas</p>
      <p style={{ ...tg.note, marginBottom: 28 }}>In-person lessons only.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {serviceAreas.map(({ region, cities }) => (
          <div key={region}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#e8c87a",
                marginBottom: 12,
              }}
            >
              {region}
            </p>
            <ul className="tg-list">
              {cities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ ...tg.note, marginTop: 28 }}>
        Travel radius may vary depending on scheduling and demand.
      </p>
    </section>

    <hr className="tg-rule" />

    <section style={tg.section}>
      <p className="tg-heading">Scheduling</p>
      <p style={tg.note}>
        Lessons scheduled weekly or biweekly. Flexible daytime and select
        evening availability.
      </p>
    </section>

    <hr className="tg-rule" />

    <section style={{ ...tg.section, paddingBottom: 100 }}>
      <p className="tg-heading">Cancellation Policy</p>
      <p style={tg.note}>
        24-hour notice required for cancellation or reschedule. Late
        cancellations and no-shows may be charged in full.
      </p>
    </section>
  </>
);

export default TeachingContact;
