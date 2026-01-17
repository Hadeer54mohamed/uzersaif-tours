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

const values = [
  {
    icon: Globe,
    title: "إحساس الفضاء الحقيقي",
    desc: "مكان طبيعي شكله كوكب تاني فعلًا، من غير ديكور، من غير تمثيل، ومن غير خداع سياحي.",
    desc2: "✔ Real space-like experience… on Earth.",
  },
  {
    icon: Camera,
    title: "صور مش شبه أي حد",
    desc: "تاخد صور كأنها من برّه الكوكب -لأنك واقف فعلًا في مكان مش شبه أي مكان تاني، تكوينات بيضا، مساحات فاضية، وسماء مفتوحة بلا حدود - صور مش متكررة، مش سياحية، ومش عند أي حد تاني",
    desc2: "✔ Natural. Raw. Unfiltered.",
  },
  {
    icon: Compass,
    title: "تعيش تجربة مغامرة",
    desc: "من غير ما تحس إنك بتغامر بنفسك بتدرّج ذكي يخليك تستمتع وانت مطمّن: كامب مجهز → تخييم محسوب → فندق بدوي",
    desc2: "✔ مغامرة فيها إحساس… من غير ضغط ولا بهدلة.",
  },
  {
    icon: ShieldCheck,
    title: "قرار آمن من البداية",
    desc: "تحجز وانت ضامن إنك مش هتندم لأن في ضمان بدو واحة الفرافرة اللي يحفظ حقك ويخلّي القرار آمن نفسيًا من البداية",
    desc2: "✔ ضمان بدو واحة الفرافرة",
  },
  {
    icon: Map,
    title: "برنامج رقم واحد في فئته",
    desc: "برنامج مقفول ومُجرب، كل خطوة معروفة وكل وقت محسوب.",
    desc2: '✔ مفيش ارتجال ولا "نظبطها في السكة"',
  },
  {
    icon: Home,
    title: "ضيافة بدوية حقيقية",
    desc: "ضيافة بدو واحة الفرافرة داخل على بدو عايشين كل حياتهم في الصحراء",
    desc2: "✔ بتحس كانك قاعد وسط اهلك وناسك فعلا",
  },
  {
    icon: MoonStar,
    title: "فصل حقيقي عن الدنيا",
    desc: "صمت، نجوم، نار، وهدوء نضيف من غير هلس، من غير زحمة",
    desc2: "✔ عدد محدود علشان التجربة تفضل Clean & Meaningful.",
  },
  {
    icon: Brain,
    title: "ترجع بحاجة أعمق من الصور",
    desc: "تحس إنك أهدى، أنضف ذهنيًا، وكأنك أخدت فاصل أطول من مدته.",
    desc2: "✔ مش بس Memories على الموبايل، لكن Mental reset",
  },
  {
    icon: CheckCircle,
    title: "ما تشيلش هم أي تفاصيل",
    desc: "نوم، أكل، تنقلات، تجهيزات … كل حاجة محسوبة داخل السعر.",
    desc2: "✔ من غير مصاريف خفية ولا حسابات مفاجئة",
  },
  {
    icon: Crown,
    title: "تجربة مش معمولة للكل",
    desc: "مش لأنك بتدور على أرخص رحلة ولا لأنك عايز تمشي مع الترند.",
    desc2: "✔ تجربة تختارها لأنك فاهم قيمتها",
  },
  {
    icon: Smile,
    title: "تحس إن قرارك كان صح من أول لحظة",
    desc: "مش بعد ما ترجع، لأن الاطمئنان موجود من البداية، ومكمّل معاك طول الرحلة.",
    desc2: "✔ الاطمئنان موجود من أول لحظة",
  },
  {
    icon: UserCheck,
    title: "Guide بدوي من أهل المكان",
    desc: "مسؤول عن راحتكم، وبيحكيلكم عن الصحراء من منظور اللي عايشها.",
    desc2: "✔ Guide بدوي من أهل المكان متاح لدعمكم طوال الرحلة",
  },
];

import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

export default function Experiences() {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    setStars(generateStars(80));
    setMeteors(generateMeteors(5, { delayMultiplier: 4, baseRepeatDelay: 10 }));
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
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 glow-purple" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-15 glow-fire" />
      </div>

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
            إيه اللي هتخرج بيه جديد من رحلة الصحراء البيضاء؟
          </h2>
          <p className="text-[clamp(0.95rem,2.2vw,1.1rem)] leading-relaxed px-2 text-secondary">
            حاجات مش متاحة في أي رحلة تانية… لأن التجربة دي متصممة من قبل ما تبدأ علشانك.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-w-7xl mx-auto">
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group rounded-xl p-3 shadow-md hover:shadow-xl md:hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm card-cosmic"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 transform md:group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 icon-fire" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[clamp(0.95rem,2.5vw,1.1rem)] font-bold mb-0.5 leading-snug text-primary text-center">
                      {item.title}
                    </h3>
                    <p className="text-[clamp(0.75rem,1.8vw,0.85rem)] leading-relaxed mb-1 text-secondary">
                      {item.desc}
                    </p>
                    <p className="text-[clamp(0.7rem,1.7vw,0.8rem)] leading-relaxed font-medium pt-1 text-ember border-t border-fire-light">
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
