"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Target, 
  Heart, 
  Globe, 
  Users, 
  Sparkles, 
  Award, 
  Shield, 
  Star,
  Compass,
  Mountain
} from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

const About = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setStars(generateStars(100));
    setMeteors(generateMeteors(6, { delayMultiplier: 4, baseRepeatDelay: 10 }));
  }, []);

  const values = [
    {
      icon: Target,
      title: "رؤيتنا",
      description:
        "أن نكون الوجهة الأولى التي يثق بها المسافرون العرب للحصول على تجارب سفر فريدة ومصممة بعناية.",
      gradient: "from-[#F47A1F] to-[#FFB85C]"
    },
    {
      icon: Heart,
      title: "مهمتنا",
      description:
        "نقدّم رحلات تُصنع بالحب والإتقان، وتهدف لخلق لحظات لا تُنسى وتفاصيل تجعل كل رحلة مختلفة.",
      gradient: "from-[#ec4899] to-[#f472b6]"
    },
    {
      icon: Globe,
      title: "قيمنا",
      description:
        "الاحترافية، الجودة، الشفافية، الالتزام، وخدمة تتجاوز التوقعات في كل خطوة.",
      gradient: "from-[#06b6d4] to-[#22d3ee]"
    },
    {
      icon: Users,
      title: "فريقنا",
      description:
        "فريق من خبراء السياحة المتخصصين بشغف في تنظيم المغامرات وتقديم تجارب متكاملة.",
      gradient: "from-[#8b5cf6] to-[#a78bfa]"
    }
  ];

  const stats = [
    { value: "50+", label: "وجهة سياحية", icon: Compass },
    { value: "200+", label: "رحلة سنويًا", icon: Mountain },
    { value: "5000+", label: "عميل سعيد", icon: Users },
    { value: "98%", label: "نسبة رضا العملاء", icon: Star },
  ];

  const features = [
    { icon: Shield, text: "نحن بدو واحة الفرافرة الأصليين، حياتنا كلها في الصحراء البيضاء وعارفين أسرارها، مش مجرد منظمين." },
    { icon: Award, text: "خبرة أكتر من 26 سنة في الصحراء البيضاء تحديدًا، ومعرفتنا دقيقة بكل مسار وتكوين ومكان تخييم آمن في كل موسم." },
    { icon: Star, text: "البرنامج الحالي اتنفّذ اكتر من 1000 مرة بنفس التفاصيل قبل كده ونجح مع مجموعات مختلفة." },
    { icon: Users, text: "القرار دايمًا في إيد guide أمين من بدو الفرافرة، ملازم للمجموعة طوال الرحلة." },
    { icon: Heart, text: "الفريق متعوّد يتعامل مع أنواع مختلفة من الضيوف مع احترام الاختلافات واحتياجات كل شخص." },
    { icon: Shield, text: "إدارة الرحلة مبنية على المسؤولية قبل المتعة. لو حد تعب الحل بيكون فوري." },
    { icon: Globe, text: "سمعتنا مبنية على سنين تنفيذ حقيقي، مش حملة تسويقية أو وعود على السوشيال." },
    { icon: Target, text: "التزام كامل بقوانين محمية الصحراء البيضاء حفاظًا على الأمان والطبيعة." },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 🌌 خلفية فضائية ثابتة */}
      <div className="fixed inset-0 z-0 bg-cosmic-space" />

      {/* ✨ طبقة النجوم */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {stars.map((star) => (
          <StarParticle key={star.id} star={star} />
        ))}
      </div>

      {/* ☄️ طبقة الشهب */}
      <div className="fixed inset-0 pointer-events-none z-[2]">
        {meteors.map((meteor) => (
          <ShootingStar key={meteor.id} meteor={meteor} />
        ))}
      </div>

      {/* توهج في الزوايا */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 bg-[#2A1F3F]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full blur-[100px] opacity-12 bg-[#F47A1F]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-8 bg-[#1B2A4A]" />
      </div>

      <Navbar transparent />

      {/* Hero  */}
      <section className="relative z-10 h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/uzer.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070A13]/40 via-[#0D1324]/70 to-[#070A13]/95" />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-10 w-16 h-16 opacity-20"
        >
          <Mountain className="w-full h-full text-[#F47A1F]" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-10 w-14 h-14 opacity-15"
        >
          <Award className="w-full h-full text-[#FFB85C]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F47A1F]/10 border border-[#F47A1F]/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#FFB85C]" />
            <span className="text-sm text-[#B6BDD6]">26 سنة من الخبرة</span>
          </motion.div>
          
          <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-black mb-4 leading-tight">
            <span className="text-gradient-fire">من</span>
            <span className="text-[#F5F7FA]"> نحن</span>
          </h1>
          
          <p className="text-[clamp(1rem,2.5vw,1.35rem)] text-[#B6BDD6] leading-relaxed max-w-xl mx-auto">
            لأن خبرتنا 26 سنة… 
            <span className="text-[#FFB85C] font-semibold"> وكلمتنا كلمة شرف</span>
          </p>
        </motion.div>
      </section>

      <SectionDivider />
      
      {/* About Content - محسّن */}
      <section className="relative z-10 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] mb-3">
              قصتنا مع <span className="text-gradient-fire">الصحراء</span>
            </h2>
            <p className="text-[#B6BDD6] max-w-lg mx-auto">
              من بدو واحة الفرافرة الأصليين، نقدم لكم تجربة حقيقية
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: -5 }}
                  className="group flex items-start gap-4 p-5 rounded-2xl backdrop-blur-md transition-all duration-300
                             bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/60
                             border border-[#F47A1F]/15 hover:border-[#F47A1F]/40
                             hover:shadow-[0_0_30px_rgba(244,122,31,0.1)]"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                                bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10
                                border border-[#F47A1F]/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#F47A1F]" />
                  </div>
                  <p className="text-[#B6BDD6] leading-relaxed text-sm sm:text-base">
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Highlight Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="relative rounded-3xl p-8 text-center overflow-hidden
                           bg-gradient-to-br from-[#F47A1F]/10 via-[#0D1324]/80 to-[#2A1F3F]/30
                           border border-[#F47A1F]/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F47A1F]/20 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#FFB85C]/10 to-transparent rounded-tr-full" />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Heart className="w-12 h-12 text-[#F47A1F] mx-auto" />
              </motion.div>
              
              <p className="text-xl sm:text-2xl font-bold text-[#F5F7FA] mb-2">
                نفضّل نخسر حجز…
              </p>
              <p className="text-lg sm:text-xl text-[#FFB85C] font-semibold">
                ولا نخسر ثقة أو نبوّظ تجربة باقي الضيوف
              </p>
            </div>
          </motion.div>

          {/* Values Section - محسّن */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] mb-3">
              ما يميزنا
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-2xl p-6 backdrop-blur-md shadow-xl transition-all duration-300
                             bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70
                             border border-[#F47A1F]/20 hover:border-[#F47A1F]/50
                             hover:shadow-[0_20px_50px_rgba(244,122,31,0.15)]"
                >
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center 
                                   bg-gradient-to-br ${value.gradient} shadow-lg
                                   group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-3 text-center text-[#F5F7FA] group-hover:text-[#FFB85C] transition-colors">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-center text-[#B6BDD6]">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="relative z-10 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="rounded-3xl p-8 sm:p-12 backdrop-blur-md
                         bg-gradient-to-br from-[#0D1324]/80 to-[#1B2A4A]/60
                         border border-[#F47A1F]/20 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={isStatsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center
                                 bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10
                                 border border-[#F47A1F]/30 group-hover:border-[#F47A1F]/60
                                 transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 text-[#F47A1F]" />
                    </motion.div>
                    <motion.h3 
                      className="text-4xl sm:text-5xl font-black mb-2 text-gradient-fire"
                      initial={{ scale: 0.5 }}
                      animate={isStatsInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-sm sm:text-base font-medium text-[#B6BDD6]">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center rounded-3xl p-8 sm:p-10 relative overflow-hidden
                       bg-gradient-to-br from-[#2A1F3F]/50 via-[#0D1324]/80 to-[#1B2A4A]/50
                       border border-[#F47A1F]/25 backdrop-blur-md shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#F47A1F]/15 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-[#FFB85C]/10 to-transparent rounded-tl-full" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Compass className="w-12 h-12 text-[#F47A1F] mx-auto mb-4" />
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#F5F7FA]">
                جاهز تبدأ <span className="text-gradient-fire">مغامرتك</span>؟
              </h2>
              <p className="text-[#B6BDD6] mb-8 max-w-lg mx-auto">
                انضم إلى آلاف المغامرين الذين وثقوا فينا
              </p>
              
              <motion.a
                href="/Trips"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center h-14 px-10 rounded-2xl font-bold
                           bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white
                           shadow-[0_10px_30px_rgba(244,122,31,0.4)] hover:shadow-[0_15px_40px_rgba(244,122,31,0.5)]
                           transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 ml-2" />
                اكتشف رحلاتنا
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />
      <Footer />
    </div>
  );
};

export default About;
