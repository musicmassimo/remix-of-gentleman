import * as React from "react"
import { cn } from "@/lib/utils"

interface CenterTextProps extends React.HTMLAttributes<HTMLDivElement> {
  leftText: string
  rightText: string
  visible?: boolean
}

const CenterText = React.forwardRef<HTMLDivElement, CenterTextProps>(
  ({ className, leftText, rightText, visible = false, ...props }, ref) => (
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
      <div className="flex justify-between text-xl md:text-2xl font-medium">
        <span
          className={cn(
            "whitespace-nowrap transition-opacity duration-700 ease-out",
            visible ? "opacity-100" : "opacity-0"
          )}
        >
          {leftText}
        </span>
        <span
          className={cn(
            "whitespace-nowrap transition-opacity duration-700 ease-out delay-100",
            visible ? "opacity-100" : "opacity-0"
          )}
        >
          {rightText}
        </span>
      </div>
    </div>
  )
)
CenterText.displayName = "CenterText"

export { CenterText }
