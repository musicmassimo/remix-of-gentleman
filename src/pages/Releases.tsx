import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";

interface Release {
  title: string;
  label: string;
  year: string;
  type: string;
  tracks: string[];
  links: { platform: string; url: string }[];
}

const releases: Release[] = [
  {
    title: "Infinite Drift",
    label: "Afterglow Records",
    year: "2026",
    type: "EP",
    tracks: ["Infinite Drift", "Solar Flare", "Underneath the Surface", "Pulse Width"],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
      { platform: "Soundcloud", url: "#" },
    ],
  },
  {
    title: "The Velvet Hour Sessions Vol. 3",
    label: "Self-released",
    year: "2025",
    type: "Compilation",
    tracks: [
      "Opening Ceremony (Gentleman Edit)",
      "Tidal Lock",
      "Refraction feat. Aura",
      "Night Protocol",
      "Ghost Signal",
      "Zenith",
    ],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Soundcloud", url: "#" },
    ],
  },
  {
    title: "Lucid Architecture",
    label: "Midnight Structures",
    year: "2025",
    type: "Album",
    tracks: [
      "Arrival",
      "Deep Corridor",
      "Luminance",
      "Between Worlds",
      "Strata",
      "Dissolve",
      "Lucid Architecture",
      "Event Horizon",
      "Aftermath",
    ],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
      { platform: "Apple Music", url: "#" },
      { platform: "Soundcloud", url: "#" },
    ],
  },
  {
    title: "Fade to Signal",
    label: "Colorize",
    year: "2024",
    type: "Single",
    tracks: ["Fade to Signal", "Fade to Signal (Extended Mix)"],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
    ],
  },
  {
    title: "Night Garden",
    label: "Balance Music",
    year: "2024",
    type: "EP",
    tracks: ["Night Garden", "Soft Machine", "Murmur"],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
      { platform: "Soundcloud", url: "#" },
    ],
  },
  {
    title: "Weightless",
    label: "Natura Sonoris",
    year: "2023",
    type: "Single",
    tracks: ["Weightless", "Weightless (Ambient Rework)"],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
    ],
  },
];

const typeColors: Record<string, string> = {
  Album: "bg-accent text-accent-foreground",
  EP: "bg-foreground text-background",
  Single: "bg-muted text-muted-foreground",
  Compilation: "bg-[hsl(250,40%,30%)] text-white",
};

const Releases = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2 tracking-tight text-foreground">Releases</h1>
        <p className="text-center text-muted-foreground mb-16">Discography & streaming links</p>

        <div className="space-y-12">
          {releases.map((r, i) => (
            <article key={i} className="border-b border-border pb-10">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">{r.title}</h2>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${typeColors[r.type] || "bg-muted text-muted-foreground"}`}>
                  {r.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {r.label} · {r.year}
              </p>

              <ol className="list-decimal list-inside space-y-1 mb-6 text-foreground/80 text-sm">
                {r.tracks.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ol>

              <div className="flex flex-wrap gap-3">
                {r.links.map((l, j) => (
                  <a
                    key={j}
                    href={l.url}
                    className="inline-flex items-center gap-1.5 text-sm px-4 py-2 border border-border rounded-full hover:bg-foreground hover:text-background transition-all"
                  >
                    {l.platform}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </main>
);

export default Releases;
