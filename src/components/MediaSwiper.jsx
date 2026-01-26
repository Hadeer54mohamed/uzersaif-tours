"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Facebook } from "lucide-react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Image as ImageIcon,
  Video
} from "lucide-react";
import { afterHeroVideo } from "@/data/mediaSwiperData";
import { useTranslations } from "next-intl";

// Media Item Component for individual items
const MediaItem = ({ item, isActive, isMuted, toggleMute, objectFit = "contain", onLoadComplete }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const t = useTranslations("mediaSwiper");
  // Get image URL helper 
  const getImageUrl = (image) => {
    if (!image) return "/TOURS.png";
    if (typeof image === "string") return image;
    return "/TOURS.png";
  };

  // Get video URL helper 
  const getVideoUrl = (item) => {
    if (item.videoUrl) return item.videoUrl;
    if (item.video) return item.video;
    return null;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        setIsVideoLoading(false);
        onLoadComplete?.();
      }
    }
  }, []);

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
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => onLoadComplete?.()}
          />
        
        </div>
      );
    }

    // Facebook- Show external link card
    if (platform === "facebook" ) {
      const platformInfo = {
        facebook: { 
          name: "Facebook", 
          color: "from-blue-600 to-blue-800",
          icon: <Facebook size={20} className="text-white" />,
          message: "فيديو فيسبوك"
        }
      };

      const info = platformInfo[platform];
      
      // Facebook card doesn't need loading, call immediately
      setTimeout(() => onLoadComplete?.(), 0);

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
        {/* Loading Spinner */}
        {isVideoLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#F47A1F]/30 border-t-[#F47A1F] rounded-full animate-spin" />
              <p className="text-white/70 text-sm">{t("loading")}</p>
            </div>
          </div>
        )}
        
        <video
          ref={(el) => {
            videoRef.current = el;
            if (el && el.readyState >= 3 && isVideoLoading) {
              setIsVideoLoading(false);
              onLoadComplete?.();
            }
          }}
          src={videoUrl}
          className={`w-full h-full object-cover ${isVideoLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster={item.poster || ""}
          onClick={handleVideoClick}
          onLoadedMetadata={() => {
            if (videoRef.current?.readyState >= 3) {
              setIsVideoLoading(false);
              onLoadComplete?.();
            }
          }}
          onCanPlay={() => {
            setIsVideoLoading(false);
            onLoadComplete?.();
          }}
          onCanPlayThrough={() => {
            setIsVideoLoading(false);
            onLoadComplete?.();
          }}
          onLoadedData={() => {
            setIsVideoLoading(false);
            onLoadComplete?.();
          }}
          onError={() => {
            setIsVideoLoading(false);
            onLoadComplete?.();
          }}
        />
        
        {/* Video Controls Overlay */}
        {!isVideoLoading && (
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
        )}
       
        {/* Mute Button */}
        {!isVideoLoading && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>
        )}
      </div>
    );
  }

  const imgRef = useRef(null);
  const loadCalledRef = useRef(false);

  useEffect(() => {
    loadCalledRef.current = false;
    
    const checkImage = () => {
      if (!loadCalledRef.current) {
        const img = imgRef.current;
        if (img?.complete && img?.naturalHeight !== 0) {
          loadCalledRef.current = true;
          onLoadComplete?.();
        }
      }
    };
    
    checkImage();
    
    const frameId = requestAnimationFrame(checkImage);
    
    const timeoutId = setTimeout(() => {
      if (!loadCalledRef.current) {
        loadCalledRef.current = true;
        onLoadComplete?.();
      }
    }, 500);
    
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [item.image, onLoadComplete]);

  const handleLoad = () => {
    if (!loadCalledRef.current) {
      loadCalledRef.current = true;
      onLoadComplete?.();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* Blurred Background */}
      <motion.img
        src={getImageUrl(item.image)}
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover scale-105 blur-xl opacity-40"
        animate={{ scale: [1.1, 1.15, 1.1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Main Image */}
      <motion.img
        ref={imgRef}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        src={getImageUrl(item.image)}
        alt={item.alt || "Gallery image"}
        className="relative z-10 max-w-full max-h-full object-contain"
        onLoad={handleLoad}
        onError={(e) => {
          e.target.src = "/hotel1.jpg";
          handleLoad();
        }}
      />

    </div>
  );
};

// Main MediaSwiper Component
const MediaSwiper = ({ 
  customMedia,
  className = "",
  height = "h-[400px] sm:h-[500px] md:h-[600px]",
  autoPlayDefault = true,
  intervalDefault = 4,
  objectFit = "cover",
  aspectRatio = "aspect-[4/3] sm:aspect-[16/10] md:aspect-auto"
}) => {
  const t = useTranslations("mediaSwiper");
  
  const mediaData = customMedia || afterHeroVideo;
  
  const getGalleryData = () => {
    if (!mediaData) return null;
    if (Array.isArray(mediaData)) {
      return { media: mediaData, autoPlay: autoPlayDefault, autoPlayInterval: intervalDefault };
    }
    return { 
      media: mediaData.media, 
      autoPlay: autoPlayDefault, 
      autoPlayInterval: intervalDefault 
    };
  };

  const [gallery, setGallery] = useState(getGalleryData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragX = useMotionValue(0);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setGallery(getGalleryData());
  }, [mediaData, autoPlayDefault, intervalDefault]);

  useEffect(() => {
    setIsMediaLoaded(false);
    
    const fallbackTimer = setTimeout(() => {
      setIsMediaLoaded(true);
    }, isMobile ? 500 : 300);
    
    return () => clearTimeout(fallbackTimer);
  }, [currentIndex, isMobile]);

  const handleMediaLoaded = useCallback(() => {
    setIsMediaLoaded(true);
  }, []);

  const shouldAutoPlay = gallery?.autoPlay !== undefined ? gallery.autoPlay : autoPlayDefault;

  // Force unpause on mobile after initial load
  useEffect(() => {
    if (isMobile && isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);
  
  useEffect(() => {
    if (!gallery?.media?.length || isPaused || !shouldAutoPlay || !isMediaLoaded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.media.length);
    }, (gallery?.autoPlayInterval || intervalDefault) * 1000);

    return () => clearInterval(interval);
  }, [gallery, isPaused, shouldAutoPlay, intervalDefault, isMediaLoaded]);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (!gallery?.media?.length) return;
    setCurrentIndex((prev) => (prev + 1) % gallery.media.length);
  }, [gallery]);

  const goToPrev = useCallback(() => {
    if (!gallery?.media?.length) return;
    setCurrentIndex((prev) => (prev - 1 + gallery.media.length) % gallery.media.length);
  }, [gallery]);

  const goToIndex = useCallback((index) => {
    if (!gallery?.media?.length) return;
    setCurrentIndex(index);
  }, [gallery]);

  // Handle drag
  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrev();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
    // Ensure autoplay continues on mobile after swipe
    if (isMobile) {
      setIsPaused(false);
    }
  };

  // Animation variants - simple fade transition
  const slideVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
      transition: {
        opacity: { duration: 0.5, ease: "easeOut" },
      },
    },
    exit: {
      opacity: 0,
      transition: {
        opacity: { duration: 0.3, ease: "easeIn" },
      },
    },
  };

  // No gallery found
  if (!gallery?.media?.length) {
    return (
      <div className={`w-full ${height} ${aspectRatio} ${className} flex items-center justify-center 
                      bg-gray-100 dark:bg-gray-800 rounded-3xl
                      border border-[#F47A1F]/20`}>
        <div className="text-center space-y-4">
          <ImageIcon className="w-16 h-16 mx-auto text-[#8A91A8]" />
          <p className="text-[#B6BDD6]">{t("noMedia")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} w-full`}>
      
      {/* المعرض */}
      <div 
        className={`relative w-full ${height} ${aspectRatio} rounded-3xl overflow-hidden 
                    border border-[#F47A1F]/20 shadow-2xl shadow-[#F47A1F]/10`}
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
      >
      
      {/* Background to prevent black flash */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Slides Container */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
        >
          <MediaItem
            item={gallery.media[currentIndex]}
            isActive={true}
            isMuted={isMuted}
            toggleMute={() => setIsMuted(!isMuted)}
            objectFit={objectFit}
            onLoadComplete={handleMediaLoaded}
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
      {gallery.media.length > 1 && shouldAutoPlay && !isPaused && isMediaLoaded && (
        <motion.div
          key={`${currentIndex}-${isMediaLoaded}`}
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
