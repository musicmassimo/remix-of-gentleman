import * as React from "react"
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

const REVEAL_SPEED_MS = 135

// Fisher-Yates shuffle of [0..length): the order in which letter positions
// light up. Every letter still lands in its correct spot — only the reveal
// order is randomised.
function shuffledIndices(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

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
    const revealOrder = React.useMemo(
      () => shuffledIndices(rightText.length),
      [rightText]
    )

    const [revealedCount, setRevealedCount] = React.useState(0)

    // Keep the completion callback in a ref so the reveal effect doesn't need
    // it as a dependency (avoids restarting the timer on every parent render).
    const onRevealCompleteRef = React.useRef(onRevealComplete)
    React.useEffect(() => {
      onRevealCompleteRef.current = onRevealComplete
    })

    const completedRef = React.useRef(false)
    const fireComplete = React.useCallback(() => {
      if (completedRef.current) return
      completedRef.current = true
      onRevealCompleteRef.current?.()
    }, [])

    React.useEffect(() => {
      if (!visible) {
        completedRef.current = false
        setRevealedCount(0)
        return
      }

      if (skip) {
        setRevealedCount(rightText.length)
        fireComplete()
        return
      }

      const intervalId = window.setInterval(() => {
        setRevealedCount((count) => {
          const next = count + 1
          if (next >= rightText.length) {
            window.clearInterval(intervalId)
            fireComplete()
            return rightText.length
          }
          return next
        })
      }, REVEAL_SPEED_MS)

      return () => window.clearInterval(intervalId)
    }, [visible, skip, rightText, fireComplete])

    const revealed = React.useMemo(() => {
      const set = new Set<number>()
      for (let i = 0; i < revealedCount; i++) set.add(revealOrder[i])
      return set
    }, [revealedCount, revealOrder])

    const isComplete = revealedCount >= rightText.length

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
                style={{
                  whiteSpace: "pre",
                  opacity: revealed.has(i) ? 1 : 0,
                  transition: "opacity 150ms ease-out",
                }}
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
