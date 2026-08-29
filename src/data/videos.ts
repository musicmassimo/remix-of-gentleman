export interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  duration: string;
  thumbnail: string;
  category: "live" | "studio" | "documentary" | "aftermovie";
}

export const videos: Video[] = [
  {
    id: "chromascape-metro-city-2026",
    title: "Luna Waves — Chromascape Live at Metro City",
    description: "A full 2-hour recording from the sold-out Chromascape night at The Spectrum, Metro City. Deep progressive textures layered over pulsing basslines as Luna takes the crowd on a hypnotic journey through the night. Features exclusive unreleased tracks from the upcoming 'Infinite Drift' EP.",
    date: "January 2026",
    location: "The Spectrum, Metro City",
    duration: "2:14:30",
    thumbnail: "",
    category: "live",
  },
  {
    id: "yearmix-2025",
    title: "Luna Waves — YEARMIX 2025",
    description: "The definitive collection of Luna's favourite tracks from 2025, blended into a seamless 90-minute mix. From the melancholic opening chords to the euphoric closing moments, this mix captures the evolution of Luna's sound over the past year.",
    date: "December 2025",
    location: "Studio Session",
    duration: "1:32:15",
    thumbnail: "",
    category: "studio",
  },
  {
    id: "frequency-ade-2024",
    title: "Luna Waves — Live at Frequency ADE",
    description: "Amsterdam Dance Event 2024. Luna's closing set at the legendary Frequency showcase, broadcast live to over 50,000 viewers. The intimate warehouse setting and world-class sound system made this one of the most talked-about sets of the entire ADE week.",
    date: "October 2024",
    location: "Warehouse, Amsterdam (NL)",
    duration: "1:45:00",
    thumbnail: "",
    category: "live",
  },
  {
    id: "midnight-club-berlin",
    title: "Luna Waves — Live at Midnight Club Berlin",
    description: "A raw, unfiltered recording from Berlin's iconic Midnight Club. Six hours of pure, uncompromising progressive techno captured in the club's legendary Vault room. This set pushed boundaries and showcased Luna's ability to read a crowd and build tension over extended periods.",
    date: "March 2024",
    location: "Midnight Club, Berlin (DE)",
    duration: "1:58:42",
    thumbnail: "",
    category: "live",
  },
  {
    id: "making-of-lucid-architecture",
    title: "The Making of Lucid Architecture",
    description: "Go behind the scenes of Luna's debut album 'Lucid Architecture'. This mini-documentary follows the creative process from initial sketches in her Metro City studio to the final mastering sessions. Features interviews with collaborators and a glimpse into the sound design techniques that define her unique aesthetic.",
    date: "September 2025",
    location: "Various Studios",
    duration: "24:18",
    thumbnail: "",
    category: "documentary",
  },
  {
    id: "chromascape-beach-2025",
    title: "Chromascape Beach 2025 — Aftermovie",
    description: "Relive the magic of Chromascape Beach, Luna's signature all-day outdoor event at Sunset Charlie. From sunrise ambient sets to the peak-time headliner slot, this aftermovie captures the energy of 3,000 people dancing under open skies.",
    date: "July 2025",
    location: "Sunset Charlie, Beachfront",
    duration: "8:45",
    thumbnail: "",
    category: "aftermovie",
  },
  {
    id: "harmony-festival-2025",
    title: "Luna Waves — Harmony Festival Highlights",
    description: "Highlights from Luna's sunset slot at Harmony Festival on the Croatian coast. Breathtaking scenery meets immersive sound in this beautifully shot recap of one of the summer's most memorable performances.",
    date: "August 2025",
    location: "The Garden Resort, Coastal Region (HRV)",
    duration: "12:30",
    thumbnail: "",
    category: "aftermovie",
  },
  {
    id: "studio-session-ep-preview",
    title: "Studio Session — Infinite Drift EP Preview",
    description: "An exclusive studio walkthrough where Luna previews tracks from the upcoming 'Infinite Drift' EP. Watch her break down the production of 'Solar Flare' and explain the creative vision behind each track on the release.",
    date: "November 2025",
    location: "Luna Waves Studio, Metro City",
    duration: "18:22",
    thumbnail: "",
    category: "studio",
  },
];
