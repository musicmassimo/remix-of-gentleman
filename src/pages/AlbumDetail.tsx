import { useState } from "react";
import TopNav from "@/components/TopNav";

const coverImage = "https://images.unsplash.com/photo-1766939228554-77d3c914639a?w=1600&q=80";

const tracks = [
  "Arrival",
  "Deep Corridor",
  "Luminance",
  "Between Worlds",
  "Strata",
  "Dissolve",
  "Lucid Architecture",
  "Event Horizon",
  "Aftermath",
];

const PlatformIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  switch (name) {
    case "Spotify":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      );
    case "Apple Music":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.28a10.49 10.49 0 00-1.564-.15C17.343.073 16.55.028 15.765 0H8.235c-.785.028-1.578.073-2.37.13A10.49 10.49 0 004.3.28a5.022 5.022 0 00-1.874.61C1.309 1.624.564 2.624.247 3.934a9.23 9.23 0 00-.24 2.19C.028 6.917 0 7.71 0 8.497v7.006c0 .786.028 1.58.007 2.373a9.23 9.23 0 00.24 2.19c.317 1.31 1.062 2.31 2.18 3.043a5.022 5.022 0 001.874.61c.792.057 1.585.102 2.37.13.793.057 1.586.073 2.372.101h7.53c.785-.028 1.578-.073 2.372-.13a10.49 10.49 0 001.564-.15 5.022 5.022 0 001.874-.61c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 00.24-2.19c.028-.793.007-1.587.007-2.373V8.497c0-.786-.028-1.58-.007-2.373zM17.42 17.223c0 .327-.048.627-.144.9a2.308 2.308 0 01-1.59 1.49c-.346.1-.706.139-1.068.115a2.156 2.156 0 01-1.468-.678 1.975 1.975 0 01-.507-1.392c.01-.453.163-.863.46-1.205a2.19 2.19 0 011.209-.725l1.742-.49a.387.387 0 00.271-.23.424.424 0 00.028-.135V9.762a.461.461 0 00-.057-.23.322.322 0 00-.202-.163l-5.378 1.512a.476.476 0 00-.202.144.382.382 0 00-.058.221v6.406c0 .327-.048.636-.144.918a2.308 2.308 0 01-1.59 1.49c-.346.1-.706.139-1.068.115a2.156 2.156 0 01-1.468-.678 1.975 1.975 0 01-.507-1.392c.01-.453.163-.863.46-1.205a2.19 2.19 0 011.209-.725l1.742-.49a.387.387 0 00.271-.23.424.424 0 00.028-.135V7.093c0-.193.048-.376.144-.55a.863.863 0 01.403-.355l5.844-1.643a.826.826 0 01.375-.048c.125.019.24.077.346.173a.61.61 0 01.163.278c.029.106.043.221.043.346v11.93z"/>
        </svg>
      );
    case "Beatport":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <path d="M21.429 13.259a8.477 8.477 0 01-1.272 3.627 8.61 8.61 0 01-2.83 2.83A8.398 8.398 0 0113.7 21.03v2.97h-1.2v-2.97a8.398 8.398 0 01-3.627-1.314 8.61 8.61 0 01-2.83-2.83 8.477 8.477 0 01-1.272-3.627H1.8v-1.2h2.97a8.477 8.477 0 011.272-3.627 8.61 8.61 0 012.83-2.83A8.398 8.398 0 0112.5 4.288V1.318h1.2v2.97a8.398 8.398 0 013.627 1.314 8.61 8.61 0 012.83 2.83 8.477 8.477 0 011.272 3.627h2.97v1.2h-2.97zM13.1 6.459a7.34 7.34 0 00-7.34 7.34 7.34 7.34 0 007.34 7.34 7.34 7.34 0 007.34-7.34 7.34 7.34 0 00-7.34-7.34zm0 11.68a4.34 4.34 0 110-8.68 4.34 4.34 0 010 8.68z"/>
        </svg>
      );
    case "Soundcloud":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.084-.1zm-.899 1.305c-.051 0-.091.039-.099.085l-.156 1.058.156 1.012c.008.05.048.085.099.085s.09-.035.099-.085l.194-1.012-.194-1.058c-.009-.05-.048-.085-.099-.085zm1.8-1.59c-.063 0-.113.048-.121.107l-.214 2.455.214 2.358c.008.059.058.107.121.107.063 0 .112-.048.12-.107l.248-2.358-.248-2.455c-.008-.059-.057-.107-.12-.107zm.901-.455c-.073 0-.131.053-.139.122l-.195 2.91.195 2.803c.008.069.066.122.139.122.073 0 .131-.053.14-.122l.224-2.803-.224-2.91c-.009-.069-.067-.122-.14-.122zm.899-.391c-.084 0-.148.063-.155.141l-.176 3.301.176 3.143c.007.078.071.141.155.141.083 0 .148-.063.155-.141l.201-3.143-.201-3.301c-.007-.078-.072-.141-.155-.141zm.9-.313c-.094 0-.168.07-.175.158l-.157 3.614.157 3.394c.007.088.081.158.175.158.093 0 .168-.07.175-.158l.18-3.394-.18-3.614c-.007-.088-.082-.158-.175-.158zm.899-.21c-.104 0-.184.08-.191.178l-.138 3.824.138 3.578c.007.098.087.178.191.178.104 0 .184-.08.19-.178l.159-3.578-.159-3.824c-.006-.098-.086-.178-.19-.178zm1.858-1.204c-.035-.015-.074-.023-.113-.023-.104 0-.193.065-.224.156l-.129 5.27.129 3.728c.007.107.096.193.224.193.107 0 .194-.074.224-.178l.147-3.743-.147-5.27c-.007-.03-.015-.059-.034-.083-.015-.023-.038-.043-.062-.058l-.015.008zm.899-.021c-.125 0-.225.093-.232.218l-.11 5.429.11 3.848c.007.12.107.212.232.212.125 0 .225-.093.232-.212l.127-3.848-.127-5.429c-.007-.125-.107-.218-.232-.218zm.901-.133c-.135 0-.243.103-.25.234l-.098 5.562.098 3.894c.007.131.115.234.25.234.136 0 .243-.103.251-.234l.111-3.894-.111-5.562c-.008-.131-.115-.234-.251-.234zm.899.18c-.146 0-.262.11-.27.254l-.079 5.148.079 3.931c.008.144.124.254.27.254.145 0 .261-.11.268-.254l.091-3.931-.091-5.148c-.007-.144-.123-.254-.268-.254zm.901-.382c-.156 0-.279.12-.286.27l-.06 5.55.06 3.964c.007.15.13.27.286.27.155 0 .279-.12.285-.27l.069-3.964-.069-5.55c-.006-.15-.13-.27-.285-.27zm3.681.572a3.29 3.29 0 00-1.383.303c-.282-3.2-2.996-5.694-6.303-5.694-.578 0-1.14.08-1.671.228-.198.056-.251.114-.253.226v11.241c.002.12.098.217.22.232l9.39.002a2.715 2.715 0 002.717-2.717 2.715 2.715 0 00-2.717-2.821z"/>
        </svg>
      );
    default:
      return null;
  }
};

