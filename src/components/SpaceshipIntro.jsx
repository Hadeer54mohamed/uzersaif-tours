"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

// ألوان موحدة مع ثيم المشروع (Cosmic Desert Theme)
const INTRO_COLORS = {
  galaxy: {
    space: "#060812",
    navy: "#0B1022",
    blue: "#16203A",
    purple: "#251C3A",
  },
  desert: {
    fire: "#E57C1F",   // أهدى وأنعم
    ember: "#FFD08A",  // ذهبي
  },
  stars: {
    white: "#F2F5FF",
    glow: "#B6C5FF",
  }
};

const SpaceshipIntro = ({ onComplete }) => {
  const [stage, setStage] = useState("countdown");
  const [countdown, setCountdown] = useState(3);
  const [stars, setStars] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const completedRef = useRef(false);

  // Safe complete function to prevent multiple calls
  const safeComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  // Check mobile and reduced motion on client
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Skip intro if reduced motion is preferred
  useEffect(() => {
    if (reduceMotion) {
      safeComplete();
    }
  }, [reduceMotion]);

  const STAR_COUNT = isMobile ? 80 : 200;
  const TUNNEL_RINGS = isMobile ? 14 : 25;
  const SPEED_LINES = isMobile ? 20 : 40;

  // Generate stars based on STAR_COUNT
  useEffect(() => {
    setStars(
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 1,
      }))
    );
  }, [STAR_COUNT]);

  // Memoize speed lines to prevent recalculation on every render
  const speedLines = useMemo(() => {
    return Array.from({ length: SPEED_LINES }, (_, i) => ({
      id: i,
      width: Math.random() * 200 + 80,
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotation: Math.random() * 360,
      duration: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 1,
    }));
  }, [SPEED_LINES]);

  // Memoize landing particles
  const landingParticles = useMemo(() => {
    return Array.from({ length: isMobile ? 25 : 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 0.5,
    }));
  }, [isMobile]);

  // Stage transitions
  useEffect(() => {
    if (stage === "countdown") {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStage("stars");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }

    if (stage === "stars") {
      const starsTimer = setTimeout(() => {
        setStage("tunnel");
      }, 2000);
      return () => clearTimeout(starsTimer);
    }

    if (stage === "tunnel") {
      const tunnelTimer = setTimeout(() => {
        setStage("landing");
      }, 3000);
      return () => clearTimeout(tunnelTimer);
    }

    if (stage === "landing") {
      const completeTimer = setTimeout(() => {
        safeComplete();
      }, 1800);
      return () => clearTimeout(completeTimer);
    }
  }, [stage]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto"
        style={{ backgroundColor: INTRO_COLORS.galaxy.space }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* خلفية متدرجة موحدة */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              ${INTRO_COLORS.galaxy.space} 0%, 
              ${INTRO_COLORS.galaxy.blue}66 30%, 
              ${INTRO_COLORS.galaxy.navy} 60%,
              ${INTRO_COLORS.galaxy.purple}80 100%
            )`
          }}
        />

        {/* زر التخطي - ظاهر من الأول */}
        <button onClick={safeComplete} className="btn-skip-intro">
          SKIP
        </button>

        {/* نجوم الخلفية */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: star.duration + 1,
                repeat: reduceMotion ? 0 : Infinity,
                delay: star.id * 0.01,
              }}
            />
          ))}
        </div>
          
        {/* Countdown Stage */}
        {stage === "countdown" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div
                key={countdown}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                {/* رقم العداد */}
                <div 
                  className="text-[9rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-tight tracking-tight"
                  style={{
                    background: `linear-gradient(135deg, ${INTRO_COLORS.desert.fire} 0%, ${INTRO_COLORS.desert.ember} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {countdown}
                </div>
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: reduceMotion ? 0 : Infinity }}
              >
                <Rocket 
                  className="w-16 h-16 md:w-24 md:h-24 mx-auto" 
                  style={{ color: INTRO_COLORS.desert.fire }}
                />
              </motion.div>
              
              <motion.p
                className="text-2xl md:text-4xl text-white font-bold mt-6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: reduceMotion ? 0 : Infinity }}
              >
                جاري الإقلاع...
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Stars Field Stage */}
        {stage === "stars" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* نجوم متحركة إضافية */}
            {stars.slice(0, Math.floor(STAR_COUNT / 2)).map((star) => (
              <motion.div
                key={`moving-${star.id}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: star.duration,
                  repeat: reduceMotion ? 0 : Infinity,
                  repeatDelay: star.id * 0.01,
                }}
              />
            ))}
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-2xl leading-tight tracking-tight">
                  <span 
                    style={{
                      background: `linear-gradient(135deg, ${INTRO_COLORS.desert.fire} 0%, ${INTRO_COLORS.desert.ember} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    UzerSaif
                  </span>
                </h1>
                <motion.p
                  className="text-xl md:text-2xl text-white/90"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: reduceMotion ? 0 : Infinity }}
                >
                  عبور الفضاء...
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Hyperspace Tunnel Stage */}
        {stage === "tunnel" && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* حلقات النفق */}
            {Array.from({ length: TUNNEL_RINGS }, (_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${50 + i * 80}px`,
                  height: `${50 + i * 80}px`,
                  border: `${3 + i * 0.3}px solid`,
                  borderColor: i % 2 === 0 
                    ? `${INTRO_COLORS.desert.fire}66` 
                    : `${INTRO_COLORS.desert.ember}66`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 6],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.08,
                  repeat: reduceMotion ? 0 : (isMobile ? 1 : 2),
                  ease: "linear",
                }}
              />
            ))}

            {/* خطوط السرعة */}
            {speedLines.map((line) => (
              <motion.div
                key={`line-${line.id}`}
                className="absolute h-1 rounded-full"
                style={{
                  width: `${line.width}px`,
                  left: `${line.left}%`,
                  top: `${line.top}%`,
                  transform: `rotate(${line.rotation}deg)`,
                  background: `linear-gradient(90deg, transparent, ${line.id % 2 === 0 ? INTRO_COLORS.desert.fire : INTRO_COLORS.desert.ember}, transparent)`,
                }}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{
                  x: "300%",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: line.duration,
                  repeat: reduceMotion ? 0 : (isMobile ? 1 : 2),
                  delay: line.delay,
                  ease: "linear",
                }}
              />
            ))}

            {/* توهج المركز */}
            <motion.div
              className="absolute w-80 h-80 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${INTRO_COLORS.desert.fire}60 0%, ${INTRO_COLORS.desert.ember}30 50%, transparent 100%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: reduceMotion ? 0 : 2,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.p
                className="text-3xl md:text-5xl text-white font-bold leading-tight tracking-tight"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: reduceMotion ? 0 : 2 }}
              >
                رحلة فائقة السرعة 🚀
              </motion.p>
            </motion.div>
          </div>
        )}

        {/* Landing Stage */}
        {stage === "landing" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* أفق الصحراء */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{
                background: `linear-gradient(to top, 
                  ${INTRO_COLORS.galaxy.navy}ee 0%, 
                  ${INTRO_COLORS.desert.fire}40 30%,
                  ${INTRO_COLORS.galaxy.purple}40 70%, 
                  transparent 100%
                )`,
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
            
            {/* توهج الشمس/القمر */}
            <motion.div
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full blur-2xl"
              style={{
                background: `radial-gradient(circle, ${INTRO_COLORS.desert.ember}99 0%, ${INTRO_COLORS.desert.fire}66 50%, transparent 100%)`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 2.5, 2] }}
              transition={{ duration: 1.5 }}
            />

            {/* جزيئات الهبوط */}
            {landingParticles.map((particle) => (
              <motion.div
                key={`particle-${particle.id}`}
                className="absolute rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.id % 2 === 0 ? INTRO_COLORS.desert.fire : INTRO_COLORS.desert.ember,
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [0, 120],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                }}
              />
            ))}
            
            {/* نص الهبوط */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h2
                  className="text-4xl md:text-6xl text-white font-bold mb-4 drop-shadow-2xl leading-tight tracking-tight"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: reduceMotion ? 0 : 1 }}
                >
                  الهبوط على الصحراء البيضاء
                </motion.h2>
                <p className="text-2xl md:text-3xl drop-shadow-lg leading-tight tracking-tight">
                  <span className="text-white">مرحباً بك في كوكب </span>
                  <span 
                    style={{
                      background: `linear-gradient(90deg, ${INTRO_COLORS.desert.fire}, ${INTRO_COLORS.desert.ember})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    UzerSaif
                  </span>
                  <span className="text-white"> 🌟</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SpaceshipIntro;
