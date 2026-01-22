"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Target, 
  Heart, 
  Globe, 
  Users, 
  Sparkles, 
  Award, 
  Shield, 
  Star,
  Compass,
  Mountain
} from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("about");
  const [stars, setStars] = useState<any[]>([]);
  const [meteors, setMeteors] = useState<any[]>([]);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setStars(generateStars(100));
    setMeteors(generateMeteors(6, { delayMultiplier: 4, baseRepeatDelay: 10 }));
  }, []);

  const values = [
    { icon: Target, key: "vision", gradient: "from-[#F47A1F] to-[#FFB85C]" },
    { icon: Heart, key: "mission", gradient: "from-[#ec4899] to-[#f472b6]" },
    { icon: Globe, key: "ourValues", gradient: "from-[#06b6d4] to-[#22d3ee]" },
    { icon: Users, key: "team", gradient: "from-[#8b5cf6] to-[#a78bfa]" }
  ];

  const stats = [
    { value: "50+", labelKey: "destinations", icon: Compass },
    { value: "200+", labelKey: "tripsPerYear", icon: Mountain },
    { value: "5000+", labelKey: "happyClients", icon: Users },
    { value: "98%", labelKey: "satisfaction", icon: Star },
  ];

  const features = [
    { icon: Shield, key: "1" },
    { icon: Award, key: "2" },
    { icon: Star, key: "3" },
    { icon: Users, key: "4" },
    { icon: Heart, key: "5" },
    { icon: Shield, key: "6" },
    { icon: Globe, key: "7" },
    { icon: Target, key: "8" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 🌌 خلفية فضائية ثابتة */}
      <div className="fixed inset-0 z-0 bg-cosmic-space" />

      {/* ✨ طبقة النجوم */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {stars.map((star) => (
          <StarParticle key={star.id} star={star} />
        ))}
      </div>

      {/* ☄️ طبقة الشهب */}
      <div className="fixed inset-0 pointer-events-none z-[2]">
        {meteors.map((meteor) => (
          <ShootingStar key={meteor.id} meteor={meteor} />
        ))}
      </div>


      <Navbar transparent />

      {/* Hero  */}
      <section className="relative z-10 h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/uzer.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/95" />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-10 w-16 h-16 opacity-20"
        >
          <Mountain className="w-full h-full text-[#F47A1F]" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-10 w-14 h-14 opacity-15"
        >
          <Award className="w-full h-full text-[#FFB85C]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F47A1F]/10 border border-[#F47A1F]/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#FFB85C]" />
            <span className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] md:text-sm md:font-normal">{t("badge")}</span>
          </motion.div>
          
          <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-4 leading-tight md:text-[clamp(2.5rem,7vw,4.5rem)] md:font-black">
            <span className="text-gradient-fire">{t("title")}</span>
            <span className="text-[#F5F7FA]"> {t("titleHighlight")}</span>
          </h1>
          
          <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] leading-relaxed max-w-xl mx-auto md:text-[clamp(1rem,2.5vw,1.35rem)] md:font-normal">
            {t("subtitle")}
            <span className="text-[#FFB85C] font-black"> {t("subtitleHighlight")}</span>
          </p>
        </motion.div>
      </section>

      <SectionDivider />
      
      {/* About Content */}
      <section className="relative z-10 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#F5F7FA] mb-3 md:text-4xl">
              {t("storyTitle")} <span className="text-gradient-fire">{t("storyHighlight")}</span>
            </h2>
            <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] max-w-lg mx-auto md:text-base md:font-normal">
              {t("storySubtitle")}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants as any}
                  whileHover={{ scale: 1.02, x: -5 }}
                  className="group flex items-start gap-4 p-5 rounded-2xl backdrop-blur-md transition-all duration-300
                             bg-black/90
                             border border-[#F47A1F]/15 hover:border-[#F47A1F]/40
                             hover:shadow-[0_0_30px_rgba(244,122,31,0.1)]"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                                bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10
                                border border-[#F47A1F]/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#F47A1F]" />
                  </div>
                  <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] leading-relaxed md:text-base md:font-normal">
                    {t(`features.${feature.key}`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Highlight Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="relative rounded-3xl p-8 text-center overflow-hidden
                           bg-[#F47A1F]/10
                           border border-[#F47A1F]/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F47A1F]/20 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#FFB85C]/10 to-transparent rounded-tr-full" />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Heart className="w-12 h-12 text-[#F47A1F] mx-auto" />
              </motion.div>
              
              <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#F5F7FA] mb-2 md:text-2xl">
                {t("highlightTitle")}
              </p>
              <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#FFB85C] md:text-xl md:font-black">
                {t("highlightSubtitle")}
              </p>
            </div>
          </motion.div>

          {/* Values Section*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#F5F7FA] mb-3 md:text-4xl">
              {t("valuesTitle")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-2xl p-6 backdrop-blur-md shadow-xl transition-all duration-300
                             bg-black/90
                             border border-[#F47A1F]/20 hover:border-[#F47A1F]/50
                             hover:shadow-[0_20px_50px_rgba(244,122,31,0.15)]"
                >
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center 
                                   bg-gradient-to-br ${value.gradient} shadow-lg
                                   group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold mb-3 text-center text-[#F5F7FA] group-hover:text-[#FFB85C] transition-colors md:text-lg">
                    {t(`values.${value.key}.title`)}
                  </h3>

                  <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold leading-relaxed text-center text-[#B6BDD6] md:text-sm md:font-normal">
                    {t(`values.${value.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="relative z-10 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="rounded-3xl p-8 sm:p-12 backdrop-blur-md
                         bg-black/80
                         border border-[#F47A1F]/20 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={isStatsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center
                                 bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10
                                 border border-[#F47A1F]/30 group-hover:border-[#F47A1F]/60
                                 transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 text-[#F47A1F]" />
                    </motion.div>
                    <motion.h3 
                      className="text-4xl sm:text-5xl font-black mb-2 text-gradient-fire"
                      initial={{ scale: 0.5 }}
                      animate={isStatsInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] md:text-sm md:font-normal">
                      {t(`stats.${stat.labelKey}`)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center rounded-3xl p-8 sm:p-10 relative overflow-hidden
                       bg-black/80
                       border border-[#F47A1F]/25 backdrop-blur-md shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#F47A1F]/15 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-[#FFB85C]/10 to-transparent rounded-tl-full" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Compass className="w-12 h-12 text-[#F47A1F] mx-auto mb-4" />
              </motion.div>
              
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-4 text-[#F5F7FA]">
                {t("cta.title")} <span className="text-gradient-fire">{t("cta.titleHighlight")}</span>؟
              </h2>
              <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] mb-8 max-w-lg mx-auto md:text-base md:font-normal">
                {t("cta.subtitle")}
              </p>
              
              <motion.a
                href="/trips"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center h-14 px-10 rounded-2xl font-bold
                           bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white
                           shadow-[0_10px_30px_rgba(244,122,31,0.4)] hover:shadow-[0_15px_40px_rgba(244,122,31,0.5)]
                           transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 ml-2" />
                {t("cta.button")}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />
      <Footer />
    </div>
  );
};

export default About;
