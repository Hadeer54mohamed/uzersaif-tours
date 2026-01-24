"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, X, Heart } from "lucide-react";
import { SectionDivider } from "../ui/SectionDivider";

const TripForYou = () => {
  const t = useTranslations("tripForYou");

  const forYouItems = [
    "psychological",
    "travelOften",
    "quietPlace",
    "valueFeeling",
    "leavePhone",
    "respectPlace",
  ];

  const notForYouItems = [
    "noise",
    "network",
    "moveAround",
    "travelToSay",
    "notReady",
  ];

  const renderTextWithHighlight = (text, colorClass = "text-[#F47A1F]") => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, i) => (
      <span key={i} className="block">
        {line.split(/\*(.*?)\*/g).map((part, j) =>
          j % 2 === 1 ? (
            <span key={j} className={`${colorClass} font-black`}>
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
    <section className="relative py-5 sm:py-20 overflow-hidden bg-black text-white">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
      

        {/* Two Columns */}
        <div  className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto mb-12">
          {/* For You Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent backdrop-blur-sm">
              <h3 className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-6 text-emerald-400 flex items-center gap-3 md:text-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                {t("forYouTitle")}
              </h3>
              <ul className="space-y-4">
                {forYouItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span className="leading-relaxed text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-base md:font-normal">
                      {renderTextWithHighlight(t(`forYou.${item}`), "text-[#F47A1F]")}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Not For You Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent backdrop-blur-sm">
              <h3 className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-6 text-red-400 flex items-center gap-3 md:text-2xl">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                {t("notForYouTitle")}
              </h3>
              <ul className="space-y-4">
                {notForYouItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                    <span  className="leading-relaxed text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-base md:font-normal">
                      {renderTextWithHighlight(t(`notForYou.${item}`), "text-red-400")}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        {/* Bedouin Message Box */}
        <motion.div
          id="booking"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto" 
         
        >
          <div  className="relative p-6 sm:p-8 rounded-2xl border border-[#F47A1F]/30 bg-gradient-to-br from-[#F47A1F]/10 to-[#F47A1F]/5 backdrop-blur-md text-white ">
            {/* Orange Glow Background */}
            <div   className="absolute inset-0 rounded-2xl bg-[#F47A1F]/5 blur-xl pointer-events-none" />
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 opacity-20">
            </div>
            
            {/* Stars decoration */}
            <div  className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-2 left-8 w-1 h-1 bg-[#F47A1F]/40 rounded-full" />
              <div className="absolute top-6 left-16 w-1.5 h-1.5 bg-[#F47A1F]/30 rounded-full" />
              <div className="absolute bottom-4 right-20 w-1 h-1 bg-[#F47A1F]/40 rounded-full" />
              <div className="absolute bottom-8 left-12 w-1 h-1 bg-[#F47A1F]/30 rounded-full" />
            </div>

            <div  className="relative z-10 text-center">
              <h4  className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-4 text-[#F47A1F] md:text-2xl">
                {t("bedouinBox.title")}
              </h4>
              <p className="text-white/90 leading-relaxed mb-4 text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-base md:font-normal">
                {t("bedouinBox.line1")}
              </p>
              <p className="text-white/90 leading-relaxed text-[clamp(1.25rem,4vw,2.2rem)] font-bold">
                {t("bedouinBox.line2")}
              </p>
              <p className="mt-4 text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#F47A1F] flex items-center justify-center gap-2 md:text-xl md:font-black">
                <span>{t("bedouinBox.welcome")}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TripForYou;
