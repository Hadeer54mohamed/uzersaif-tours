"use client";

import { motion } from "framer-motion";
import { History, ShieldCheck, Users, Map, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MediaSwiper from "../MediaSwiper";
import { AboutBedouin as AboutBedouinMedia } from "@/data/mediaSwiperData";
const AboutBedouin = () => {
  const t = useTranslations("aboutBedouin");

  const stats = [
    { label: t("stats.experience"), value: "26+", icon: <History className="w-5 h-5 text-orange-500" /> },
    { label: t("stats.trips"), value: "1,000+", icon: <Map className="w-5 h-5 text-orange-500" /> },
    { label: t("stats.clients"), value: "10,000+", icon: <Users className="w-5 h-5 text-orange-500" /> },
    { label: t("stats.safety"), value: "100%", icon: <ShieldCheck className="w-5 h-5 text-orange-500" /> },
  ];
  return (
    <section className="relative pb-5 bg-black overflow-hidden py-8">
      {/* توهج خلفي */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-900/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-900/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* الصورة */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative group order-2 lg:order-1"
          >
            <MediaSwiper
              customMedia={AboutBedouinMedia}
              height="h-[500px] md:h-[700px] lg:h-[800px]"
              className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            /> 

              
            {/* بطاقة الخبرة */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-5 -right-5 bg-gradient-to-br from-orange-600 to-orange-700 p-5 rounded-2xl shadow-2xl z-20 hidden md:block"
            >
              <p className="text-4xl font-black text-white">26</p>
              <p className="text-white/90 text-sm font-bold">{t("stats.experienceDesc")}<br/>{t("stats.experienceDesc2")}</p>
            </motion.div>
          </motion.div>

          {/* النص */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-right order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-orange-500 font-bold tracking-widest uppercase text-[clamp(1.25rem,4vw,2.2rem)] mb-3 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 md:text-xl">
                {t("badge")}
              </span>
              
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold  text-white mb-6 leading-tight md:text-4xl lg:text-5xl">
                {t("title")} <br className="hidden md:block"/> 
                <span className="text-orange-500 ">{t("titleHighlight")}</span>
              </h2>
              
              <p className="text-white text-[clamp(1.25rem,4vw,2.2rem)]  font-bold leading-relaxed mb-6 md:text-lg md:font-normal">
                {t("description")}
              </p>
              
              <div className="relative pr-6 mb-6 border-r-4 border-orange-600/80 rounded-sm">
                <p className="text-fire leading-relaxed  text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-base md:font-normal">
                  {t("quote")}
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-colors duration-500"
            >
              <p className="text-white text-[clamp(1.25rem,4vw,2.2rem)] font-bold mb-1 md:text-xl md:font-medium">{t("promise")}</p>
              <p className="text-orange-400 text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-lg">{t("promiseHighlight")}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-l from-orange-600 to-transparent" />
                <span className="text-white text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-xl md:font-medium">UzerSaif Team</span>
              </div>
            </motion.div>
            {/* الأرقام */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6"
            >
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="text-center group cursor-default p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-orange-500/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                    <span className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-orange-500 md:text-2xl">{stat.value}</span>
                  </div>
                  <p className="text-white text-[clamp(1rem,3vw,1.1rem)] font-medium md:text-sm md:font-normal">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* فريقنا */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-600 to-amber-400 rounded-full group-hover:shadow-[0_0_15px_rgba(234,88,12,0.4)] transition-shadow duration-500" />
              <div className="pr-6">
                <h3 className="text-orange-400 font-bold text-[clamp(1.25rem,4vw,2.2rem)] mb-2 group-hover:text-orange-400 transition-colors md:text-xl">
                  {t("teamTitle")}
                </h3>
                <p className="text-white leading-relaxed text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-base md:font-normal">
                  {t("teamDescription")}
                  <span className="text-orange-400 font-black"> {t("teamHighlight")}</span>
                </p>
              </div>
            </motion.div>

            {/* Booking CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 w-full"
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

        </div>
      </div>
    </section>
  );
};

export default AboutBedouin;