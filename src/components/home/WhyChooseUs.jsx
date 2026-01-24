"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import { useTranslations } from "next-intl";
import { Sparkles, Shield, Camera, Flame, Moon, MessageCircle, ArrowLeft } from "lucide-react";
import MediaSwiper from "../MediaSwiper";
import { WhyChooseUs as WhyChooseUsMedia } from "@/data/mediaSwiperData";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const WhyChooseUs = () => {
  const t = useTranslations("whyChooseUs");
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const features = [
    { key: "soulChanging", icon: Sparkles, color: "from-amber-500 to-orange-600" },
    { key: "smartComfort", icon: Shield, color: "from-emerald-500 to-teal-600" },
    { key: "uniqueMemories", icon: Camera, color: "from-purple-500 to-pink-600" },
    { key: "bedouinSafety", icon: Flame, color: "from-red-500 to-orange-600" },
    { key: "disconnect", icon: Moon, color: "from-blue-500 to-indigo-600" },
  ];

  useEffect(() => {
    setStars(generateStars(50));
    setMeteors(generateMeteors(2, { delayMultiplier: 8, baseRepeatDelay: 20 }));
  }, []);

  const renderTextWithOrange = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, i) => (
      <span key={i} className="block">
        {line.split(/\*(.*?)\*/g).map((part, j) =>
          j % 2 === 1 ? (
            <span key={j} className="text-[#F47A1F] font-black">
              {part}
            </span>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </span>
    ));
  };

  return (
    <section className="relative py-6 sm:py-10 overflow-hidden bg-black text-white">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F47A1F]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-4 text-fire md:text-4xl">
            {t("title")}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                {/* Card */}
                <div className="relative h-full p-5 sm:p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md hover:border-[#F47A1F]/30 hover:bg-white/10 transition-all duration-300 group">
                  {/* Text */}
                  <p className="text-white/85 leading-relaxed text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-base md:font-normal">
                    {renderTextWithOrange(t(`features.${feature.key}.description`))}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F47A1F]/0 to-[#F47A1F]/0 group-hover:from-[#F47A1F]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#F47A1F] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
              
            );
          })}
        </div>

        {/* Booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 max-w-md mx-auto"
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
      </div>
      <MediaSwiper
        customMedia={WhyChooseUsMedia}
        height="h-[600px]"
        className="container mx-auto px-4 pt-5 "
      />

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-10"
      >
        <a
          href="#faq"
          className="inline-flex items-center gap-3 px-8 py-5 sm:px-12 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl text-white bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] shadow-lg shadow-[#F47A1F]/30 hover:shadow-[#F47A1F]/50 hover:scale-105 transition-all duration-300"
        >
          {t("ctaButton")}
        </a>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
