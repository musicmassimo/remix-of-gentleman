import type { CSSProperties } from "react";

/** Shared section chrome for the /teaching mini-site, matching the rest of
 *  the site's 800px column and 24px gutters. Colors match the live
 *  OllyOlly-built WordPress site (navy #112c4c / gold #856c1b on white),
 *  pulled from that site's rendered DOM — not this site's black/gold
 *  SYNDICATE house style. */
export const tg = {
  section: { padding: "48px 24px 72px", maxWidth: 800, margin: "0 auto" } as CSSProperties,
  body: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "rgba(23,23,23,0.82)",
    letterSpacing: "0.01em",
  } as CSSProperties,
  note: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "rgba(23,23,23,0.65)",
    letterSpacing: "0.01em",
  } as CSSProperties,
};
