"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  AlertTriangle,
  WifiOff,
  ThermometerSnowflake,
  Backpack,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function BeforeBookingSlider() {
  const t = useTranslations("beforeBooking");

  const notes = [
    { icon: WifiOff, key: "network" },
    { icon: ThermometerSnowflake, key: "weather" },
    { icon: Backpack, key: "requirements" },
    { icon: RefreshCcw, key: "flexibility" },
  ];
  const sliderRef = useRef(null);

  const goToPrev = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('div')?.offsetWidth || 300;
      sliderRef.current.scrollBy({ left: -cardWidth - 12, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('div')?.offsetWidth || 300;
      sliderRef.current.scrollBy({ left: cardWidth + 12, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-4 sm:py-6 md:py-8 overflow-hidden">
     

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-4 sm:mb-6 md:mb-8"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 icon-fire" />
            <h2 className="text-[clamp(1.75rem,5vw,3.2rem)] font-bold leading-tight text-primary">
              {t("title")}
            </h2>
          </div>
          <p className="text-[clamp(0.95rem,2.2vw,1.15rem)] leading-relaxed px-2 text-secondary">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Horizontal Slider */}
        <div className="relative -mx-4 sm:-mx-6 px-4 sm:px-6">
          <div 
            ref={sliderRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {notes.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[340px] snap-center rounded-xl p-4 backdrop-blur-xl shadow-xl md:hover:scale-[1.02] transition-all duration-300 card-cosmic"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 transform md:group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 icon-ember" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[clamp(1rem,2.5vw,1.15rem)] font-bold mb-1 leading-snug text-primary">
                        {t(`notes.${item.key}.title`)}
                      </h3>
                      <p className="text-[clamp(0.8rem,1.8vw,0.9rem)] leading-relaxed mb-2 text-secondary">
                        {t(`notes.${item.key}.desc`)}
                      </p>
                      <p className="text-[clamp(0.75rem,1.7vw,0.85rem)] leading-relaxed font-medium pt-2 text-fire border-t border-white/10">
                        {t(`notes.${item.key}.desc2`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Scroll Indicator Dots */}
          <div className="flex justify-center gap-1.5 mt-2">
            {notes.map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 rounded-full bg-white/30"
              />
            ))}
          </div>
          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full items-center justify-center bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F47A1F]/60 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full items-center justify-center bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-[#F47A1F]/60 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
         
        </div>
        </div>
    </section>
  );
}
