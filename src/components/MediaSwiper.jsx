"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Facebook, Instagram, Music } from "lucide-react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Image as ImageIcon,
  Video,
  Sparkles
} from "lucide-react";
import { homeGallery } from "@/data/mediaSwiperData";
import { useTranslations } from "next-intl";
// Media Item Component for individual items
const MediaItem = ({ item, isActive, onVideoToggle, isMuted, toggleMute, objectFit = "cover" }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const t = useTranslations("mediaSwiper");
  // Get image URL helper 
  const getImageUrl = (image) => {
    if (!image) return "/trip.jpg";
    if (typeof image === "string") return image;
    return "/trip.jpg";
  };

  // Get video URL helper 
  const getVideoUrl = (item) => {
    if (item.videoUrl) return item.videoUrl;
    if (item.video) return item.video;
    return null;
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (item.type === "video") {
    const videoUrl = getVideoUrl(item);
    
    // Detect video platform
    const getVideoPlatform = (url) => {
      if (!url) return "local";
      if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
      if (url.includes("vimeo.com")) return "vimeo";
      if (url.includes("facebook.com") || url.includes("fb.watch")) return "facebook";
      if (url.includes("instagram.com")) return "instagram";
      if (url.includes("tiktok.com")) return "tiktok";
      return "local";
    };

    const platform = getVideoPlatform(item.videoUrl);

    // YouTube embed
    if (platform === "youtube") {
      let embedUrl = item.videoUrl;
      if (item.videoUrl.includes("youtube.com/watch")) {
        const videoId = item.videoUrl.split("v=")[1]?.split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isActive ? 1 : 0}&mute=1`;
      } else if (item.videoUrl.includes("youtu.be")) {
        const videoId = item.videoUrl.split("youtu.be/")[1]?.split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isActive ? 1 : 0}&mute=1`;
      }

      return (
        <div className="relative w-full h-full">
          <iframe
            src={embedUrl}
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        
        </div>
      );
    }

    // Facebook/Instagram/TikTok - Show external link card
    if (platform === "facebook" || platform === "instagram" || platform === "tiktok") {
      const platformInfo = {
        facebook: { 
          name: "Facebook", 
          color: "from-blue-600 to-blue-800",
          icon: <Facebook size={20} className="text-white" />,
          message: "فيديو فيسبوك"
        },
        instagram: { 
          name: "Instagram", 
          color: "from-pink-500 via-purple-500 to-orange-500",
          icon: <Instagram size={20} className="text-white" />, 
          message: "فيديو انستجرام"
        },
        tiktok: { 
          name: "TikTok", 
          color: "from-black to-gray-800",
          icon: <Music size={20} className="text-white" />,
          message: "فيديو تيك توك"
        }
      };

      const info = platformInfo[platform];

      return (
        <div className="relative w-full h-full">
          {/* Background with gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-90`} />
          
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              {info.icon}
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-2">{info.message}</h3>
            <p className="text-white/80 text-center mb-6 max-w-md">
              {item.caption || `شاهد الفيديو على ${info.name}`}
            </p>
            
            <motion.a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              شاهد على {info.name}
            </motion.a>

            <p className="text-white/60 text-sm mt-4">
              * روابط {info.name} تفتح في نافذة جديدة
            </p>
          </div>

          {/* Video Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-2 text-white text-sm font-medium"
          >
            <Video className="w-4 h-4" />
            {info.name}
          </motion.div>
        </div>
      );
    }

    // Local video
    return (
      <div className="relative w-full h-full group">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onClick={handleVideoClick}
        />
        
        {/* Video Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleVideoClick}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </motion.button>
        </div>

        {/* Video Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#F47A1F]/80 backdrop-blur-sm flex items-center gap-2 text-white text-sm font-medium"
        >
          <Video className="w-4 h-4" />
          {t("video")}
        </motion.div>

        {/* Mute Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>

       
      </div>
    );
  }

  // Image type
  return (
    <div className="relative w-full h-full">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        src={getImageUrl(item.image)}
        alt={item.alt || "Gallery image"}
        className={`w-full h-full object-${objectFit}`}
        onError={(e) => {
          console.error("Image failed to load:", item.image);
          e.target.src = "/trip.jpg";
        }}
      />
      
      {/* Image Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm flex items-center gap-2 text-white text-sm font-medium border border-[#F47A1F]/30"
      >
        <ImageIcon className="w-4 h-4" />
        {t("image")}
      </motion.div>

    
    </div>
  );
};

// Main MediaSwiper Component
const MediaSwiper = ({ 
  gallerySlug = null, 
  showOnHomepage = false,
  customMedia = homeGallery,
  className = "",
  height = "h-[500px]",
  autoPlayDefault = true,
  intervalDefault = 5,
  objectFit = "cover"
}) => {
  // تحويل البيانات مباشرة
  const getGalleryData = () => {
    if (!customMedia) return null;
    if (Array.isArray(customMedia)) {
      return { media: customMedia, autoPlay: autoPlayDefault, autoPlayInterval: intervalDefault };
    }
    return { 
      media: customMedia.media, 
      autoPlay: autoPlayDefault, 
      autoPlayInterval: intervalDefault 
    };
  };

  const [gallery, setGallery] = useState(getGalleryData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);

  // تحديث البيانات عند تغييرها
  useEffect(() => {
    setGallery(getGalleryData());
  }, [customMedia, autoPlayDefault, intervalDefault]);

  // Auto-play functionality
  const shouldAutoPlay = gallery?.autoPlay !== undefined ? gallery.autoPlay : autoPlayDefault;
  
  useEffect(() => {
    if (!gallery?.media?.length || isPaused || !shouldAutoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % gallery.media.length);
    }, (gallery?.autoPlayInterval || intervalDefault) * 1000);

    return () => clearInterval(interval);
  }, [gallery, isPaused, shouldAutoPlay, intervalDefault]);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (!gallery?.media?.length) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % gallery.media.length);
  }, [gallery]);

  const goToPrev = useCallback(() => {
    if (!gallery?.media?.length) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + gallery.media.length) % gallery.media.length);
  }, [gallery]);

  const goToIndex = useCallback((index) => {
    if (!gallery?.media?.length) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [gallery, currentIndex]);

  // Handle drag
  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrev();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // No gallery found
  if (!gallery?.media?.length) {
    return (
      <div className={`${height} ${className} flex items-center justify-center 
                      bg-black/90 rounded-3xl
                      border border-[#F47A1F]/20`}>
        <div className="text-center space-y-4">
          <ImageIcon className="w-16 h-16 mx-auto text-[#8A91A8]" />
          <p className="text-[#B6BDD6]">لا توجد صور أو فيديوهات في المعرض</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      
      {/* المعرض */}
      <div 
        className={`relative ${height} rounded-3xl overflow-hidden 
                    border border-[#F47A1F]/20 shadow-2xl shadow-[#F47A1F]/10
                    bg-black`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
      
      {/* Slides Container */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <MediaItem
            item={gallery.media[currentIndex]}
            isActive={true}
            isMuted={isMuted}
            toggleMute={() => setIsMuted(!isMuted)}
            objectFit={objectFit}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {gallery.media.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F47A1F]/60 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F47A1F]/60 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
            {gallery.media.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => goToIndex(index)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-8 h-3 bg-[#F47A1F]' : 'w-3 h-3 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPaused(!isPaused)}
            className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F47A1F]/60 transition-all duration-300"
          >
            {isPaused ? <Play className="w-4 h-4 ml-0.5" /> : <Pause className="w-4 h-4" />}
          </motion.button>

          {/* Counter Badge */}
          <div className="absolute bottom-6 right-6 z-20 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
            <span className="text-[#F47A1F]">{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{gallery.media.length}</span>
          </div>
        </>
      )}

      {/* Progress Bar */}
      {gallery.media.length > 1 && shouldAutoPlay && !isPaused && (
        <motion.div
          key={currentIndex}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ 
            duration: (gallery?.autoPlayInterval || intervalDefault), 
            ease: "linear" 
          }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#F47A1F] origin-left z-20"
        />
      )}

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#F47A1F]/30 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#F47A1F]/30 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#F47A1F]/30 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#F47A1F]/30 rounded-br-3xl pointer-events-none" />
      </div>
    </div>
  );
};

export default MediaSwiper;
