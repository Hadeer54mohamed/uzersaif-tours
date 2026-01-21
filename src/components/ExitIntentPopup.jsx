"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const ExitIntentPopup = () => {
  const t = useTranslations("exitIntentPopup");
  const [showPopup, setShowPopup] = useState(false);
  const hasShownRef = useRef(false);
  const isEnabledRef = useRef(false);

  const phoneNumber = "201069836767";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t("whatsappMessage"))}`;

  useEffect(() => {
    const handleMouseLeave = () => {
      if (isEnabledRef.current && !hasShownRef.current) {
        hasShownRef.current = true;
        setShowPopup(true);
      }
    };

    const timer = setTimeout(() => {
      isEnabledRef.current = true;
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      hasShownRef.current = false;
    }, 2000);
  };

  return (
    <AnimatePresence>
    {showPopup && (
      <>
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
          onClick={closePopup}
        />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 40 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          z-[9999] w-[92%] max-w-sm"
          dir="rtl"
        >
          <div className="relative overflow-hidden rounded-2xl 
          bg-gradient-to-b from-black/95 to-[#0D1324]/95
          border border-[#F47A1F]/30 
          shadow-2xl shadow-[#F47A1F]/25 backdrop-blur-lg">

            {/* Close */}
            <button
              onClick={closePopup}
              className="absolute top-3 left-3 z-10 
              w-8 h-8 rounded-full 
              bg-white/10 hover:bg-white/20 
              flex items-center justify-center transition"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Content */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-black text-[#F5F7FA] mb-3">
                {t("title")}
              </h2>

              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">
                {t("description")}
              </p>

              <ul className="text-sm text-[#B6BDD6] space-y-1 mb-6">
                <li>• {t("reason1")}</li>
                <li>• {t("reason2")}</li>
                <li>• {t("reason3")}</li>
              </ul>

              {/* CTA */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r 
                from-emerald-500 to-emerald-400
                text-white font-black py-3 rounded-xl 
                shadow-lg shadow-emerald-500/30
                flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                {t("askButton")}
              </motion.a>

              <p className="text-[11px] text-[#8A91A8] mt-3">
                {t("saveNote")}
              </p>
            </div>

            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 
            bg-[#F47A1F]/20 blur-[50px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 
            bg-purple-600/20 blur-[50px] pointer-events-none" />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  );
};

export default ExitIntentPopup;