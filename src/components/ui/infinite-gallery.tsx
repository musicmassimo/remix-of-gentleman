import * as React from "react"
import { cn } from "@/lib/utils"

export interface MediaItem {
  src: string
  width: number
  height: number
  alt?: string
}

interface InfiniteGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MediaItem[]
  enabled?: boolean
}

function calculateWidth(item: MediaItem, viewportHeight: number): number {
  return (viewportHeight * item.width) / item.height
}

const InfiniteGallery = React.forwardRef<HTMLDivElement, InfiniteGalleryProps>(
  ({ className, items, enabled = true, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [viewportHeight, setViewportHeight] = React.useState(
      typeof window !== "undefined" ? window.innerHeight : 800
    )
    const [currentIndex, setCurrentIndex] = React.useState(0)

    // Calculate widths for all items
    const itemWidths = React.useMemo(
      () => items.map((item) => calculateWidth(item, viewportHeight)),
      [items, viewportHeight]
    )

    // Cumulative positions for each item
    const itemPositions = React.useMemo(() => {
      const positions: number[] = [0]
      itemWidths.forEach((width, i) => {
        positions.push(positions[i] + width)
      })
      return positions
    }, [itemWidths])

    // Total width of one set of images
    const setWidth = React.useMemo(
      () => itemWidths.reduce((sum, w) => sum + w, 0),
      [itemWidths]
    )

    // Number of times to repeat for seamless infinite scroll
    const repeatCount = 50

    // Handle resize
    React.useEffect(() => {
      const onResize = () => setViewportHeight(window.innerHeight)
      window.addEventListener("resize", onResize)
      return () => window.removeEventListener("resize", onResize)
    }, [])

    // Initialize scroll position to middle and handle infinite loop + page tracking
    React.useEffect(() => {
      const container = scrollRef.current
      if (!container || !enabled) return

      // Start in the middle to allow scrolling both directions
      const middlePosition = setWidth * Math.floor(repeatCount / 2)
      container.scrollLeft = middlePosition

      const handleScroll = () => {
        const scrollLeft = container.scrollLeft
        const maxScroll = setWidth * (repeatCount - 5)
        const minScroll = setWidth * 5

        // If scrolled too far right, jump back
        if (scrollLeft > maxScroll) {
          container.scrollLeft = scrollLeft - setWidth * 20
        }
        // If scrolled too far left, jump forward
        if (scrollLeft < minScroll) {
          container.scrollLeft = scrollLeft + setWidth * 20
        }

        // Calculate current image index
        const viewportCenter = scrollLeft + window.innerWidth / 2
        const positionInSet = viewportCenter % setWidth

        // Find which image the center is in
        let index = 0
        for (let i = 0; i < itemPositions.length - 1; i++) {
          if (positionInSet >= itemPositions[i] && positionInSet < itemPositions[i + 1]) {
            index = i
            break
          }
        }
        setCurrentIndex(index)
      }

      container.addEventListener("scroll", handleScroll, { passive: true })
      // Initial calculation
      handleScroll()
      return () => container.removeEventListener("scroll", handleScroll)
    }, [setWidth, enabled, repeatCount, itemPositions])

    // Generate repeated items
    const repeatedItems = React.useMemo(() => {
      const result: Array<{ item: MediaItem; width: number; key: string }> = []
      for (let i = 0; i < repeatCount; i++) {
        items.forEach((item, idx) => {
          result.push({
            item,
            width: itemWidths[idx],
            key: `${i}-${idx}`,
          })
        })
      }
      return result
    }, [items, itemWidths, repeatCount])

    const totalWidth = setWidth * repeatCount

    return (
      <div
        ref={ref}
        className={cn("h-dvh overflow-hidden relative", className)}
        {...props}
      >
        <div
          ref={scrollRef}
          className={cn(
            "h-full overflow-x-auto overflow-y-hidden",
            "scrollbar-none [&::-webkit-scrollbar]:hidden",
            "[-ms-overflow-style:none] [scrollbar-width:none]"
          )}
          style={{ contain: "strict" }}
        >
          <div
            className="flex h-full"
            style={{ width: totalWidth }}
          >
            {repeatedItems.map(({ item, width, key }) => (
              <div
                key={key}
                className="relative h-full flex-shrink-0"
                style={{ width }}
              >
                <img
                  src={item.src}
                  alt={item.alt ?? ""}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Page indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {items.map((_, index) => (
            <div
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-300"
              style={{ opacity: index === currentIndex ? 1 : 0.3 }}
            />
          ))}
        </div>
      </div>
    )
  }
)
InfiniteGallery.displayName = "InfiniteGallery"

export { InfiniteGallery }
