"use client";

import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const defaultVideos = [
  { id: "QViYDcYGl34" },
  { id: "-aUqfhZNjPQ" },
  { id: "hkvlJHJEeHs" },
  { id: "jIYepfj2xZk" },
  { id: "qBw1QuRwz_o" },
  { id: "GzfxsGQc1LA" },
  { id: "mmtSc1TVgN4" },
  { id: "kUQyvODbExY" },
  { id: "yeYdMzvLTXk" },
  { id: "jdI3GoGe9XI" },
  { id: "i4w2WfMh-fw" },
];

const VideoCard = React.memo(({ video, isPlaying, onPlay, onClose }) => {
  const [imgError, setImgError] = useState(false);

  const thumbnail = `https://i.ytimg.com/vi/${video.id}/${imgError ? "hqdefault" : "maxresdefault"}.jpg`;

  return (
    <div className="video-card group w-full max-w-[350px] mx-auto rounded-lg overflow-hidden relative h-[500px] sm:h-auto sm:aspect-[9/16] bg-black/50 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#F47A1F]/20">
      {isPlaying ? (
        <>
          <div className="absolute top-0 left-0 right-0 h-14 z-50 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/80 hover:bg-red-600 flex items-center justify-center transition-colors pointer-events-auto touch-manipulation"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video"
          />
        </>
      ) : (
        <>
          {/* Hidden img to detect 404 */}
          <img
            src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
            alt=""
            className="hidden"
            onError={() => setImgError(true)}
            loading="lazy"
          />

          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02] brightness-105 contrast-105 group-hover:brightness-110 group-hover:contrast-110"
            style={{ backgroundImage: `url(${thumbnail})` }}
          />

          {/* Light Overlay */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Play Button */}
          <button
            onClick={() => onPlay(video.id)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            aria-label="تشغيل الفيديو"
            tabIndex={0}
          >
            <Play 
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#F47A1F] transition-transform duration-200 group-hover:scale-110" 
            />
          </button>
        </>
      )}
    </div>
  );
});

export default function ReviewsVideos({ id, videos = defaultVideos, layout = "carousel", showHeader = true, showCTA = true }) {
  const t = useTranslations("reviewsVideos");
  
  const autoId = useId();
  const uniqueId = id || autoId.replace(/:/g, "");

  const [playingVideoId, setPlayingVideoId] = useState(null);
  
  const prevBtnClass = `swiper-prev-${uniqueId}`;
  const nextBtnClass = `swiper-next-${uniqueId}`;

  return (
    <section className="py-8 relative overflow-hidden">

      {/* Header */}
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 text-center mb-6 sm:mb-8"
        >
          <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black leading-tight text-primary md:text-[clamp(1.25rem,4vw,2.5rem)]">
            {t("title")}
          </h2>
          <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-black text-secondary mt-2 md:text-[clamp(0.9rem,2vw,1.1rem)] md:font-normal">
            {t("subtitle")}
          </p>
        </motion.div>
      )}

      {/* Grid Layout */}
      {layout === "grid" ? (
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {videos.map((video, index) => (
              <VideoCard 
                key={`${video.id}-${index}`}
                video={video} 
                isPlaying={playingVideoId === video.id}
                onPlay={setPlayingVideoId}
                onClose={() => setPlayingVideoId(null)}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Swiper Carousel */
        <div className="container mx-auto px-4 sm:px-6 relative">
          {/* Navigation Buttons */}
          <button
            className={`${prevBtnClass} absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F47A1F]/80 hover:bg-[#F47A1F] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110`}
            aria-label="السابق"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            className={`${nextBtnClass} absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F47A1F]/80 hover:bg-[#F47A1F] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110`}
            aria-label="التالي"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <Swiper
            modules={[Pagination, A11y, Navigation]}
            spaceBetween={12}
            slidesPerView={1.1}
            centeredSlides={true}
            loop={true}
            navigation={{
              prevEl: `.${prevBtnClass}`,
              nextEl: `.${nextBtnClass}`,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              400: { slidesPerView: 1.3, centeredSlides: true, spaceBetween: 12 },
              540: { slidesPerView: 1.5, centeredSlides: true, spaceBetween: 14 },
              768: { slidesPerView: 2, centeredSlides: true, spaceBetween: 16 },
              1024: { slidesPerView: 2.5, centeredSlides: true, spaceBetween: 18 },
              1280: { slidesPerView: 3, centeredSlides: true, spaceBetween: 20 },
            }}
            className="reviews-videos-swiper !pb-10 !px-8 sm:!px-14 [&_.swiper-slide-active_.video-card]:scale-105 [&_.swiper-slide-active_.video-card]:-translate-y-2"
            dir="rtl"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={`${video.id}-${index}`}>
                <VideoCard 
                  video={video} 
                  isPlaying={playingVideoId === video.id}
                  onPlay={setPlayingVideoId}
                  onClose={() => setPlayingVideoId(null)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Booking CTA */}
      {showCTA && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 max-w-md mx-auto px-4"
        >
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white py-4 px-8 rounded-2xl shadow-lg shadow-[#F47A1F]/40 flex flex-col items-center justify-center gap-1 transition-all hover:shadow-[#F47A1F]/60 hover:brightness-110"
          >
            <motion.div 
              animate={{ x: [0, -6, 6, -6, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <span className="flex items-center gap-3 font-black text-xl">
                <MessageCircle size={28} />
                {t("bookingButton")}
              </span>
              <span className="text-black text-sm font-bold flex items-center gap-5">
                <span>-</span>
                {t("limitedSpots")}
                <span>-</span>
              </span>
            </motion.div>
          </motion.a>
        </motion.div>
      )}

    </section>
  );
}
