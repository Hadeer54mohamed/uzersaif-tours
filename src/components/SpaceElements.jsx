"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ✨ مكون النجمة
export const StarParticle = ({ star }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${star.left}%`,
      top: `${star.top}%`,
      width: star.size,
      height: star.size,
      backgroundColor: star.color,
      boxShadow: `0 0 ${star.size * 3}px ${star.glow}`,
    }}
    animate={{
      opacity: [star.minOpacity, star.maxOpacity, star.minOpacity],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: star.duration,
      repeat: Infinity,
      delay: star.delay,
      ease: "easeInOut",
    }}
  />
);

// ☄️ مكون الشهاب
export const ShootingStar = ({ meteor }) => (
  <motion.div
    className="absolute shooting-star"
    style={{
      left: `${meteor.startX}%`,
      top: `${meteor.startY}%`,
      width: meteor.length,
      height: 2,
      borderRadius: "50%",
      transform: `rotate(${meteor.angle}deg)`,
    }}
    initial={{ opacity: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      x: [0, meteor.distance],
      y: [0, meteor.distance * Math.tan((meteor.angle * Math.PI) / 180)],
    }}
    transition={{
      duration: meteor.speed,
      repeat: Infinity,
      delay: meteor.delay,
      repeatDelay: meteor.repeatDelay,
      ease: "easeOut",
    }}
  />
);

// 🌟 دالة إنشاء بيانات النجوم
export const generateStars = (count = 70) => {
  return Array.from({ length: count }, (_, i) => {
    const isLargeStar = Math.random() > 0.85;
    const isColoredStar = Math.random() > 0.9;

    return {
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: isLargeStar ? Math.random() * 3 + 2 : Math.random() * 2 + 0.5,
      color: isColoredStar
        ? Math.random() > 0.5
          ? "#FFE4A0"
          : "#FFB85C"
        : "#F4F7FF",
      glow: isColoredStar
        ? Math.random() > 0.5
          ? "#FFE4A0"
          : "#FFB85C"
        : "#C9D6FF",
      minOpacity: 0.2 + Math.random() * 0.3,
      maxOpacity: 0.7 + Math.random() * 0.3,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    };
  });
};

// ☄️ دالة إنشاء بيانات الشهب
export const generateMeteors = (count = 4, options = {}) => {
  const {
    delayMultiplier = 5,
    baseRepeatDelay = 12,
    repeatDelayRange = 15,
  } = options;

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    startX: Math.random() * 80 + 10,
    startY: Math.random() * 40,
    length: 60 + Math.random() * 80,
    angle: 30 + Math.random() * 30,
    distance: 200 + Math.random() * 300,
    speed: 0.8 + Math.random() * 0.8,
    delay: i * delayMultiplier + Math.random() * 5,
    repeatDelay: baseRepeatDelay + Math.random() * repeatDelayRange,
  }));
};

// 🌌 مكون طبقة النجوم الجاهز
export const StarsLayer = ({ count = 70, className = "" }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars(count));
  }, [count]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {stars.map((star) => (
        <StarParticle key={star.id} star={star} />
      ))}
    </div>
  );
};

export const MeteorsLayer = ({ count = 4, options = {}, className = "" }) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    setMeteors(generateMeteors(count, options));
  }, [count]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {meteors.map((meteor) => (
        <ShootingStar key={meteor.id} meteor={meteor} />
      ))}
    </div>
  );
};

export const SpaceBackground = ({
  starsCount = 70,
  meteorsCount = 4,
  meteorsOptions = {},
  showGlows = true,
  glowPositions = "default",
  className = "",
}) => {
  const getGlowElements = () => {
    if (!showGlows) return null;

    if (glowPositions === "hero") {
      return (
        <>
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-25 glow-purple" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 glow-fire" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 glow-blue" />
        </>
      );
    }

    if (glowPositions === "corners") {
      return (
        <>
          <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 glow-purple" />
          <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 glow-fire" />
        </>
      );
    }

    if (glowPositions === "assurance") {
      return (
        <>
          <div className="absolute top-20 left-10 w-48 h-48 rounded-full blur-3xl opacity-20 glow-purple" />
          <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full blur-3xl opacity-15 glow-fire" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-10 glow-purple" />
        </>
      );
    }

    if (glowPositions === "faq") {
      return (
        <>
          <div className="absolute top-20 right-20 w-56 h-56 rounded-full blur-3xl opacity-20 glow-purple" />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-15 glow-fire" />
        </>
      );
    }

    // Default glows
    return (
      <>
        <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 glow-purple" />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 glow-fire" />
      </>
    );
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* ✨ طبقة النجوم */}
      <StarsLayer count={starsCount} />

      {/* ☄️ طبقة الشهب */}
      <MeteorsLayer count={meteorsCount} options={meteorsOptions} />

      {/* توهج في الزوايا */}
      <div className="absolute inset-0 pointer-events-none">{getGlowElements()}</div>
    </div>
  );
};

// Hook مخصص لاستخدام النجوم والشهب
export const useSpaceElements = (starsCount = 70, meteorsCount = 4, meteorsOptions = {}) => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    setStars(generateStars(starsCount));
    setMeteors(generateMeteors(meteorsCount, meteorsOptions));
  }, [starsCount, meteorsCount]);

  return { stars, meteors };
};

export default SpaceBackground;
