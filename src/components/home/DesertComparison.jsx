"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import MediaSwiper from "../MediaSwiper";
import { DesertComparison as desertComparisonMedia } from "@/data/mediaSwiperData";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function DesertComparison() {
  const t = useTranslations("desertComparison");

  return (
<section className="relative py-6 sm:py-8 bg-black text-white overflow-hidden">
{/* subtle glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-[#F47A1F]/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-10 text-white md:text-[clamp(1.3rem,4vw,2.4rem)]"
        >
          {t("titleStart")}{" "}
          <span className="text-[#F47A1F]">{t("titleHighlight")}</span>
        </motion.h2>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Other Trips */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="border border-red-500/30 bg-red-500/5 rounded-2xl p-5 sm:p-6"
          >
            <h3 className="text-red-400 font-bold text-[clamp(1.25rem,4vw,2.2rem)] mb-4 md:text-lg">
              {t("othersTitle")}
            </h3>

            <motion.ul
              variants={container}
              className="space-y-3 text-white/80"
            >
              {["other1", "other2", "other3", "other4"].map((key) => (
                <motion.li
                  key={key}
                  variants={item}
                  className="flex items-start gap-3"
                >
                  <span className="text-red-400 mt-1">✕</span>
                  <span className="leading-relaxed text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-lg md:font-black">{t(key)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Our Trip */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="border border-green-500/30 bg-green-500/5 rounded-2xl p-5 sm:p-6"
          >
            <h3 className="text-green-400 font-extrabold mb-4 text-[clamp(1.6rem,5vw,2.3rem)] md:text-[clamp(1.4rem,2.5vw,2rem)]">
    {t("ourTitle")}
  </h3>

            <motion.ul variants={container} className="space-y-4 text-white/90">
              {["our1", "our2", "our3", "our4"].map((key) => (
                <motion.li key={key} variants={item} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1 text-lg">✔</span>
                  <span className="leading-relaxed text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-lg md:font-black">
                    {t(key)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
       
      </div>
      <MediaSwiper
          customMedia={desertComparisonMedia}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
        />
    </section>
  );
}
