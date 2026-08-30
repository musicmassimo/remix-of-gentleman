import { useCallback, useEffect, useState } from "react"
import { CenterText } from "@/components/ui/center-text"
import { PhotoCarousel } from "@/components/ui/photo-carousel"
import { galleryImages } from "@/data/galleryImages"
import TopNav from "@/components/TopNav"

type Phase = "loading" | "typing" | "gallery"

const Index = () => {
  const [phase, setPhase] = useState<Phase>("loading")
  const [skipTyping, setSkipTyping] = useState(false)

  // Hold on pure black for a beat, then start typing the name.
  useEffect(() => {
    const t = window.setTimeout(() => setPhase("typing"), 150)
    return () => window.clearTimeout(t)
  }, [])

  // Once every letter of the name has appeared, fade the first photo in.
  const handleNameComplete = useCallback(() => {
    setPhase("gallery")
  }, [])

  const handleClick = () => {
    if (phase === "typing") setSkipTyping(true)
  }

  return (
    <div
      className="relative h-dvh w-full overflow-hidden bg-black text-white"
      onClick={handleClick}
    >
      {/* Top nav appears with the gallery */}
      {phase === "gallery" && <TopNav />}

      {/* Full-screen photo carousel — fades in after the name is complete */}
      <PhotoCarousel items={galleryImages} active={phase === "gallery"} />

      {/* Name: typed on black, then held over the carousel */}
      <CenterText
        rightText="MASSIMO PAPARELLO"
        visible={phase === "typing" || phase === "gallery"}
        skip={skipTyping}
        onRevealComplete={handleNameComplete}
      />

      {/* Skip hint while the name is still typing */}
      {phase === "typing" && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
          <p className="animate-pulse text-xs uppercase tracking-widest text-white/40">
            Click to skip
          </p>
        </div>
      )}
    </div>
  )
}

export default Index
