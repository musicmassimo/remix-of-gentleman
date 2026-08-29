import { Link } from "react-router-dom";
import TopNav from "@/components/TopNav";

const coverImage = "https://images.unsplash.com/photo-1766939228554-77d3c914639a?w=1600&q=80";

const Music = () => (
  <main className="h-dvh w-dvw relative bg-black overflow-hidden" style={{ fontFamily: "'Space Grotesk', monospace" }}>
    <TopNav />

    {/* Full viewport album cover */}
    <Link to="/music/lucid-architecture" className="block h-full w-full">
      <img
        src={coverImage}
        alt="Lucid Architecture"
        className="h-full w-full object-cover"
      />

      {/* Album info overlay - centered, homepage text style */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-[300px] md:max-w-[400px]">
          <div className="flex justify-between text-xl md:text-2xl font-medium text-white">
            <span>Lucid</span>
            <span>Architecture</span>
          </div>
          <p className="text-center mt-3" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            MIDNIGHT STRUCTURES · 2025
          </p>
        </div>
      </div>
    </Link>
  </main>
);

export default Music;
