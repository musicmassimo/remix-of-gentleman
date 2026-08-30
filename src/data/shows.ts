// Single source of truth for every Massimo Paparello show listing.
//
// `type` separates shows played with the jazz quintet SYNDICATE
// (`"syndicate"`) from everything else Massimo plays (`"personal"`).
// The Live page renders every show regardless of type; the SYNDICATE
// page (built separately) filters to `type: "syndicate"`.
//
// `status` is `"upcoming"` or `"past"`. The placeholder personal shows
// below are all tagged `"upcoming"` since they mirror the forward-looking
// tour list that was previously hardcoded on the Live page.

export type ShowStatus = "upcoming" | "past";
export type ShowType = "personal" | "syndicate";

export interface Show {
  date: string;
  venue: string;
  city: string;
  status: ShowStatus;
  type: ShowType;
  /** Optional ticketing URL — the Live page shows a "GET TICKETS" CTA when set. */
  ticketLink?: string;
  /** Optional image shown as a background when the row is hovered. */
  image?: string;
}

const IMG_A = "/__l5e/assets-v1/1b0c6778-16fc-4453-814a-397430f06cb1/Massimo_06_11_26_481.jpg";
const IMG_B = "/__l5e/assets-v1/5b2a3229-abfa-4d66-a03e-f895d9da7f9d/Massimo_06_11_26_126.jpg";
const IMG_C = "/__l5e/assets-v1/e2bfeba6-227f-4e64-8a3d-dc3689affb7c/Massimo_06_11_26_382.jpg";

export const shows: Show[] = [
  // — Personal: everything Massimo plays outside of SYNDICATE —
  { date: "JAN 30", venue: "The Spectrum · Afterglow", city: "Metro City", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_A },
  { date: "FEB 14", venue: "The Underground", city: "Harbor District", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_B },
  { date: "FEB 28", venue: "Seven Frequencies · Westside", city: "Metro City", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_C },
  { date: "MARCH 13", venue: "The Crossing", city: "Metro City", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_A },
  { date: "MARCH 16 – APR 02", venue: "Time Off", city: "", status: "upcoming", type: "personal" },
  { date: "APR 04", venue: "Echo Chamber", city: "Northshore", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_B },
  { date: "APR 10", venue: "Nebula Sound · Industrial Quarter", city: "Basel (CH)", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_C },
  { date: "APR 26", venue: "Spring Night w/ Guest Artist All Nighter · The Jewel Box", city: "Metro City", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_A },
  { date: "MAY 17", venue: "Garden Sessions", city: "Abbey Gardens (BE)", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_B },
  { date: "MAY 23", venue: "Urban Pulse Festival · West Gardens", city: "Metro City", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_C },
  { date: "JUN 06", venue: "Open Mind Festival", city: "Riverside City", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_A },
  { date: "JUN 25", venue: "Sky Festival", city: "Airfield District (DE)", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_B },
  { date: "JUN 27", venue: "Beachside Events w/ Guest Artist · Beach Club 69", city: "Coastal Town", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_C },
  { date: "JUL 25", venue: "THE VELVET HOUR — All Day Long · Sunset Charlie", city: "Beachfront", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_A },
  { date: "AUG 07", venue: "Harmony Festival · The Garden Resort", city: "Coastal Region (HRV)", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_B },
  { date: "AUG 08", venue: "Frequency Festival", city: "Metro City", status: "upcoming", type: "personal", ticketLink: "#", image: IMG_C },

  // — SYNDICATE: Massimo's jazz quintet (placeholder listings) —
  { date: "FEB 09", venue: "SYNDICATE · The Blue Room", city: "Metro City", status: "past", type: "syndicate", image: IMG_B },
  { date: "SEP 20", venue: "SYNDICATE · Nighthawk Jazz Club", city: "Riverside City", status: "upcoming", type: "syndicate", ticketLink: "#", image: IMG_A },
];
