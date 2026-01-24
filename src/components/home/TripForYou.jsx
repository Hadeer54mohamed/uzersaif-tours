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
    "leavePhone",
    "respectPlace",
  ];

  const notForYouItems = [
    "noise",
    "network",
    "travelToSay",
    "needNetwork",
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
        <div  className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto mb-3">
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
       
      </div>
    </section>
  );
};

export default TripForYou;
