import * as React from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

interface CenterTextProps extends React.HTMLAttributes<HTMLDivElement> {
  leftText?: string
  rightText: string
  /** Start revealing `rightText` once this becomes true. */
  visible?: boolean
  /** Immediately reveal every remaining letter (used to skip the intro). */
  skip?: boolean
  /** Fires exactly once, when every letter of `rightText` has been revealed. */
  onRevealComplete?: () => void
}

// Roughly matches the previous ~135ms-per-letter cadence: each letter fades in
// over LETTER_FADE_S, and the reveals are spaced LETTER_STAGGER_S apart.
const LETTER_STAGGER_S = 0.135
const LETTER_FADE_S = 0.2

// Hover glitch: scramble every character for a beat, then settle back into the
// readable name left-to-right. Kept short and faint — a hover detail, not an
// effect. Characters scramble freely until GLITCH_SETTLE_START of the run, then
// lock in one by one over the remainder.
const GLITCH_DURATION_S = 0.38
const SCRAMBLE_INTERVAL_MS = 45
const GLITCH_SETTLE_START = 0.35
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+-<>/=?".split("")

const CenterText = React.forwardRef<HTMLDivElement, CenterTextProps>(
  (
    {
      className,
      leftText,
      rightText,
      visible = false,
      skip = false,
      onRevealComplete,
      ...props
    },
    ref
  ) => {
    const letterRefs = React.useRef<Array<HTMLSpanElement | null>>([])
    const tweenRef = React.useRef<gsap.core.Tween | null>(null)
    const [isComplete, setIsComplete] = React.useState(false)

    // Hover-glitch state (all refs — none of it should trigger re-renders).
    const redGhostRef = React.useRef<HTMLSpanElement | null>(null)
    const cyanGhostRef = React.useRef<HTMLSpanElement | null>(null)
    const glitchTweenRef = React.useRef<gsap.core.Tween | null>(null)
    const ghostFadeRef = React.useRef<gsap.core.Tween | null>(null)
    const glitchProxyRef = React.useRef({ p: 0 })
    const lastSwapRef = React.useRef(0)

    // Keep the completion callback in a ref so the reveal effect doesn't need
    // it as a dependency (avoids restarting the animation on parent re-render).
    const onRevealCompleteRef = React.useRef(onRevealComplete)
    React.useEffect(() => {
      onRevealCompleteRef.current = onRevealComplete
    })

    const completedRef = React.useRef(false)
    const fireComplete = React.useCallback(() => {
      setIsComplete(true)
      if (completedRef.current) return
      completedRef.current = true
      onRevealCompleteRef.current?.()
    }, [])

    // --- Hover glitch ----------------------------------------------------------

    const setGhostText = React.useCallback((text: string) => {
      if (redGhostRef.current) redGhostRef.current.textContent = text
      if (cyanGhostRef.current) cyanGhostRef.current.textContent = text
    }, [])

    const ghostEls = React.useCallback(
      () =>
        [redGhostRef.current, cyanGhostRef.current].filter(
          (el): el is HTMLSpanElement => el != null
        ),
      []
    )

    const restoreLetters = React.useCallback(() => {
      for (let i = 0; i < rightText.length; i++) {
        const el = letterRefs.current[i]
        if (el) el.textContent = rightText[i]
      }
    }, [rightText])

    // Stop any in-flight glitch and put the readable text back. `settle` eases
    // the colour-split out over a beat; otherwise it's cleared instantly.
    const stopGlitch = React.useCallback(
      (settle: boolean) => {
        glitchTweenRef.current?.kill()
        glitchTweenRef.current = null
        ghostFadeRef.current?.kill()
        ghostFadeRef.current = null
        restoreLetters()
        setGhostText("")
        const ghosts = ghostEls()
        if (!ghosts.length) return
        if (settle) {
          ghostFadeRef.current = gsap.to(ghosts, {
            opacity: 0,
            x: 0,
            y: 0,
            duration: 0.16,
            ease: "power1.out",
          })
        } else {
          gsap.set(ghosts, { opacity: 0, x: 0, y: 0 })
        }
      },
      [ghostEls, restoreLetters, setGhostText]
    )

    const startGlitch = React.useCallback(() => {
      // Only once the name has finished typing, and never under reduced motion.
      if (!completedRef.current) return
      const n = rightText.length
      if (!n) return
      if (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return
      }

      glitchTweenRef.current?.kill()
      ghostFadeRef.current?.kill()
      ghostFadeRef.current = null

      const proxy = glitchProxyRef.current
      proxy.p = 0
      lastSwapRef.current = Number.NEGATIVE_INFINITY

      setGhostText(rightText)
      if (redGhostRef.current)
        gsap.set(redGhostRef.current, { x: -2, y: -1, opacity: 0.35 })
      if (cyanGhostRef.current)
        gsap.set(cyanGhostRef.current, { x: 2, y: 1, opacity: 0.35 })

      glitchTweenRef.current = gsap.to(proxy, {
        p: 1,
        duration: GLITCH_DURATION_S,
        ease: "none",
        onUpdate: () => {
          const p = proxy.p
          const elapsedMs = p * GLITCH_DURATION_S * 1000
          const swap = elapsedMs - lastSwapRef.current >= SCRAMBLE_INTERVAL_MS
          if (swap) lastSwapRef.current = elapsedMs

          let display = ""
          for (let i = 0; i < n; i++) {
            const orig = rightText[i]
            const el = letterRefs.current[i]
            if (orig === " ") {
              if (el) el.textContent = " "
              display += " "
              continue
            }
            // Each character locks in at its own point between
            // GLITCH_SETTLE_START and the end, ordered left-to-right.
            const settleAt =
              GLITCH_SETTLE_START +
              (1 - GLITCH_SETTLE_START) * (n === 1 ? 1 : i / (n - 1))
            if (p >= settleAt) {
              if (el) el.textContent = orig
              display += orig
            } else if (swap) {
              const c =
                SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0]
              if (el) el.textContent = c
              display += c
            } else {
              display += el?.textContent ?? orig
            }
          }
          setGhostText(display)
        },
        onComplete: () => stopGlitch(true),
      })
    }, [rightText, setGhostText, stopGlitch])

    const handleGlitchLeave = React.useCallback(
      () => stopGlitch(true),
      [stopGlitch]
    )

    React.useEffect(() => {
      const letters = letterRefs.current.filter(
        (el): el is HTMLSpanElement => el != null
      )

      // Tear down any animation from a previous run before starting a new one.
      tweenRef.current?.kill()
      tweenRef.current = null

      if (!visible) {
        completedRef.current = false
        setIsComplete(false)
        stopGlitch(false)
        if (letters.length) gsap.set(letters, { opacity: 0 })
        return
      }

      if (!letters.length) return

      if (skip) {
        gsap.set(letters, { opacity: 1 })
        fireComplete()
        return
      }

      gsap.set(letters, { opacity: 0 })
      // GSAP stagger with `from: "random"` reveals the letters in a random
      // order while each still animates in its own fixed position.
      tweenRef.current = gsap.to(letters, {
        opacity: 1,
        duration: LETTER_FADE_S,
        ease: "power1.out",
        stagger: { each: LETTER_STAGGER_S, from: "random" },
        onComplete: fireComplete,
      })

      return () => {
        tweenRef.current?.kill()
        tweenRef.current = null
      }
    }, [visible, skip, rightText, fireComplete, stopGlitch])

    // Safety net: kill anything still running if we unmount mid-animation
    // (e.g. navigating away from the homepage).
    React.useEffect(
      () => () => {
        tweenRef.current?.kill()
        glitchTweenRef.current?.kill()
        ghostFadeRef.current?.kill()
        gsap.killTweensOf(
          [
            ...letterRefs.current,
            redGhostRef.current,
            cyanGhostRef.current,
          ].filter((el): el is HTMLSpanElement => el != null)
        )
      },
      []
    )

    return (
      <div
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "z-30 w-full max-w-[300px] md:max-w-[400px]",
          "pointer-events-none",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex text-xl md:text-2xl font-medium",
            leftText ? "justify-between" : "justify-center"
          )}
        >
          {leftText && (
            <span
              className={cn(
                "whitespace-nowrap transition-opacity duration-700 ease-out",
                visible ? "opacity-100" : "opacity-0"
              )}
            >
              {leftText}
            </span>
          )}
          <span
            className={cn(
              "relative isolate whitespace-nowrap transition-opacity duration-700 ease-out delay-100",
              "pointer-events-auto [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]",
              visible ? "opacity-100" : "opacity-0"
            )}
            aria-label={rightText}
            onMouseEnter={startGlitch}
            onMouseLeave={handleGlitchLeave}
          >
            {/* Faint red/cyan colour-split, layered behind the readable text
                and only visible for the duration of the hover glitch. */}
            <span
              aria-hidden="true"
              ref={redGhostRef}
              className="pointer-events-none absolute inset-0 select-none"
              style={{
                whiteSpace: "pre",
                opacity: 0,
                color: "#ff3b3b",
                textShadow: "none",
                zIndex: -1,
                willChange: "transform, opacity",
              }}
            />
            <span
              aria-hidden="true"
              ref={cyanGhostRef}
              className="pointer-events-none absolute inset-0 select-none"
              style={{
                whiteSpace: "pre",
                opacity: 0,
                color: "#3bf0f0",
                textShadow: "none",
                zIndex: -1,
                willChange: "transform, opacity",
              }}
            />
            {rightText.split("").map((char, i) => (
              <span
                key={i}
                aria-hidden="true"
                ref={(el) => {
                  letterRefs.current[i] = el
                }}
                style={{ whiteSpace: "pre", opacity: 0 }}
              >
                {char}
              </span>
            ))}
            <span
              aria-hidden="true"
              className={cn(
                "inline-block animate-pulse",
                isComplete && "opacity-40"
              )}
            >
              |
            </span>
          </span>
        </div>
      </div>
    )
  }
)
CenterText.displayName = "CenterText"

export { CenterText }
