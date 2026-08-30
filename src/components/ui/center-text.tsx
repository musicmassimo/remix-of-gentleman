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
    }, [visible, skip, rightText, fireComplete])

    // Safety net: kill anything still running if we unmount mid-animation
    // (e.g. navigating away from the homepage).
    React.useEffect(
      () => () => {
        tweenRef.current?.kill()
        gsap.killTweensOf(
          letterRefs.current.filter((el): el is HTMLSpanElement => el != null)
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
              "whitespace-nowrap transition-opacity duration-700 ease-out delay-100",
              "[text-shadow:0_1px_4px_rgba(0,0,0,0.35)]",
              visible ? "opacity-100" : "opacity-0"
            )}
            aria-label={rightText}
          >
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
