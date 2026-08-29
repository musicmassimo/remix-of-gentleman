import * as React from "react"
import { cn } from "@/lib/utils"

interface CenterTextProps extends React.HTMLAttributes<HTMLDivElement> {
  leftText?: string
  rightText: string
  visible?: boolean
}

const TYPING_SPEED_MS = 70

const CenterText = React.forwardRef<HTMLDivElement, CenterTextProps>(
  ({ className, leftText, rightText, visible = false, ...props }, ref) => {
    const [typedText, setTypedText] = React.useState("")
    const [isTypingComplete, setIsTypingComplete] = React.useState(false)

    // Type `rightText` out character by character once it becomes visible
    // (i.e. once the intro sequence finishes), rather than fading in at once.
    React.useEffect(() => {
      if (!visible) {
        setTypedText("")
        setIsTypingComplete(false)
        return
      }

      let count = 0
      setTypedText("")
      setIsTypingComplete(false)

      const intervalId = window.setInterval(() => {
        count += 1
        setTypedText(rightText.slice(0, count))
        if (count >= rightText.length) {
          window.clearInterval(intervalId)
          setIsTypingComplete(true)
        }
      }, TYPING_SPEED_MS)

      return () => window.clearInterval(intervalId)
    }, [visible, rightText])

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
              visible ? "opacity-100" : "opacity-0"
            )}
            aria-label={rightText}
          >
            {typedText}
            <span
              aria-hidden="true"
              className={cn(
                "inline-block animate-pulse",
                isTypingComplete && "opacity-40"
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
