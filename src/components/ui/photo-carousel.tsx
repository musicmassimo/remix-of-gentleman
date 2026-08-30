import * as React from "react"
import { cn } from "@/lib/utils"
import type { MediaItem } from "@/data/galleryImages"

interface PhotoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MediaItem[]
  /** When true the carousel fades in and begins auto-advancing. */
  active?: boolean
  /** How long each photo is held before crossfading to the next (ms). */
  intervalMs?: number
}

const DEFAULT_INTERVAL_MS = 5500
const CROSSFADE_MS = 2000

const PhotoCarousel = React.forwardRef<HTMLDivElement, PhotoCarouselProps>(
  (
    { className, items, active = false, intervalMs = DEFAULT_INTERVAL_MS, ...props },
    ref
  ) => {
    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
      if (!active || items.length <= 1) return

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) return

      const id = window.setInterval(() => {
        setIndex((i) => (i + 1) % items.length)
      }, intervalMs)
      return () => window.clearInterval(id)
    }, [active, items.length, intervalMs])

    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity ease-out",
          active ? "opacity-100" : "opacity-0",
          className
        )}
        style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
        {...props}
      >
        {items.map((item, i) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt ?? ""}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
            style={{
              objectPosition: item.objectPosition ?? "center",
              opacity: i === index ? 1 : 0,
              transitionDuration: `${CROSSFADE_MS}ms`,
            }}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        ))}

        {/* Page indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {items.map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-300"
              style={{ opacity: i === index ? 1 : 0.3 }}
            />
          ))}
        </div>
      </div>
    )
  }
)
PhotoCarousel.displayName = "PhotoCarousel"

export { PhotoCarousel }
