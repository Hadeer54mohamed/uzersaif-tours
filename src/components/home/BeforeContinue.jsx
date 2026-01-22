"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function BeforeContinue() {
  const t = useTranslations("beforeContinue");

  return (
    <section className="relative py-4 sm:py-8 md:py-10 bg-black text-white overflow-hidden">
    {/* Fire Glow */}
    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] bg-[#F47A1F]/5 blur-[100px] rounded-full" />
  
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-3 sm:mb-4 text-[#F47A1F] drop-shadow-lg md:text-[clamp(1.25rem,4vw,2.2rem)]"
      >
        {t("title")}
      </motion.h2>
  
      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-white/90 text-[clamp(1.25rem,4vw,2.2rem)] font-bold leading-relaxed mb-2 sm:mb-8 max-w-3xl mx-auto px-2 md:text-[clamp(0.9rem,2.5vw,1.05rem)] md:font-normal"
      >
        
        {t("descriptionStart")}{" "}
        <span className="text-[#F47A1F] font-black">
          {t("highlightFeeling")}
        </span>{" "}
        {t("descriptionEnd")}
        <br />
        
      </motion.p>
  
      {/* List */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-3 sm:space-y-4"
        >
          {["crowd", "noise", "fastTrip", "photosOnly"].map((item) => (
            <motion.li
              key={item}
              variants={itemVariants}
              className="group flex items-center font-black justify-center gap-3 text-center transition-all duration-300 hover:translate-x-0.5"
            >
              {/* Fire Dot */}
              <span className="w-2 h-2 rounded-full bg-[#F47A1F] flex-shrink-0 shadow shadow-[#F47A1F]/40 group-hover:scale-125 transition-transform" />

              {/* Text */}
              <span className="text-white text-[clamp(1.25rem,4vw,2.2rem)] font-bold leading-relaxed group-hover:text-white transition-colors md:text-[clamp(0.95rem,2.5vw,1.05rem)] md:font-black">
                {t(item)}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
  
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-[#F47A1F]/10 backdrop-blur-sm border border-[#F47A1F]/30 rounded-xl p-4 sm:p-5">
          <p className="text-white/90 text-[clamp(1.25rem,4vw,2.2rem)] font-bold leading-relaxed md:text-[clamp(0.9rem,2.5vw,1.05rem)] md:font-normal">
            <span className="text-[#F47A1F] font-bold">
              {t("footerHighlight")}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  </section>
  
  );
}
