"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useTranslations } from "next-intl";

const videosData = [
  {
    id: "jdI3GoGe9XI",
    type: "youtube", 
  },
  {
    id: "https://www.facebook.com/share/r/1E3xARZCYZ/",
    title: "تعرف بقي ليه الماشروم والدجاجة رمز الصحراء البيضاء ؟! ",
    type: "facebook",
    thumbnail: "/hero.jpg", 
  },
  {
    id: "i4w2WfMh-fw",
    type: "youtube",
  },
  {
    id: "https://www.facebook.com/share/r/1E3xARZCYZ/",
    title: "تعرف بقي ليه الماشروم والدجاجة رمز الصحراء البيضاء ؟! ",
    type: "facebook",
    thumbnail: "/hero.jpg", 
  },
  {
    id: "jdI3GoGe9XI",
    type: "youtube",
  },
  {
    id: "i4w2WfMh-fw",
    type: "youtube",
  },
];

// Video Card Component
const VideoCard = ({ video, onClick, index, t }) => {
  // Get title from translations
  const getTitle = () => {
    if (video.type === "facebook") {
      return t("videos.facebook");
    }
    // Try to get translated title for YouTube videos
    const translatedTitle = t(`videos.${video.id}`, { defaultValue: "" });
    if (translatedTitle && translatedTitle !== `videos.${video.id}`) {
      return translatedTitle;
    }
    return t("watchVideo");
  };

  // Get YouTube thumbnail URL
  const getThumbnail = () => {
    if (video.thumbnail) return video.thumbnail;
    if (video.type === "youtube") {
      return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
    }
    return "/hero.jpg";
  };

  const handleClick = () => {
    if (video.type === "facebook") {
      window.open(video.id, "_blank");
    } else {
      onClick();
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="group w-full rounded-xl overflow-hidden relative card-cosmic"
    >
      {/* Thumbnail with background */}
      <div 
        className="w-full aspect-video bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
        style={{ backgroundImage: `url(${getThumbnail()})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Platform Badge */}
      {video.type === "facebook" && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-blue-600/90 text-white text-[10px] sm:text-xs font-medium">
          Facebook
        </div>
      )}

      {/* YouTube Badge */}
      {video.type === "youtube" && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-red-600/90 text-white text-[10px] sm:text-xs font-medium">
          YouTube
        </div>
      )}

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg transition-colors duration-300 ${
            video.type === "facebook"
              ? "bg-blue-600/90 shadow-blue-600/30 group-hover:bg-blue-600"
              : "bg-red-600/90 shadow-red-600/30 group-hover:bg-red-600"
          }`}
        >
          <Play className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white fill-white ml-0.5" />
        </motion.div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
        <h3 className="text-white font-semibold text-[10px] sm:text-xs md:text-sm line-clamp-2 text-right leading-tight">
          {getTitle()}
        </h3>
      </div>
    </motion.button>
  );
};

export default function ReviewsVideos() {
  const t = useTranslations("reviewsVideos");
  const [activeVideo, setActiveVideo] = useState(null);
  const sliderRef = useRef(null);

  const goToPrev = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector("button")?.offsetWidth || 400;
      sliderRef.current.scrollBy({ left: -cardWidth - 12, behavior: "smooth" });
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector("button")?.offsetWidth || 400;
      sliderRef.current.scrollBy({ left: cardWidth + 12, behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 sm:py-10 relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-3 sm:px-6 text-center mb-4 sm:mb-8"
      >
        <h2 className="text-[clamp(1.25rem,4vw,2.5rem)] font-bold leading-tight text-primary">
          {t("title")}
        </h2>
      </motion.div>

      {/* Videos Grid */}
      <div className="container mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {videosData.map((video, index) => (
            <VideoCard
              key={`${video.id}-${index}`}
              video={video}
              index={index}
              onClick={() => setActiveVideo(video.id)}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-red-500/80 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            {/* Click outside hint */}
            <p className="absolute bottom-4 text-white/50 text-sm">
              {t("clickToClose")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
