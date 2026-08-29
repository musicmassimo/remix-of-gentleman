import { cn } from "@/lib/utils"
import { InfiniteGallery } from "@/components/ui/infinite-gallery"
import { CenterText } from "@/components/ui/center-text"
import { useIntroSequence } from "@/hooks/use-intro-sequence"
import { galleryImages, introImages } from "@/data/galleryImages"
import TopNav from "@/components/TopNav"

const IntroOverlay = ({ imageSrc }: { imageSrc: string | null }) => {
  if (!imageSrc) return null

  return (
    <div className="fixed inset-0 z-20 h-dvh w-dvw bg-black">
      <img
        src={imageSrc}
        alt=""
        className="h-dvh w-dvw object-cover"
      />
    </div>
  )
}

const Index = () => {
  const { phase, currentImageSrc, isIntroComplete, skipIntro } =
    useIntroSequence({
      introImages,
      startDuration: 300,
      endDuration: 40,
      initialDelay: 100,
    })

  return (
    <div
      className={cn(
        "relative h-dvh w-full bg-black text-white overflow-hidden",
        "transition-opacity duration-700",
        phase === "loading" ? "opacity-0" : "opacity-100"
      )}
      onClick={phase === "intro" ? skipIntro : undefined}
    >
      {/* Top nav */}
      {isIntroComplete && <TopNav />}

      {/* Center text overlay */}
      <CenterText
        leftText="THE"
        rightText="GENTLEMAN"
        visible={isIntroComplete}
      />

      {/* Intro cycling images */}
      {phase === "intro" && <IntroOverlay imageSrc={currentImageSrc} />}

      {/* Main gallery - always mounted but hidden during intro */}
      <div
        className={cn(
          "h-full w-full transition-opacity duration-500",
          isIntroComplete ? "opacity-100" : "opacity-0"
        )}
      >
        <InfiniteGallery items={galleryImages} enabled={isIntroComplete} />
      </div>

      {/* Skip hint during intro */}
      {phase === "intro" && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
          <p className="text-white/40 text-xs uppercase tracking-widest animate-pulse">
            Click to skip
          </p>
        </div>
      )}
    </div>
  )
}

export default Index
