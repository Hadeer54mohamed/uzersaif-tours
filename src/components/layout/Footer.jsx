"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showPopup, setShowPopup] = useState(false);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const handleSubmit = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  useEffect(() => {
    setStars(generateStars(60));
    setMeteors(generateMeteors(3, { delayMultiplier: 6, baseRepeatDelay: 15 }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const quickLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/Trips", label: "الرحلات" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "تواصل معنا" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:bg-[#1877F2]",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color:
        "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* 🌌 خلفية فضائية غامقة */}
      <div className="absolute inset-0 footer-bg" />

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

      {/* توهج زخرفي */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-20 glow-purple" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-15 glow-fire" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-4 pb-4 sm:pt-6 sm:pb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {/* Logo & Description */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 lg:col-span-1"
          >
            <Link href="/" className="inline-block group">
              <img
                src="/logo.png"
                alt="Uzersaif"
                className="h-25 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-secondary">
              نقدم لك أفضل تجارب السفر والرحلات السياحية المميزة. استمتع برحلات
              لا تُنسى في أجمل المناطق الطبيعية.
            </p>
            <div className="pt-1">
              <p className="font-medium text-sm mb-2 text-primary">
                تواصل معنا
              </p>
              <div className="pt-1 relative">
                <div className="flex gap-2">
                  <motion.input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="flex-1 min-w-0 rounded-xl px-4 py-2.5 text-sm placeholder:opacity-50 focus:outline-none transition-all backdrop-blur-sm input-cosmic"
                    whileFocus={{
                      scale: 1.02,
                    }}
                  />

                  <motion.button
                    onClick={handleSubmit}
                    className="p-2.5 rounded-xl transition-all btn-fire"
                    whileHover={{
                      scale: 1.1,
                    }}
                  >
                    <Send size={18} className="text-primary" />
                  </motion.button>
                </div>

                {/* Popup */}
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute bottom-[-55px] left-1/2 -translate-x-1/2 text-sm px-4 py-2 rounded-xl shadow-lg btn-fire pointer-events-none"
                      role="status"
                      aria-live="polite"
                    >
                      التفاصيل هتوصلك على بريدك ❤️
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:pr-8">
            <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2 text-primary">
              <span className="title-accent" />
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm transition-all duration-300 text-secondary"
                  >
                    <ChevronLeft
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-fire"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 hover:text-fire">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2 text-primary">
              <span className="title-accent" />
              تواصل معنا
            </h3>
            <ul className="space-y-2">
              {[
                {
                  icon: Phone,
                  label: "+20 123 456 7890",
                  href: "tel:+201234567890",
                },
                {
                  icon: Mail,
                  label: "info@uzersaif.com",
                  href: "mailto:info@uzersaif.com",
                },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2 transition-all text-secondary"
                  >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 backdrop-blur-sm icon-container">
                      <item.icon size={16} className="icon-fire" />
                    </span>
                    <span className="text-sm hover:text-fire transition-colors">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <div className="group flex items-center gap-2 text-secondary">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm icon-container">
                    <MapPin size={16} className="icon-fire" />
                  </span>
                  <span className="text-sm">القاهرة، مصر</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2 text-primary">
              <span className="title-accent" />
              تابعنا
            </h3>
            <p className="text-sm mb-3 text-muted">
              تابعنا على منصات التواصل الاجتماعي لمعرفة آخر العروض والرحلات
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`group relative w-11 h-11 rounded-xl flex items-center justify-center
                               bg-[#1B2A4A]/60 border border-[#F47A1F]/25
                               text-[#B6BDD6] overflow-hidden
                               hover:text-white hover:border-transparent
                               transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    {/* خلفية متحركة عند الـ hover */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <SocialIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="mt-6 mb-3 sm:mt-8 sm:mb-4 h-px section-divider-fire" />

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-sm flex items-center gap-2 text-muted" dir="rtl">
            © {currentYear} &nbsp; جميع الحقوق محفوظة
            <span className="font-semibold text-gradient-fire" dir="ltr">
              UzerSaif
            </span>
          </p>

          <span
            className="text-sm flex items-center gap-1 text-muted"
            dir="ltr"
          >
            Designed & Developed by
            <a
              href="https://www.facebook.com/ENSEGYPTEG"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline transition-colors text-fire"
            >
              ENS
            </a>
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
