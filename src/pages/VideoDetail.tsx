import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { videos } from "@/data/videos";
const thumbnails = [
  "https://images.unsplash.com/photo-1766939228418-1100778fb1fe?w=1600&q=80",
  "https://images.unsplash.com/photo-1766939228501-065717002601?w=1600&q=80",
  "https://images.unsplash.com/photo-1766939228598-e8d73e87ec01?w=1600&q=80",
];

const categoryLabel: Record<string, string> = {
  live: "Live Set",
  studio: "Studio",
  documentary: "Documentary",
  aftermovie: "Aftermovie",
};

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const video = videos.find((v) => v.id === id);
  const videoIndex = videos.findIndex((v) => v.id === id);

  if (!video) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Video not found</h1>
          <Link to="/videos" className="text-muted-foreground hover:text-foreground underline">Back to all videos</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const related = videos.filter((v) => v.id !== id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back */}
          <Link to="/videos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={16} /> All Videos
          </Link>

          {/* Player area */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8 bg-black">
            <img
              src={thumbnails[videoIndex % thumbnails.length]}
              alt={video.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-white/80 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer bg-white/10 backdrop-blur-sm">
                <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                {categoryLabel[video.category]}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{video.title}</h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
              <Share2 size={14} /> Share
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {video.date}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {video.location}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {video.duration}</span>
          </div>

          <p className="text-foreground/80 leading-relaxed max-w-3xl text-lg">{video.description}</p>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="text-xl font-bold text-foreground mb-6 tracking-tight">More Videos</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((v, i) => (
                  <Link key={v.id} to={`/videos/${v.id}`} className="group">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-md mb-2">
                      <img
                        src={thumbnails[i % thumbnails.length]}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm">{v.duration}</span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover:underline leading-snug">{v.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{v.date}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default VideoDetail;
