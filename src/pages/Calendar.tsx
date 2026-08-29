import { useState } from "react";
import TopNav from "@/components/TopNav";
import { tourDates } from "@/data/tourDates";

const Calendar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hovered = hoveredIndex !== null ? tourDates[hoveredIndex] : null;

  return (
    <main
      className="min-h-screen flex flex-col relative"
      style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace" }}
    >
      {/* Hover background image - always mounted, opacity controlled */}
      {tourDates.map((d, i) => d.image ? (
        <div
          key={`bg-${i}`}
          className="fixed inset-0 z-0 transition-opacity duration-700 pointer-events-none"
          style={{
            backgroundImage: `url(${d.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: hoveredIndex === i ? 0.35 : 0,
          }}
        />
      ) : null)}

      <TopNav />

      {/* Tour list - full width */}
      <div className="flex-1 pt-16 relative z-10">
        {tourDates.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-4 px-8 w-screen transition-opacity duration-200 cursor-default"
            style={{ opacity: hoveredIndex === i ? 1 : 0.7 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Venue + date - left aligned */}
            <div className="flex-1">
              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {d.venue}
              </p>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>
                {d.date}
              </span>
            </div>

            {/* CTA */}
            <div className="shrink-0 w-32 text-right">
              {d.ticketLink && (
                <a
                  href={d.ticketLink}
                  className="inline-block border border-white/40 hover:bg-white transition-all duration-200 text-white hover:text-black"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "4px 14px",
                  }}
                >
                  GET TICKETS
                </a>
              )}
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

export default Calendar;
