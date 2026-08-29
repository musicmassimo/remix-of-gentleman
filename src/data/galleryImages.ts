import type { MediaItem } from "@/components/ui/infinite-gallery"

import heroAsset from "@/assets/massimo-hero.jpg.asset.json"
import portraitAsset from "@/assets/massimo-portrait.jpg.asset.json"

const HERO = heroAsset.url
const PORTRAIT = portraitAsset.url

// Photos of Massimo Paparello
export const galleryImages: MediaItem[] = [
  {
    src: HERO,
    width: 4,
    height: 3,
    alt: "Massimo Paparello holding a trumpet and a flugelhorn against a brick wall",
  },
  {
    src: PORTRAIT,
    width: 3,
    height: 4,
    alt: "Massimo Paparello walking with his trumpet at his side",
  },
  {
    src: HERO,
    width: 4,
    height: 3,
    alt: "Massimo Paparello with two horns in front of a red brick wall",
  },
  {
    src: PORTRAIT,
    width: 3,
    height: 4,
    alt: "Detail of Massimo Paparello carrying his brass trumpet",
  },
  {
    src: HERO,
    width: 4,
    height: 3,
    alt: "Massimo Paparello portrait with trumpet and flugelhorn",
  },
  {
    src: PORTRAIT,
    width: 3,
    height: 4,
    alt: "Massimo Paparello in profile with trumpet in hand",
  },
]

// Images used during the intro sequence (cycling animation)
// Final image matches first gallery image for seamless transition
export const introImages: string[] = [
  PORTRAIT,
  HERO,
  PORTRAIT,
  // Key photo - final intro image, first in gallery
  HERO,
]
