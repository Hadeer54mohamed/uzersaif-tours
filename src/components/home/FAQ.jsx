"use client";

import { HelpCircle, ChevronDown, Toilet } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import BeforeBookingSlider from "./BeforeBookingSlider";

const faqData = [
  {
    id: "faq-1",
    question: "لمين رحلة الصحراء البيضاء؟",
    answer: "الرحلة معمولة للي تعبان من الزحمة والضغط، وعايز تجربة مختلفة جدا عن أي حاجة شافها قبل كده، مش للّي بيدوّر على أرخص سعر أو فسحة سريعة. لو بتقدّر الهدوء، التنظيم، والمغامرة الحقيقية … يبقي دي رحلتك.",
  },
  {
    id: "faq-2",
    question: "هل الرحلة مناسبة ليا حتى لو أول مرة أطلع صحراء؟",
    answer: "أيوه. الرحلة مصممة للمبتدئين اللي أول مرة تطلع صحراء أو للمغامرين جرّبت قبل كده. البرنامج متدرّج ومُجهز يخليك تستمتع وانت مطمّن، من غير خبرة سابقة.",
  },
  {
    id: "faq-3",
    question: "هل الرحلة مغامرة صعبة؟",
    answer: "دي مغامرة محسوبة مش اختبار تحمّل. في كامب مجهز، تخييم مدروس، وفندق بدوي، علشان ترتاح في كل خطوة ليك من غير بهدلة أو ضغط.",
  },
  {
    id: "faq-4",
    question: "هل النوم والتجهيزات مريحة فعلًا؟",
    answer: "أيوه. احنا بنستخدم أفضل أنواع الخيم، المراتب، Sleeping Bags والبطاطين المناسبة لبرودة الصحراء، واللي تخليك نايم وانت مدفي ومرتاح في وسط الصحراء. مع ضمان بدو واحة الفرافرة في حلول فورية لو احتجت أي حاجة، الهدف إنك تعيش أفضل تجربة للصحراء البيضاء وانت مرتاح.",
  },
  {
    id: "faq-5",
    question: "هل الرحلة آمنة ومنظمة؟",
    answer: "الرحلة بينفذها بدو واحة الفرافرة بخبرة أكتر من 26 سنة، وتنظيم أكثر من 1000 رحلة بنفس الشكل، مع Guides ملازمين للمجموعة طول الوقت، وبرنامج واضح تفاصيله خطوة بخطوة.",
  },
  {
    id: "faq-6",
    icon: Toilet,
    question: "في حمّام؟ ولا الموضوع هيبقى صعب؟",
    answer: "في كامب الفرافرة حمام وكهرباء. وفي التخييم تجهيزات مناسبة للصحراء تحافظ على راحتك واحترام المكان، مش تجربة عشوائية ولا إحراج.",
  },
  {
    id: "faq-7",
    question: "والأكل؟ أخباره إيه؟",
    answer: "الأكل جزء أساسي من التجربة مش إضافة. 7 وجبات كاملة، أكل طازة وOrganic، كفاية ومظبوط في مواعيده، مع شاي زردا ومشروبات ساخنة طول اليوم.",
  },
  {
    id: "faq-8",
    question: "هل الناس اللي معايا في الرحلة هتكون مناسبة ليّ؟",
    answer: "الرحلة بعدد محدود ومش معمولة للكل. أغلب المشاركين مغامرين بيحبو الهدوء والتجارب المختلفة، ومش بتدور على زحمة أو رحلة عادية.",
  },
  {
    id: "faq-9",
    question: "هل في أي مصاريف تانية غير اللي مكتوب؟",
    answer: "لا. كل حاجة محسوبة داخل السعر: تنقلات، سفاري، تخييم، فندق، أكل، أنشطة، ورسوم محمية. كلها داخل السعر، بدون مصاريف إضافية خفية. الحاجة الوحيدة اللي هتعمل حسابك فيها هي المصاريف الشخصية فقط أو الهدايا.",
  },
  {
    id: "faq-10",
    question: "هل في شبكة موبايل؟ وهل ده هيأثر عليّ؟",
    answer: "الشبكة ضعيفة في التخييم (مكالمات فقط)، وده مقصود علشان تفصل فعلًا من زحمة الشغل والحياة. في الفندق الشبكة أفضل نسبيًا (4G). لو مش جاهز تفصل شوية، الرحلة دي ممكن ما تكونش ليك.",
  },
  {
    id: "faq-11",
    question: "إزاي أعرف إن الرحلة دي اختيار صح؟",
    answer: "لو عايز تجربة مختلفة، محسوبة، ومش عايز تطلع قلقان أو ترجع ندمان… الرحلة دي معمولة ليك. ولو بتدور على أرخص أو أسرع أو أسهل فسحة، الأفضل تختار حاجة تانية.",
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const toggleItem = useCallback((id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    setStars(generateStars(70));
    setMeteors(generateMeteors(4));
  }, []);

  return (
    <section className="relative py-8 sm:py-10 md:py-12 overflow-hidden">
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
        <div className="absolute top-20 right-20 w-56 h-56 rounded-full blur-3xl opacity-20 glow-purple" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-15 glow-fire" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-[#F47A1F30]">
              <HelpCircle className="w-8 h-8 icon-fire" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 text-primary">
            الأسئلة الشائعة
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-secondary">
            إجابات على أكثر الأسئلة شيوعاً التي يطرحها عملاؤنا
          </p>
        </div>
        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {faqData.map((faq, index) => {
            const isOpen = openItem === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 text-center flex flex-col justify-center items-center animate-fade-in-up backdrop-blur-sm card-cosmic"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-center items-center gap-2 text-lg sm:text-xl font-bold transition-colors faq-question"
                >
                  {faq.icon && <faq.icon className="w-8 h-8 shrink-0 text-white" />} {faq.question}
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
                    <p className="text-base leading-relaxed faq-answer">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <BeforeBookingSlider />

      </div>
    </section>
  );
};

export default FAQ;
