import type { MediaItem } from "@/components/ui/infinite-gallery"

// Photos of Massimo Paparello
export const galleryImages: MediaItem[] = [
  {
    src: "/images/massimo-01.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: "/images/massimo-02.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: "/images/massimo-03.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: "/images/massimo-04.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: "/images/massimo-05.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: "/images/massimo-06.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: "/images/massimo-07.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: "/images/massimo-09.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: "/images/massimo-10.jpg",
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
    objectPosition: "20% center",
  },
]

// Images used during the intro sequence (cycling animation)
// Final image matches first gallery image for seamless transition
export const introImages: string[] = [
  "/images/massimo-05.jpg",
  "/images/massimo-09.jpg",
  "/images/massimo-03.jpg",
  // Key photo - final intro image, first in gallery
  "/images/massimo-01.jpg",
]
