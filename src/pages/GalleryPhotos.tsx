import TopNav from "@/components/TopNav";
import { galleryImages } from "@/data/galleryImages";

const s = {
  label: { fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" },
  footer: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" },
};

// The first row is above the fold on every common viewport; everything after
// it is lazy-loaded. Each tile reserves its aspect ratio up front so the grid
// doesn't reflow as images arrive.
const EAGER_COUNT = 2;

const GalleryPhotos = () => (
  <main
    style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace", minHeight: "100vh" }}
  >
    <TopNav />

    <section style={{ padding: "100px 24px 0", maxWidth: 1200, margin: "0 auto" }}>
      <p style={{ ...s.label, marginBottom: 32 }}>Photos</p>
    </section>

    <section style={{ padding: "0 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((img, i) => (
          <div
            key={img.src}
            style={{
              aspectRatio: `${img.width} / ${img.height}`,
              overflow: "hidden",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <img
              src={img.src}
              alt={img.alt ?? ""}
              width={img.width}
              height={img.height}
              loading={i < EAGER_COUNT ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-80"
              style={{ objectPosition: img.objectPosition ?? "center" }}
            />
          </div>
        ))}
      </div>
    </section>

    <footer style={{ padding: "40px 24px", textAlign: "center", ...s.footer }}>
      © 2026 Massimo Paparello. All rights reserved.
    </footer>
  </main>
);

export default GalleryPhotos;
