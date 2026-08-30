import * as React from "react"
import gsap from "gsap"
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
const FADE_IN_S = 2
const CROSSFADE_S = 2

const PhotoCarousel = React.forwardRef<HTMLDivElement, PhotoCarouselProps>(
  (
    { className, items, active = false, intervalMs = DEFAULT_INTERVAL_MS, ...props },
    forwardedRef
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const imgRefs = React.useRef<Array<HTMLImageElement | null>>([])
    const indexRef = React.useRef(0)
    const [index, setIndex] = React.useState(0)

    const setContainer = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof forwardedRef === "function") forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
      },
      [forwardedRef]
    )

    // Fade the whole carousel (i.e. the first photo) up from black once active.
    // Scoped in a gsap.context so cleanup is a single call; `kill()` rather
    // than `revert()` because reverting would snap the opacity back and undo
    // the fade we just ran.
    React.useEffect(() => {
      const el = containerRef.current
      if (!el) return
      const ctx = gsap.context(() => {
        gsap.to(el, {
          autoAlpha: active ? 1 : 0,
          duration: FADE_IN_S,
          ease: "power2.out",
          overwrite: "auto",
        })
      }, el)
      return () => ctx.kill()
    }, [active])

    // Auto-advance: GSAP crossfade between the outgoing and incoming image.
    React.useEffect(() => {
      if (!active || items.length <= 1) return

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) return

      // Crossfade tweens are created inside the interval callback, so they are
      // registered on this context and torn down together when the effect
      // re-runs (active/interval change) instead of outliving it.
      const ctx = gsap.context(() => {})

      const id = window.setInterval(() => {
        const from = indexRef.current
        const to = (from + 1) % items.length
        indexRef.current = to
        setIndex(to)

        const fromEl = imgRefs.current[from]
        const toEl = imgRefs.current[to]
        ctx.add(() => {
          if (fromEl) {
            gsap.to(fromEl, {
              opacity: 0,
              duration: CROSSFADE_S,
              ease: "sine.inOut",
              overwrite: "auto",
            })
          }
          if (toEl) {
            gsap.to(toEl, {
              opacity: 1,
              duration: CROSSFADE_S,
              ease: "sine.inOut",
              overwrite: "auto",
            })
          }
        })
      }, intervalMs)

      return () => {
        window.clearInterval(id)
        ctx.kill()
      }
    }, [active, items.length, intervalMs])

    // Final safety net: nothing should still be animating these nodes after
    // unmount, even if a tween was created outside the contexts above.
    React.useEffect(
      () => () => {
        gsap.killTweensOf(
          imgRefs.current.filter((el): el is HTMLImageElement => el != null)
        )
        if (containerRef.current) gsap.killTweensOf(containerRef.current)
      },
      []
    )

    return (
      <div
        ref={setContainer}
        className={cn("absolute inset-0 h-full w-full", className)}
        style={{ opacity: 0, visibility: "hidden" }}
        {...props}
      >
        {items.map((item, i) => (
          <img
            key={item.src}
            ref={(el) => {
              imgRefs.current[i] = el
            }}
            src={item.src}
            alt={item.alt ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: item.objectPosition ?? "center",
              opacity: i === 0 ? 1 : 0,
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
