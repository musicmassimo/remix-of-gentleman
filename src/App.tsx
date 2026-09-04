import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// The landing page stays eagerly imported: it is the most common entry point
// and its intro animation is timed from first paint, so a Suspense fallback
// flash there would be visible. Every other route is code-split and only
// fetched when a visitor actually navigates to it.
import Index from "./pages/Index";

const Calendar = lazy(() => import("./pages/Calendar"));
const Music = lazy(() => import("./pages/Music"));
const AlbumDetail = lazy(() => import("./pages/AlbumDetail"));
const Syndicate = lazy(() => import("./pages/Syndicate"));
const GalleryPhotos = lazy(() => import("./pages/GalleryPhotos"));
const Videos = lazy(() => import("./pages/Videos"));
const VideoDetail = lazy(() => import("./pages/VideoDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// Teaching is a nested mini-site: the layout renders the main nav, its own
// sub-nav, and an <Outlet /> for whichever child route is active.
const TeachingLayout = lazy(() => import("./pages/teaching/TeachingLayout"));
const TeachingHome = lazy(() => import("./pages/teaching/TeachingHome"));
const TeachingAbout = lazy(() => import("./pages/teaching/TeachingAbout"));
const TeachingSignup = lazy(() => import("./pages/teaching/TeachingSignup"));
const TeachingResources = lazy(() => import("./pages/teaching/TeachingResources"));
const TeachingContact = lazy(() => import("./pages/teaching/TeachingContact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Black rather than the browser default, so a chunk fetch doesn't flash white
// against this site's dark pages.
const RouteFallback = () => (
  <div style={{ minHeight: "100vh", background: "#000" }} />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tour" element={<Calendar />} />
            <Route path="/music" element={<Music />} />
            <Route path="/music/lucid-architecture" element={<AlbumDetail />} />
            <Route path="/music/syndicate" element={<Syndicate />} />
            <Route path="/gallery/photos" element={<GalleryPhotos />} />
            <Route path="/gallery/videos" element={<Videos />} />
            <Route path="/videos/:id" element={<VideoDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
