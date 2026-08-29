import { useState, useEffect, useRef } from "react";

const images = [
  "/images/massimo-01.jpg",
  "/images/massimo-02.jpg",
  "/images/massimo-03.jpg",
  "/images/massimo-04.jpg",
  "/images/massimo-05.jpg",
  "/images/massimo-06.jpg",
  "/images/massimo-07.jpg",
  "/images/massimo-08.jpg",
  "/images/massimo-09.jpg",
  "/images/massimo-10.jpg",
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const goTo = (index) => {
    setCurrent((index + images.length) % images.length);
    resetTimer();
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();
    touchStartX.current = null;
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Massimo Paparello ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black" />

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white text-2xl px-2"
        aria-label="Previous photo"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white text-2xl px-2"
        aria-label="Next photo"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-yellow-500 w-4" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
