"use client";

import { HelpCircle, ChevronDown, X, ZoomIn } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import BeforeBookingSlider from "./BeforeBookingSlider";
import Image from "next/image";
import { useTranslations } from "next-intl";

const FAQ = () => {
  const t = useTranslations("faq");
  
  const faqData = [
    {
      id: "faq-1",
      questionKey: "firstTime",
    },
    {
      id: "faq-2",
      questionKey: "comfortable",
    },
    {
      id: "faq-3",
      questionKey: "food",
    },
  
    {
      id: "faq-4",
      questionKey: "hiddenCosts",
    },
    {
      id: "faq-5",
      questionKey: "bathroom",
      image: "/wc.jpg",
    },
  ];
  const [openItem, setOpenItem] = useState(null);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);

  const toggleItem = useCallback((id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    setStars(generateStars(70));
    setMeteors(generateMeteors(4));
  }, []);

  return (
    <section id="faq" className="relative overflow-hidden">
    

      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-[#F47A1F30]">
              <HelpCircle className="w-8 h-8 icon-fire" />
            </div>
          </div>
          <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-2 sm:mb-3 text-primary md:text-4xl md:font-extrabold">
            {t("title")}
          </h2>
          <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold max-w-2xl mx-auto text-secondary md:text-lg md:font-normal">
            {t("subtitle")}
          </p>
        </div>
        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {faqData.map((faq, index) => {
            const isOpen = openItem === faq.id;
            const question = t(`questions.${faq.questionKey}.question`);
            const answer = t(`questions.${faq.questionKey}.answer`);
            return (
              <div
                key={faq.id}
                className="rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 text-center flex flex-col justify-center items-center animate-fade-in-up backdrop-blur-sm card-cosmic"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-center items-center gap-2 text-[clamp(1.25rem,4vw,2.2rem)] font-bold transition-colors faq-question md:text-xl"
                >
                  {question}
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] mt-2 sm:mt-3" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className={`${faq.image ? "flex flex-col sm:flex-row-reverse gap-4 items-start" : ""}`}>
                      {faq.image && (
                        <div className="flex-shrink-0 flex justify-center w-full sm:w-auto mb-3 sm:mb-0">
                          <div 
                            className="relative group cursor-pointer"
                            onClick={() => setLightboxImage(faq.image)}
                          >
                            <div className="relative rounded-lg overflow-hidden border-2 border-[#F47A1F]/50 shadow-lg shadow-[#F47A1F]/20">
                              <Image 
                                src={faq.image} 
                                alt={question} 
                                width={150} 
                                height={150}
                                className="object-cover rounded-lg hover:scale-105 transition-transform duration-300 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <ZoomIn className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <p className={`text-[clamp(1.25rem,4vw,2.2rem)] font-bold leading-relaxed faq-answer flex-1 whitespace-pre-line md:text-base md:font-normal ${faq.image ? "text-right" : ""}`}>
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <BeforeBookingSlider />

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border-2 border-[#F47A1F]/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt="صورة مكبرة"
              width={800}
              height={600}
              className="object-contain max-h-[85vh] w-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default FAQ;
