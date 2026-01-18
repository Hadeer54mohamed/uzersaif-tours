"use client";

import { Button } from "../ui/button";
import { MapPin, Calendar, Tent, Users } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

const statVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Hero = () => {
  const stats = [
    {
      icon: <Tent className="w-8 h-8 icon-fire" />,
      value: "Real Deep Experience",
      label: "تجربة محسوبة",
      description:
        "برنامج مدروس بالساعة يخليك تعيش الصحراء بعمق حقيقي من غير عشوائية ولا إجهاد.",
    },
    {
      icon: <Calendar className="w-8 h-8 icon-fire" />,
      value: "26 سنة خبرة",
      label: "تنظيم بدوي",
      description:
        "خبرة طويلة وتنفيذ مئات الرحلات الناجحة بضمانات واضحة وأسلوب احترافي.",
    },
    {
      icon: <MapPin className="w-8 h-8 icon-fire" />,
      value: "Adventure مختلفة",
      label: "لناس شبهك",
      description:
        "تجربة نادرة وآمنة للي زهق من الرحلات التقليدية ويدوّر على معنى حقيقي.",
    },
    {
      icon: <Users className="w-8 h-8 icon-fire" />,
      value: "Adventure Meaningful",
      label: "تجربة معمولة ليك",
      description:
        "سواء مسافر لوحدك، مع شريك حياتك، أو مع ناس بتقدّر الهدوء والتجارب اللي ليها معنى حقيقي.",
    },
  ];

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
      className="relative flex flex-col items-center justify-start overflow-hidden min-h-[85vh] md:min-h-[90vh] pb-8 md:pb-12"
    >
      {/* ✨ طبقة النجوم - متحركة يمين وشمال */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: isMobile ? star.size * 2 : star.size * 1.5,
                height: isMobile ? star.size * 2 : star.size * 1.5,
                backgroundColor: star.color,
                boxShadow: `0 0 ${star.size * 6}px ${star.glow}, 0 0 ${star.size * 12}px ${star.glow}80, 0 0 ${star.size * 20}px ${star.glow}40`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1.4, 0.9],
                x: [0, star.moveX || 0, 0, -(star.moveX || 0), 0],
                y: [0, star.moveY || 0, 0, -(star.moveY || 0), 0],
              }}
              transition={{
                duration: star.duration + 2,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* ☄️ الشهب - أبطأ وأندر عشان تجذب العين لما تظهر */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]">
          {meteors.map((meteor) => (
            <motion.div
              key={meteor.id}
              className="absolute"
              style={{
                left: `${meteor.startX}%`,
                top: `${meteor.startY}%`,
                width: isMobile ? 60 : 100,
                height: 1.5,
                borderRadius: "50%",
                transform: `rotate(${meteor.angle}deg)`,
                background: `linear-gradient(90deg, transparent, #FFE4A0, #FFFFFF)`,
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, 400],
                y: [0, meteor.yMove || 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: meteor.delay,
                repeatDelay: meteor.repeatDelay || 15,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* 🌟 النجوم اللامعة اللي بتتحرك - تم تقليل العدد وزيادة الجمالية */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[4]">
          {brightStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute"
              style={{ left: `${star.posX}%`, top: `${star.posY}%`, width: 2, height: 2 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_2px_rgba(255,255,255,0.8)]" />
              {/* لمعة الصليب (+) خفيفة جداً */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/20" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Background with Parallax */}
      <motion.div
        style={{ y: yTransform }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >

        {/* Desktop Video */}
        {!isMobile && (
          <Image
            src="/hero.jpg"
            alt="Uzer Saif"
            fill
            priority
            className="absolute inset-0 object-cover hero-image"
          />

        )}

        {/* Mobile Video */}
        {isMobile && (
          <Image
            src="/hero.jpg"
            alt="Uzer Saif"
            width={1000}
            height={1000}
            className="absolute inset-0 w-full h-full object-cover block "
          />
        )}

        {/* 🌌 Cosmic Overlay */}
        <div className="absolute inset-0 overlay-hero" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20 sm:pt-20 md:pt-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center space-y-4 text-center"
        >

          <h1
            className="text-[clamp(1.5rem,4vw,3.2rem)] font-bold mb-2 drop-shadow-lg text-white leading-tight"
            dir="rtl"
          >
            رحلة ناسا للفضاء <br className="md:hidden" />
            في قلب <span className="text-gradient-fire">الصحراء البيضاء</span>
          </h1>


          <div className="max-w-3xl space-y-3 px-4">
            <h2
              dir="rtl"
              className="text-[clamp(1.1rem,2.5vw,1.8rem)] font-medium text-primary/90 leading-relaxed text-center"
            >
              <span dir="ltr" className="inline-block text-fire font-bold">
                3
              </span>{" "}
              أيام هتسيب فيهم الدنيا كلها ورا ضهرك…
              <br />
              وتدخل عالم تاني من{" "}
              <span className="text-fire font-bold">
                الغرابة والجمال
              </span>
            </h2>


            <div className="flex flex-col items-center gap-2 pt-2">
              <p className="text-[clamp(0.9rem,1.8vw,1.2rem)] bg-primary/5 py-2 px-6 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                تجربة حقيقية بتنظيم <span className="font-bold">بدوي متخصص</span>
              </p>


            </div>
          </div>
        </motion.div>

        <p className="text-[clamp(0.9rem,2vw,1.15rem)] mt-3 max-w-2xl mx-auto leading-relaxed text-center drop-shadow text-primary/90">
          بخبرة أكتر من{" "}
          <span className="text-fire font-bold">26 سنة</span>{" "}
          وتنفيذ أكتر من{" "}
          <span className="text-fire font-bold">ألف رحلة</span>
        </p>

        <p className="text-[clamp(0.9rem,2vw,1.15rem)] mb-4 md:mb-5 max-w-2xl mx-auto leading-relaxed text-center drop-shadow text-primary/90">
          داخل واحدة من أعجب محميات العالم —
          <span className="text-fire font-semibold">
            {" "}الصحراء البيضاء
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-5 md:mb-6">
         

          <motion.a
            href="#booking"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="font-bold px-10 py-5 rounded-2xl backdrop-blur-md transition-all btn-outline-fire"
            >
              احجز الآن
            </Button>
          </motion.a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 max-w-6xl mx-auto px-2 md:px-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl p-3 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden card-cosmic"
            >
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-[#F47A1F20] to-[#FFB85C15]" />

              {/* Content */}
              <div className="relative z-10 flex items-start gap-2">
                {/* <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div> */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-extrabold mb-0.5 drop-shadow-lg text-primary">
                    {stat.value}
                  </h3>
                  <p className="font-bold mb-0.5 text-xs md:text-sm text-primary/95">
                    {stat.label}
                  </p>
                  <p className="text-xs leading-relaxed text-secondary">
                    {stat.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-[#F47A1F] to-[#FFB85C]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
