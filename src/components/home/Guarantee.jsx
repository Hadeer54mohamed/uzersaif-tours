"use client";

import { Wallet, Clock, HeartHandshake, Stamp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

export default function Guarantee() {
  const t = useTranslations("guarantee");
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const guaranteeItems = [
    {
      icon: <Stamp className="w-7 h-7 rotate-[-8deg] icon-fire" />,
      key: "stamp",
    },
    {
      icon: <Clock className="w-7 h-7 icon-fire" />,
      key: "respect",
    },
    {
      icon: <Wallet className="w-7 h-7 icon-fire" />,
      key: "money",
    },
    {
      icon: <HeartHandshake className="w-7 h-7 icon-fire" />,
      key: "comfort",
    },
  ];

  useEffect(() => {
    setStars(generateStars(60));
    setMeteors(generateMeteors(3));
  }, []);

  return (
    <section className="relative pt-4 pb-6 overflow-hidden">
  


      <div className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold mb-2 text-primary">
            {t("title")}
          </h2>
          <p className="text-lg leading-relaxed text-secondary">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {guaranteeItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15, duration: 0.45 }}
              className="rounded-2xl p-3 backdrop-blur-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all card-cosmic"
            >
              <div className="flex items-start gap-2 justify-center">
                <div className="flex-1 min-w-0 text-center">
                  <h3 className="text-base md:text-lg font-bold mb-0.5 text-primary">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-secondary font-black">
                    {t(`items.${item.key}.desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="mb-3 text-lg text-secondary">
            With{" "}
            <span className="font-semibold text-gradient-fire">
              Uzer Saif
            </span>
            , {t("footer")}
          </p>

          <motion.a
            href="#booking"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="font-bold px-6 py-3 rounded-2xl shadow-xl transition-all btn-fire"
            >
              {t("bookButton")}
            </Button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
