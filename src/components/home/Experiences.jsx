"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Globe,
  Camera,
  Compass,
  ShieldCheck,
  Map,
  Home,
  MoonStar,
  Brain,
  CheckCircle,
  Crown,
  Smile,
  UserCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

export default function Experiences() {
  const t = useTranslations("experiences");
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const values = [
    { icon: Globe, key: "spaceFeeling" },
    { icon: Camera, key: "uniquePhotos" },
    { icon: Compass, key: "adventure" },
    { icon: ShieldCheck, key: "safeDecision" },
    { icon: Map, key: "topProgram" },
    { icon: Home, key: "bedouinHospitality" },
    { icon: MoonStar, key: "realDisconnect" },
    { icon: Brain, key: "deeperReturn" },
    { icon: CheckCircle, key: "noWorries" },
    { icon: Crown, key: "notForEveryone" },
    { icon: Smile, key: "rightDecision" },
    { icon: UserCheck, key: "bedouinGuide" },
  ];

  useEffect(() => {
    setStars(generateStars(80));
    setMeteors(generateMeteors(5, { delayMultiplier: 4, baseRepeatDelay: 10 }));
  }, []);

  return (
    <section className="relative py-6 sm:py-8 md:py-10 overflow-hidden">
   

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-4 sm:mb-6 md:mb-8"
        >
          <h2 className="text-[clamp(1.75rem,5vw,2.8rem)] font-bold mb-2 sm:mb-3 leading-tight px-2 text-primary">
            {t("title")}
          </h2>
          <p className="text-[clamp(0.95rem,2.2vw,1.1rem)] leading-relaxed px-2 text-secondary">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 max-w-7xl mx-auto">
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="group rounded-lg p-2.5 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm border border-white/5 hover:border-orange-500/20"
              >
                <div className="flex items-start gap-2">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight mb-1">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300 leading-snug">
                      {t(`items.${item.key}.desc`)}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-orange-400 leading-snug mt-1">
                      {t(`items.${item.key}.desc2`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
