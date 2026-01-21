"use client";

import { Button } from "../ui/button";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import MediaSwiper from "@/components/MediaSwiper";
import { afterHeroVideo } from "@/data/mediaSwiperData";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const heroRef = useRef(null);
  const y = useMotionValue(0);
  const yTransform = useTransform(y, [0, 300], [0, -45]);
  const [isMobile, setIsMobile] = useState(false);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [brightStars, setBrightStars] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => y.set(window.scrollY / 3);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // نجوم أكتر للموبايل والديسكتوب
    const starCount = isMobile ? 80 : 150;
    setStars(generateStars(starCount));
    setMeteors(generateMeteors(isMobile ? 4 : 8, {
      delayMultiplier: 2,
      baseRepeatDelay: 5,
      repeatDelayRange: 8
    }));

    // توليد النجوم اللامعة
    const brightCount = isMobile ? 8 : 15;
    const generatedBrightStars = [...Array(brightCount)].map((_, i) => ({
      id: `bright-${i}`,
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      duration: 5 + Math.random() * 5,
    }));
    setBrightStars(generatedBrightStars);
  }, [isMobile, isMounted]);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-[60vh] md:min-h-[70vh] pt-16 md:pt-20"
    >

      {/* Background with Parallax */}
      <motion.div
        style={{ y: yTransform }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >

        {/* 🌌 Cosmic Overlay */}
        <div className="absolute inset-0 overlay-hero" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center space-y-4 text-center"
        >

          <h1
            className="text-[clamp(1.5rem,4vw,3.2rem)] font-bold mb-2 drop-shadow-lg text-fire leading-tight"
          >
            {t("title")} <br className="md:hidden" />
            {t("inHeart")}{" "}
            <span className="text-white">
              {t("titleHighlight")}
            </span>
          </h1>

          <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 pt-2">
            <div className="bg-[#F47A1F]/15 backdrop-blur-md border border-[#F47A1F]/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg shadow-[#F47A1F]/10">
              <p className="text-[clamp(0.8rem,3.5vw,1.15rem)] sm:text-[clamp(0.9rem,2vw,1.15rem)] leading-relaxed text-center text-white/90 drop-shadow">
                {t("subtitle2")}
                <br className="sm:hidden" />
                {" "}{t("subtitle2Continue")}{" "}
                <br className="sm:hidden" />
                <span className="text-[#F47A1F] font-bold">
                  {t("subtitle2Highlight")}
                </span>
              </p>
            </div>
          </div>


        </motion.div>
        <p
          className="text-[clamp(0.9rem,2vw,1.15rem)] mt-3 text-primary/90 leading-relaxed text-center"
        >
          <span dir="ltr" className="inline-block text-fire font-bold">
            {t("days")}
          </span>{" "}
          <span className="text-fire font-bold">{t("daysText")}</span>
          {t("subtitle")}
          <br />

          {t("subtitleContinue")}{" "}
          <span className="text-fire font-bold">
            {t("strangenessAndBeauty")}
          </span>
          <br />
          {t("subtitle3Continue")}{" "}
          <span className="text-fire font-bold">
            {t("bedouinSpecialist2")}
          </span>
        </p>
        <p className="text-[clamp(0.9rem,2vw,1.15rem)]  max-w-2xl mx-auto leading-relaxed text-center drop-shadow text-primary/90">
          {t("experience")}{" "}
          <span className="text-fire font-bold">{t("years")}</span>{" "}
          {t("andExecuted")}{" "}
        </p>

        <p className="text-[clamp(0.9rem,2vw,1.15rem)] mb-4 md:mb-5 max-w-2xl mx-auto leading-relaxed text-center drop-shadow text-primary/90">
          {t("insideReserve")}
          <span className="text-fire font-semibold">
            {" "}{t("whiteDesert")}
          </span>
        </p>
        <MediaSwiper
          customMedia={afterHeroVideo}
          height="h-[600px]"
          className="container mx-auto px-4 "
        />

        <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 pt-4">
          <div className="bg-[#F47A1F]/15 backdrop-blur-md border border-[#F47A1F]/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg shadow-[#F47A1F]/10">
            <p className="text-[clamp(0.8rem,3.5vw,1.15rem)] sm:text-[clamp(0.9rem,2vw,1.15rem)] leading-relaxed text-center text-white/90 drop-shadow">
              {t("subtitle3")}
              <br className="sm:hidden" /> {" "}
              <span className="text-[#F47A1F] font-bold">
                {t("subtitle3Highlight")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
