"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

const features = [
  {
    title: "تجربة تغيّر روحك",
    description: "الصحراء البيضاء مش مجرد آية من آيات الله، دي تجربة ليها معنى، هدوءها وجمالها يغيّروا فيك حاجات كتير.",
    gridClass: "lg:col-span-3", 
  },
  {
    title: "راحة وتجهيزات ذكية",
    description: "تنظيم ذكي ومريح (فندق 3 نجوم – تخييم محسوب بأدواته – كامب مُجهّز).",
    gridClass: "lg:col-span-3",
  },
  {
    title: "ذكريات من عالم تاني",
    description: "هتاخد صور كأنها من عالم تاني مع فريق متخصص يخليك تطلع بأحلى كادرات.",
    gridClass: "lg:col-span-2",
  },
  {
    title: "أمان بدوي أصيل",
    description: "مع البدو، أنت في أمان. إحنا علينا راحتك وأنت عليك الاستمتاع.",
    gridClass: "lg:col-span-2",
  },
  {
    title: "انفصال عن الواقع",
    description: "هتعيش وسط الهدوء والنجوم، وتفصل تماماً عن دوشة المدينة وزحمتها.",
    gridClass: "lg:col-span-2",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    setStars(generateStars(60));
    setMeteors(generateMeteors(3, { delayMultiplier: 6, baseRepeatDelay: 15 }));
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#030712]">
      {/* الخلفية والعناصر الفضائية */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => <StarParticle key={star.id} star={star} />)}
        {meteors.map((meteor) => <ShootingStar key={meteor.id} meteor={meteor} />)}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ليه الرحلة دي مختلفة عن <span className="text-orange-500">أي مكان تاني؟</span>
          </h2>
          <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-orange-600 to-amber-400 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${feature.gridClass} group`}
            >
              <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;