"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import MediaSwiper from "../MediaSwiper";
import { DesertFeeling as desertFeelingMedia } from "@/data/mediaSwiperData";
const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function DesertFeeling() {
  const t = useTranslations("desertFeeling");

  return (
    <section className="relative py-4 sm:py-8 bg-black text-white overflow-hidden">
      {/* Fire Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-[#F47A1F]/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-4 text-[#F47A1F] drop-shadow-lg md:text-[clamp(1.25rem,4vw,2.2rem)]"
        >
          {t("title")}
        </motion.h2>

        {/* List */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <motion.ul
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4"
          >
            {["safe", "fire", "stars", "noNotifications", "noRush"].map(
              (item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="group flex items-center justify-center gap-3 text-center"
                >
                  {/* Fire Dot */}
                  <span className="w-2 h-2 rounded-full bg-[#F47A1F] shadow shadow-[#F47A1F]/40 group-hover:scale-125 transition-transform" />

                  {/* Text */}
                  <span className="text-white/85 text-[clamp(1.25rem,4vw,2.2rem)] font-bold leading-relaxed md:text-[clamp(0.95rem,2.5vw,1.05rem)] md:font-black">
                    {t(item)}
                  </span>
                </motion.li>
              )
            )}
          </motion.ul>
        </div>

        {/* Footer Feeling */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto text-fire text-[clamp(1.25rem,4vw,2.2rem)] font-bold leading-relaxed md:text-[clamp(0.95rem,2.5vw,1.1rem)] md:font-black"
        >
          <span className="text-[#F47A1F] font-black">
            {t("footerHighlightStart")}
          </span>{" "}
          {t("footerText")}{" "}
          <span className="text-[#F47A1F] font-black">
            {t("footerHighlightEnd")}
          </span>
        </motion.p>
      </div>
      <MediaSwiper
          customMedia={desertFeelingMedia}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
        />
    </section>
  );
}
