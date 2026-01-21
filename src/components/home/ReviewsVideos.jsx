"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations, useMessages } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Grid } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

const videosData = [
  {
    id: "QViYDcYGl34",
    type: "youtube",
  },
  {
    id: "-aUqfhZNjPQ",
    type: "youtube",
  },
  {
    id: "hkvlJHJEeHs",
    type: "youtube",
  },
  {
    id: "jIYepfj2xZk",
    type: "youtube",
  },
  {
    id: "qBw1QuRwz_o",
    type: "youtube",
  },
  {
    id: "GzfxsGQc1LA",
    type: "youtube",
  },
  {
    id: "jIYepfj2xZk",
    type: "youtube",
  },
  {
    id: "mmtSc1TVgN4",
    type: "youtube",
  },
  {
    id: "kUQyvODbExY",
    type: "youtube",
  },
  {
    id: "jIYepfj2xZk",
    type: "youtube",
  },
  {
    id: "yeYdMzvLTXk",
    type: "youtube",
  },
  {
    id: "jdI3GoGe9XI",
    type: "youtube",
  },
  {
    id: "MKmVsxvuXck",
    type: "youtube",
  },
];


// Video Card Component
const VideoCard = ({ video, index, t, playingVideo, setPlayingVideo }) => {
  const isPlaying = playingVideo === `${video.id}-${index}`;
  const videoKey = `${video.id}-${index}`;
  const [videoInfo, setVideoInfo] = useState({ title: "", author: "" });

  // Fetch video info from YouTube oEmbed API
  useEffect(() => {
    if (video.type === "youtube") {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.id}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          setVideoInfo({
            title: data.title || "",
            author: data.author_name || "",
          });
        })
        .catch(() => {
          setVideoInfo({ title: "", author: "" });
        });
    }
  }, [video.id, video.type]);

  // Get title from YouTube or fallback to translations
  const getTitle = () => {
    if (video.type === "facebook") {
      return t("videos.facebook");
    }
    if (videoInfo.title) {
      return videoInfo.title;
    }
    return t("watchVideo");
  };

  // Get author name
  const getAuthor = () => {
    return videoInfo.author || "";
  };

  // Get YouTube thumbnail URL
  const getThumbnail = () => {
    if (video.thumbnail) return video.thumbnail;
    if (video.type === "youtube") {
      return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
    }
    return "/hero.jpg";
  };

  const handlePlay = () => {
    if (video.type === "facebook") {
      window.open(video.id, "_blank");
    } else {
      setPlayingVideo(videoKey);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group w-full rounded-xl overflow-hidden relative card-cosmic aspect-video bg-black"
    >
      {isPlaying && video.type === "youtube" ? (
        // Embedded YouTube Player
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={getTitle()}
        />
      ) : (
        // Thumbnail with Play Button
        <>
          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${getThumbnail()})` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Platform Badge */}
          {video.type === "facebook" && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-blue-600/90 text-white text-[10px] sm:text-xs font-medium z-10">
              Facebook
            </div>
          )}

          {video.type === "youtube" && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-red-600/90 text-white text-[10px] sm:text-xs font-medium z-10">
              YouTube
            </div>
          )}

          {/* Play Button */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
            aria-label={t("watchVideo")}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg transition-colors duration-300 ${
                video.type === "facebook"
                  ? "bg-blue-600/90 shadow-blue-600/30 group-hover:bg-blue-600"
                  : "bg-red-600/90 shadow-red-600/30 group-hover:bg-red-600"
              }`}
            >
              <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-white fill-white ml-1" />
            </motion.div>
          </button>

          {/* Title & Author */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
            <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base line-clamp-1 text-right leading-tight">
              {getTitle()}
            </h3>
            {getAuthor() && (
              <p className="text-white/70 text-[10px] sm:text-xs mt-1 text-right">
                {getAuthor()}
              </p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default function ReviewsVideos() {
  const t = useTranslations("reviewsVideos");
  const tDesertTrip = useTranslations("desertTrip");
  const messages = useMessages();

  const [playingVideo, setPlayingVideo] = useState(null);
  
  // Get guarantees data from messages object
  const guaranteesData = messages?.desertTrip?.trips?.["white-desert-premium"]?.guarantees;

  return (
    <section className="pt-8 relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 text-center mb-6 sm:mb-10"
      >
        <h2 className="text-[clamp(1.25rem,4vw,2.5rem)] font-bold leading-tight text-primary">
          {t("title")}
        </h2>
        <p className="text-[clamp(0.9rem,2vw,1.1rem)] text-secondary mt-2">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Swiper Carousel */}
      <div className="container mx-auto px-4 sm:px-6 relative">
        <Swiper
          modules={[Navigation, Pagination, A11y, Grid]}
          spaceBetween={12}
          slidesPerView={1}
          grid={{
            rows: 2,
            fill: "row",
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              grid: {
                rows: 2,
                fill: "row",
              },
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              grid: {
                rows: 2,
                fill: "row",
              },
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              grid: {
                rows: 2,
                fill: "row",
              },
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3,
              grid: {
                rows: 2,
                fill: "row",
              },
              spaceBetween: 24,
            },
          }}
          className="reviews-videos-swiper"
          dir="rtl"
        >
          {videosData.map((video, index) => (
            <SwiperSlide key={`${video.id}-${index}`}>
              <VideoCard
                video={video}
                index={index}
                t={t}
                playingVideo={playingVideo}
                setPlayingVideo={setPlayingVideo}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -right-1 sm:-right-4 md:-right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-500 sm:bg-primary/90 hover:bg-orange-600 sm:hover:bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="السابق"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <button
          className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -left-1 sm:-left-4 md:-left-6 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-500 sm:bg-primary/90 hover:bg-orange-600 sm:hover:bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="التالي"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>
      {/* الضمانات */}
      {guaranteesData && (
        <div className="container mx-auto px-4 sm:px-6 mt-10">
          <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold mb-6 text-primary text-center">
            {tDesertTrip("guaranteeTitle")}
          </h2>

          <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-[#F47A1F]/20">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
              {/* بقية الضمانات */}
              {Object.values(guaranteesData).map((g, i) => (
                <div key={i} className="transition-transform hover:scale-105">
                  <h4 className="text-sm font-black text-[#F47A1F] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F47A1F]"></span>
                    {g.title}
                  </h4>
                  <ul className="space-y-2 pr-4">
                    {g.items?.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-[#B6BDD6] items-start">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 mt-1 flex-shrink-0"></span>
                        <span className="font-bold text-xs text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2 lg:col-span-1 bg-emerald-500/50 backdrop-blur-lg rounded-xl p-5 border border-white/20 flex items-center justify-center transition-transform hover:scale-105 shadow-xl">
                <p className="text-white font-bold text-sm text-center leading-relaxed">
                  {tDesertTrip("guaranteeNote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
