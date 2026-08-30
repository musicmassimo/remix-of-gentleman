import type { CSSProperties } from "react";

/** Shared section chrome for the /teaching mini-site, matching the rest of
 *  the site's 800px column and 24px gutters. */
export const tg = {
  section: { padding: "0 24px 72px", maxWidth: 800, margin: "0 auto" } as CSSProperties,
  body: {
    fontSize: 13,
    lineHeight: 1.9,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: "0.03em",
  } as CSSProperties,
  note: {
    fontSize: 12,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.03em",
  } as CSSProperties,
};