const platforms = ["Spotify", "Apple Music", "Beatport", "Soundcloud"];

const AlbumDetail = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main
      className="min-h-screen flex flex-col relative"
      style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace" }}
    >
      {/* Full viewport cover image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={coverImage}
          alt="Lucid Architecture"
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      <TopNav />

      {/* Platform sub-nav */}
      <div className="flex justify-center items-center gap-4 pt-14 relative z-10">
        {platforms.map((name) => (
          <a
            key={name}
            href="#"
            className="flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ padding: 12, color: "rgba(255,255,255,0.5)" }}
            title={name}
          >
            <PlatformIcon name={name} />
          </a>
        ))}
      </div>

      {/* Album title - left aligned */}
      <div className="pt-6 pb-4 px-8 relative z-10">
        <h1 className="text-3xl font-bold tracking-tight">Lucid Architecture</h1>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
          MIDNIGHT STRUCTURES · 2025 · ALBUM
        </p>
      </div>

      {/* Tracklist - tour page layout */}
      <div className="flex-1 pt-4 relative z-10">
        {tracks.map((track, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-4 px-8 w-screen transition-opacity duration-200 cursor-default"
            style={{ opacity: hoveredIndex === i ? 1 : 0.7 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Track number - left */}
            <span className="shrink-0 w-8" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", fontVariantNumeric: "tabular-nums" }}>
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Track title - right aligned */}
            <div className="flex-1">
              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {track}
              </p>
            </div>

            {/* Platform icons - visible on hover */}
            <div className={`shrink-0 flex items-center gap-3 transition-opacity duration-200 ${hoveredIndex === i ? "opacity-60" : "opacity-0"}`}>
              {platforms.map((name) => (
                <a key={name} href="#" title={name} className="hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <PlatformIcon name={name} size={14} />
                </a>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="py-12 text-center relative z-10" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>
        © 2026 GENTLEMAN
      </footer>
    </main>
  );
};

export default AlbumDetail;
