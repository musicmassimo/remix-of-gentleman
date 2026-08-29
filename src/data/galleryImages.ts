import type { MediaItem } from "@/components/ui/infinite-gallery"

// Photos by @chriscreations__ on Unsplash
// Aspect ratios estimated as portrait (3:4)
export const galleryImages: MediaItem[] = [
  {
    // Key photo - man in suit with hands on face (first in gallery, last in intro)
    src: "https://images.unsplash.com/photo-1766939228519-5f498be33e65?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Man in suit with hands on face",
  },
  {
    src: "https://images.unsplash.com/photo-1766939229108-eeeebe838be1?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Young man in suit sitting against red background",
  },
  {
    src: "https://images.unsplash.com/photo-1766939228707-d9b36da3ab06?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Young man in suit with arms crossed looking forward",
  },
  {
    src: "https://images.unsplash.com/photo-1766939228800-930ab56f16f9?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Man in suit with patterned tie and rings",
  },
  {
    src: "https://images.unsplash.com/photo-1766939228418-1100778fb1fe?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Young man in suit with braided hair",
  },
  {
    src: "https://images.unsplash.com/photo-1766939228746-c0acc10344e4?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Man in a suit sits against a red background",
  },
  {
    src: "https://images.unsplash.com/photo-1766939228501-065717002601?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Man with braided hair wearing a suit",
  },
  {
    src: "https://images.unsplash.com/photo-1766939228554-77d3c914639a?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Man with braided hair in a suit posing",
  },
  {
    src: "https://images.unsplash.com/photo-1766939228598-e8d73e87ec01?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Man in suit with braids and rings reaching forward",
  },
  {
    src: "https://images.unsplash.com/photo-1766939228669-999a8509630b?w=1600&q=80",
    width: 3,
    height: 4,
    alt: "Young man in suit covers eyes with hands",
  },
]

// Images used during the intro sequence (cycling animation)
// Final image matches first gallery image for seamless transition
export const introImages: string[] = [
  "https://images.unsplash.com/photo-1766939228707-d9b36da3ab06?w=1600&q=80",
  "https://images.unsplash.com/photo-1766939228418-1100778fb1fe?w=1600&q=80",
  "https://images.unsplash.com/photo-1766939228501-065717002601?w=1600&q=80",
  "https://images.unsplash.com/photo-1766939228598-e8d73e87ec01?w=1600&q=80",
  "https://images.unsplash.com/photo-1766939229108-eeeebe838be1?w=1600&q=80",
  "https://images.unsplash.com/photo-1766939228746-c0acc10344e4?w=1600&q=80",
  "https://images.unsplash.com/photo-1766939228669-999a8509630b?w=1600&q=80",
  // Key photo - final intro image, first in gallery
  "https://images.unsplash.com/photo-1766939228519-5f498be33e65?w=1600&q=80",
]
