"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  WifiOff,
  ThermometerSnowflake,
  Backpack,
  RefreshCcw,
} from "lucide-react";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

const notes = [
  {
    icon: WifiOff,
    title: "الشبكة ضعيفة أثناء التخييم",
    desc: "وده جزء مقصود من التجربة علشان تفصل عن الدنيا وتعيش الهدوء الحقيقي.",
    desc2: "✔ في الكامب والفندق الشبكة أفضل نسبيًا",
  },
  {
    icon: ThermometerSnowflake,
    title: "الجو خفيف نهارًا وبارد ليلًا",
    desc: "التجهيزات محسوبة للبرد، ومعاك إرشادات واضحة قبل الرحلة علشان تيجي جاهز ومطمّن.",
    desc2: "✔ مع بطانيات في الكامب لضمان راحتك",
  },
  {
    icon: Backpack,
    title: "المطلوب منك بسيط جدًا",
    desc: "ملابسك، حاجاتك الشخصية، والالتزام بتعليمات الرحلة.",
    desc2: "✔ وإحنا علينا باقي التفاصيل والتجهيزات",
  },
  {
    icon: RefreshCcw,
    title: "البرنامج مرن للسلامة",
    desc: "ممكن يتغيّر ترتيب بعض النقاط حسب الظروف الجوية أو الأمنية، وده علشان نضمن تجربة آمنة ومريحة.",
    desc2: "✔ كل التعديلات بتكون لصالح راحتك وسلامتك من غير ما نضيّع روح التجربة أو قيمتها",
  },
];

export default function BeforeBooking() {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    setStars(generateStars(60));
    setMeteors(generateMeteors(4, { delayMultiplier: 4, baseRepeatDelay: 10 }));
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
        <div className="absolute top-24 left-16 w-56 h-56 rounded-full blur-3xl opacity-20 glow-purple" />
        <div className="absolute bottom-24 right-16 w-64 h-64 rounded-full blur-3xl opacity-15 glow-fire" />
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
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 icon-fire" />
            <h2 className="text-[clamp(1.75rem,5vw,3.2rem)] font-bold leading-tight text-primary">
              قبل ما تحجز
            </h2>
          </div>
          <p className="text-[clamp(0.95rem,2.2vw,1.15rem)] leading-relaxed px-2 text-secondary">
            ملاحظات مهمة علشان التجربة تبقى مريحة من أولها.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-5xl mx-auto">
          {notes.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group rounded-xl p-3 backdrop-blur-xl shadow-xl md:hover:scale-[1.02] transition-all duration-300 card-cosmic"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 transform md:group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 icon-ember" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[clamp(0.95rem,2.5vw,1.1rem)] font-bold mb-0.5 leading-snug text-primary">
                      {item.title}
                    </h3>
                    <p className="text-[clamp(0.75rem,1.8vw,0.85rem)] leading-relaxed mb-1 text-secondary">
                      {item.desc}
                    </p>
                    <p className="text-[clamp(0.7rem,1.7vw,0.8rem)] leading-relaxed font-medium pt-1 text-fire border-t border-white/10">
                      {item.desc2}
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
