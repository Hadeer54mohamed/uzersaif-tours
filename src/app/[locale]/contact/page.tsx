"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Compass,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("contact");
  const [stars, setStars] = useState<any[]>([]);
  const [meteors, setMeteors] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setStars(generateStars(100));
    setMeteors(generateMeteors(6, { delayMultiplier: 4, baseRepeatDelay: 10 }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً ✨");
    setShowPopup(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    
    setTimeout(() => setShowPopup(false), 4000);
  };

  const contactInfo = [
    { 
      icon: Phone, 
      key: "phone",
      content: "+20 123 456 7890", 
      link: "tel:+201234567890"
    },
    { 
      icon: Mail, 
      key: "email",
      content: "info@uzersaif.com", 
      link: "mailto:info@uzersaif.com"
    },
    { 
      icon: MapPin, 
      key: "address",
      link: "#map"
    },
    { 
      icon: Clock, 
      key: "hours",
      link: "#"
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
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


      <Navbar transparent />

      {/* Hero */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/95" />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 opacity-20"
        >
          <Compass className="w-full h-full text-[#F47A1F]" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-10 w-16 h-16 opacity-15"
        >
          <Star className="w-full h-full text-[#FFB85C]" />
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
            <span className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] md:text-sm md:font-normal">{t("badge")}</span>
          </motion.div>
          
          <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-4 leading-tight md:text-[clamp(2.5rem,7vw,4.5rem)] md:font-black">
            <span className="text-gradient-fire">{t("title")}</span>
            <span className="text-[#F5F7FA]"> {t("titleHighlight")}</span>
          </h1>
          
          <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] leading-relaxed max-w-xl mx-auto md:text-[clamp(1rem,2.5vw,1.35rem)] md:font-normal">
            {t("subtitle")}
            <br />
            <span className="text-[#FFB85C]">{t("subtitleHighlight")}</span>
          </p>
        </motion.div>
      </section>

      <SectionDivider />

      {/* Contact */}
      <section className="relative z-10 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#F5F7FA] mb-3 md:text-4xl">
              {t("sectionTitle")}
            </h2>
            <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] max-w-lg mx-auto">
              {t("sectionSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Contact Info Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-4"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.link}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group block rounded-2xl p-5 backdrop-blur-md transition-all duration-300 bg-black/90 border border-[#F47A1F]/15 hover:border-[#F47A1F]/40 hover:shadow-[0_0_30px_rgba(244,122,31,0.15)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10 border border-[#F47A1F]/30 group-hover:scale-110 group-hover:border-[#F47A1F]/50 transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#F47A1F] group-hover:text-[#FFB85C] transition-colors" />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-[#F47A1F]/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[clamp(1.25rem,4vw,2.2rem)] text-[#F5F7FA] mb-0.5 group-hover:text-[#FFB85C] transition-colors md:text-base">
                          {t(`info.${info.key}.title`)}
                        </h3>
                        <p className="text-[#F47A1F] font-bold text-[clamp(1.25rem,4vw,2.2rem)]" dir={info.link.startsWith("tel") ? "ltr" : "rtl"}>
                          {info.content || t(`info.${info.key}.content`)}
                        </p>
                        <p className="text-[#8A91A8] text-[clamp(1.25rem,4vw,2.2rem)] font-bold mt-1 md:text-xs md:font-normal">{t(`info.${info.key}.description`)}</p>
                      </div>
                      <div className="text-[#F47A1F]/30 group-hover:text-[#F47A1F]/60 transition-colors">
                        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.a>
                );
              })}

              {/* Social Links */}
              <motion.div 
                variants={itemVariants}
                className="pt-4"
              >
                <p className="text-[#8A91A8] text-[clamp(1.25rem,4vw,2.2rem)] font-bold mb-4 md:text-sm md:font-normal">{t("followUs")}</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const SocialIcon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-black/50 border border-[#F47A1F]/20 text-[#B6BDD6] ${social.color} hover:border-[#F47A1F]/40 hover:bg-black/80 transition-all duration-300`}
                        aria-label={social.label}
                      >
                        <SocialIcon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Form Card */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={isFormInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-3 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden bg-black/95 border border-[#F47A1F]/25 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F47A1F]/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-black/30 to-transparent rounded-tr-full" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#F47A1F] to-[#FFB85C] shadow-lg shadow-[#F47A1F]/30">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#F5F7FA] md:text-2xl">
                      {t("form.title")}
                    </h2>
                    <p className="text-[#8A91A8] text-[clamp(1.25rem,4vw,2.2rem)] font-bold">{t("form.subtitle")}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1 - Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] block md:text-sm md:font-medium">
                        {t("form.name")} <span className="text-[#F47A1F]">*</span>
                      </label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("form.namePlaceholder")} 
                        required 
                        className="h-12 rounded-xl border-[#F47A1F]/20 bg-black/60 focus:border-[#F47A1F] focus:ring-2 focus:ring-[#F47A1F]/20 text-[#F5F7FA] placeholder:text-[#8A91A8]/50 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] block md:text-sm md:font-medium">
                        {t("form.email")} <span className="text-[#F47A1F]">*</span>
                      </label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("form.emailPlaceholder")} 
                        required 
                        className="h-12 rounded-xl border-[#F47A1F]/20 bg-black/60 focus:border-[#F47A1F] focus:ring-2 focus:ring-[#F47A1F]/20 text-[#F5F7FA] placeholder:text-[#8A91A8]/50 transition-all"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Row 2 - Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] block md:text-sm md:font-medium">
                        {t("form.phone")} <span className="text-[#F47A1F]">*</span>
                      </label>
                      <Input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("form.phonePlaceholder")} 
                        required 
                        className="h-12 rounded-xl border-[#F47A1F]/20 bg-black/60 focus:border-[#F47A1F] focus:ring-2 focus:ring-[#F47A1F]/20 text-[#F5F7FA] placeholder:text-[#8A91A8]/50 transition-all" 
                        dir="ltr" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] block md:text-sm md:font-medium">
                        {t("form.subject")}
                      </label>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t("form.subjectPlaceholder")} 
                        className="h-12 rounded-xl border-[#F47A1F]/20 bg-black/60 focus:border-[#F47A1F] focus:ring-2 focus:ring-[#F47A1F]/20 text-[#F5F7FA] placeholder:text-[#8A91A8]/50 transition-all" 
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#B6BDD6] block">
                      {t("form.message")} <span className="text-[#F47A1F]">*</span>
                    </label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("form.messagePlaceholder")} 
                      required 
                      className="min-h-32 rounded-xl border-[#F47A1F]/20 bg-black/60 focus:border-[#F47A1F] focus:ring-2 focus:ring-[#F47A1F]/20 text-[#F5F7FA] placeholder:text-[#8A91A8]/50 resize-none transition-all" 
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#8A91A8] md:text-xs md:font-normal">
                      <span className="text-[#F47A1F]">*</span> {t("form.required")}
                    </p>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="h-12 px-8 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white shadow-lg shadow-[#F47A1F]/30 hover:shadow-[#F47A1F]/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("form.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t("form.submit")}
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                {/* Success Popup */}
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 
                                 flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 text-white shadow-lg shadow-emerald-500/30 backdrop-blur-sm"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-bold text-[clamp(1.25rem,4vw,2.2rem)] md:text-base md:font-medium">{t("form.success")}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map + Location Section */}
      <section className="relative z-10 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden shadow-2xl relative bg-black/90 border border-[#F47A1F]/20 backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Map placeholder / Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/trip-mountain.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Animated pin */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#F47A1F]/20 backdrop-blur-sm flex items-center justify-center border-2 border-[#F47A1F]">
                      <MapPin className="w-6 h-6 text-[#F47A1F]" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#F47A1F] rounded-full animate-ping" />
                  </div>
                </motion.div>
              </div>

              {/* Location info */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F47A1F]/20 flex items-center justify-center border border-[#F47A1F]/40">
                    <Compass className="w-5 h-5 text-[#F47A1F]" />
                  </div>
                  <h3 className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#F5F7FA] md:text-2xl">{t("map.title")}</h3>
                </div>
                
                <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] mb-6 leading-relaxed md:text-base md:font-normal">
                  {t("map.description")}
                </p>
                
                <div className="space-y-3 text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-sm md:font-normal">
                  <div className="flex items-center gap-3 text-[#B6BDD6]">
                    <MapPin className="w-4 h-4 text-[#F47A1F]" />
                    <span>{t("map.address")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#B6BDD6]">
                    <Clock className="w-4 h-4 text-[#F47A1F]" />
                    <span>{t("map.hours")}</span>
                  </div>
                </div>

                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-black/80 border border-[#F47A1F]/30 text-[#F5F7FA] font-medium hover:border-[#F47A1F]/60 hover:bg-black transition-all w-fit"
                >
                  <MapPin className="w-4 h-4" />
                  {t("map.openInMaps")}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-black/80 border border-[#F47A1F]/25 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#F47A1F]/20 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#FFB85C]/15 to-transparent rounded-tl-full" />
            
            {/* Floating stars */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-10 right-20 w-3 h-3 rounded-full bg-[#FFB85C]"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute bottom-16 left-16 w-2 h-2 rounded-full bg-[#F47A1F]"
            />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F47A1F]/10 border border-[#F47A1F]/30 mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#FFB85C]" />
                <span className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] md:text-sm md:font-normal">{t("cta.badge")}</span>
              </motion.div>

              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-4 text-[#F5F7FA]">
                {t("cta.title")} <span className="text-gradient-fire">{t("cta.titleHighlight")}</span>؟
              </h2>
              
              <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#B6BDD6] mb-10 max-w-xl mx-auto md:text-lg md:font-normal">
                {t("cta.subtitle")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a 
                  href="tel:+201234567890"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center h-14 px-8 rounded-2xl font-bold bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white shadow-[0_10px_30px_rgba(244,122,31,0.4)] hover:shadow-[0_15px_40px_rgba(244,122,31,0.5)] transition-all duration-300"
                >
                  <Phone className="w-5 h-5 ml-2" />
                  {t("cta.callNow")}
                </motion.a>
                
                <motion.a 
                  href="https://wa.me/201234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center h-14 px-8 rounded-2xl font-bold bg-transparent border-2 border-[#F47A1F]/50 text-[#F5F7FA] hover:bg-[#F47A1F]/10 hover:border-[#F47A1F] transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  {t("cta.whatsapp")}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />
      <Footer />
    </div>
  );
};

export default Contact;
