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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  const t = useTranslations("whyChooseUs");
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const features = [
    {
      key: "soulChanging",
      gridClass: "lg:col-span-3",
    },
    {
      key: "smartComfort",
      gridClass: "lg:col-span-3",
    },
    {
      key: "uniqueMemories",
      gridClass: "lg:col-span-2",
    },
    {
      key: "bedouinSafety",
      gridClass: "lg:col-span-2",
    },
    {
      key: "disconnect",
      gridClass: "lg:col-span-2",
    },
  ];

  useEffect(() => {
    setStars(generateStars(50));
    setMeteors(generateMeteors(2, { delayMultiplier: 8, baseRepeatDelay: 20 }));
  }, []);

  return (
    <section className="relative py-5 md:py-8 overflow-hidden bg-black">
      {/* خلفية النجوم */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <StarParticle key={star.id} star={star} />
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {meteors.map((meteor) => (
          <ShootingStar key={meteor.id} meteor={meteor} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            {t("title")} <span className="text-orange-500">{t("titleHighlight")}</span>
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-orange-600 to-amber-400 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`${feature.gridClass} group`}
            >
              <div className="relative h-full p-3 md:p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 overflow-hidden">
                <p className="text-white/90 leading-snug text-xs md:text-sm text-center">
                  {t(`features.${feature.key}.description`)}
                </p>

                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
