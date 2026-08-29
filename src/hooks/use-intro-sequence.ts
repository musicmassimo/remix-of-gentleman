import { useState, useEffect, useCallback } from "react"

interface UseIntroSequenceOptions {
  /** Images to cycle through during intro */
  introImages: string[]
  /** Starting duration for first image (ms) */
  startDuration?: number
  /** Ending duration for last image (ms) */
  endDuration?: number
  /** Delay before starting intro (ms) */
  initialDelay?: number
}

interface UseIntroSequenceReturn {
  /** Current phase: 'loading' | 'intro' | 'gallery' */
  phase: "loading" | "intro" | "gallery"
  /** Current image index during intro */
  currentImageIndex: number
  /** Current image src during intro */
  currentImageSrc: string | null
  /** Whether intro is complete and gallery should show */
  isIntroComplete: boolean
  /** Skip intro and go directly to gallery */
  skipIntro: () => void
}

export function useIntroSequence({
  introImages,
  startDuration = 800,
  endDuration = 100,
  initialDelay = 300,
}: UseIntroSequenceOptions): UseIntroSequenceReturn {
  const [phase, setPhase] = useState<"loading" | "intro" | "gallery">("loading")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const skipIntro = useCallback(() => {
    setPhase("gallery")
  }, [])

  // Calculate duration for current image (eases from slow to fast)
  const getDuration = useCallback(
    (index: number) => {
      const totalImages = introImages.length
      if (totalImages <= 1) return startDuration

      // Ease out - starts slow, gets faster
      const progress = index / (totalImages - 1)
      const eased = progress * progress // quadratic ease
      return startDuration - (startDuration - endDuration) * eased
    },
    [introImages.length, startDuration, endDuration]
  )

  useEffect(() => {
    if (introImages.length === 0) {
      setPhase("gallery")
      return
    }

    // Start intro after initial delay
    const startTimer = setTimeout(() => {
      setPhase("intro")
    }, initialDelay)

    return () => clearTimeout(startTimer)
  }, [introImages.length, initialDelay])

  useEffect(() => {
    if (phase !== "intro") return

    const totalImages = introImages.length

    // If we've shown all images, transition to gallery
    if (currentImageIndex >= totalImages) {
      setPhase("gallery")
      return
    }

    // Calculate duration for this image
    const duration = getDuration(currentImageIndex)

    // After duration, instantly jump to next image
    const nextImageTimer = setTimeout(() => {
      setCurrentImageIndex((prev) => prev + 1)
    }, duration)

    return () => {
      clearTimeout(nextImageTimer)
    }
  }, [phase, currentImageIndex, introImages.length, getDuration])

  return {
    phase,
    currentImageIndex,
    currentImageSrc:
      phase === "intro" && currentImageIndex < introImages.length
        ? introImages[currentImageIndex]
        : null,
    isIntroComplete: phase === "gallery",
    skipIntro,
  }
}
