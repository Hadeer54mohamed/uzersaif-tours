"use client";

import { motion } from "framer-motion";
import { Bed, Coffee, Shield, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

const assurances = [
  {
    icon: Bed,
    title: "ضمان النوم المريح ",
    subtitle: "خيمة نظيفة… تتحمل أقصى برد ",
    solutions: [
      "بطانية أو Sleeping Bag إضافية",
      "خيمة بديلة فورًا مع مرتبة + Sleeping Bag",
      "ترقية مجانية لأعلى تجهيز (Premium Setup) + خيمة سنجل لو محتاج",
    ],
  },
  {
    icon: Coffee,
    title: "ضمان الأكل ",
    subtitle: "أكل طازة – كفاية – مظبوط في ميعاده",
    solutions: ["وجبة إضافية مجانية 🍪", "شاي زردا طول اليوم ☕"],
  },
  {
    icon: Shield,
    title: "ضمان الأمان ",
    subtitle: "كل لحظة تبات فيها وإنت مرتاح ومطمن",
    solutions: [
      "نقل لمكان أكثر أمانًا فورًا",
      "إضاءة إضافية / بطانية / تغيير مكان الخيمة",
      "وجود Guide بدوي جنبك طول الليل ",
    ],
  },
  {
    icon: RefreshCcw,
    title: "ضمان الانسحاب بدون نقاش ",
    subtitle: "لو لغّيت قبل 10 أيام → فلوسك كاملة",
    solutions: [
      "استرجاع كامل Cash أو تحويل",
      "تأكيد الإلغاء خلال 10 دقايق ",
    ],
  },
];

export default function AssuranceSection() {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    setStars(generateStars(70));
    setMeteors(generateMeteors(4, { baseRepeatDelay: 10 }));
  }, []);

  return (
    <section className="relative py-6 sm:py-8 md:py-10 overflow-hidden">
      {/* 🌌 خلفية فضائية غامقة */}
      <div className="absolute inset-0 bg-cosmic-space" />

      {/* ✨ طبقة النجوم */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <StarParticle key={star.id} star={star} />
        ))}
      </div>

      {/* ☄️ طبقة الشهب */}
      <div className="absolute inset-0 pointer-events-none">
        {meteors.map((meteor) => (
          <ShootingStar key={meteor.id} meteor={meteor} />
        ))}
      </div>

      {/* توهج في الزوايا */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 rounded-full blur-3xl opacity-20 glow-purple" />
        <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full blur-3xl opacity-15 glow-fire" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-10 glow-purple" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-4 sm:mb-6 md:mb-8"
        >
          <h2 className="text-[clamp(1.75rem,5vw,3.2rem)] font-bold mb-2 sm:mb-3 leading-tight px-2 text-primary">
            ضمان بدو واحة الفرافرة
          </h2>
          <p className="text-[clamp(0.95rem,2.2vw,1.1rem)] leading-relaxed px-2 text-secondary">
            "التخييم عندنا مش فندق… لكن إحنا بدو، وكلمتنا شرف.
            وبسبب خبرتنا 26 سنة في الصحراء… بنضمن لك 4 ضمانات محددة وواضحة:"
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-6xl mx-auto">
          {assurances.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group rounded-xl p-3 backdrop-blur-xl shadow-xl md:hover:scale-[1.02] transition-all duration-300 card-cosmic"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 transform md:group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 icon-fire" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[clamp(0.95rem,2.5vw,1.1rem)] font-bold mb-0.5 leading-snug text-primary">
                      {item.title}
                    </h3>
                    <p className="text-[clamp(0.75rem,1.8vw,0.85rem)] leading-relaxed mb-1 text-secondary">
                      {item.subtitle}
                    </p>
                    <div className="mt-1 pt-1 border-t border-white/10">
                      <p className="text-[clamp(0.7rem,1.7vw,0.8rem)] font-medium mb-1 text-fire">
                        الحلول:
                      </p>
                      <ul className="space-y-0.5 text-[clamp(0.7rem,1.7vw,0.8rem)] leading-relaxed">
                        {item.solutions.map((solution, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start gap-1 text-secondary"
                          >
                            <span className="mt-0.5 flex-shrink-0 text-xs text-ember">
                              ✓
                            </span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-4 sm:mt-6 md:mt-8 text-center"
        >
          <p className="text-[clamp(1rem,2.5vw,1.2rem)] font-semibold px-2 leading-relaxed text-ember">
            ✨ لأن خبرتنا 26 سنة… وكلمتنا كلمة شرف ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
