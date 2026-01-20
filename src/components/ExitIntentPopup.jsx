"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles, Users, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const ExitIntentPopup = () => {
  const t = useTranslations("exitIntentPopup");
  const [showPopup, setShowPopup] = useState(false);
  const hasShownRef = useRef(false);
  const isEnabledRef = useRef(false);

  const tripData = {
    title: t("tripTitle"),
    price: "6,499",
    originalPrice: "9,800",
    discountAmount: "3,300",
    discountCode: "Frafra",
  };

  const phoneNumber = "201069836767";
  const message = t("whatsappMessage");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={closePopup}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-sm"
            dir="rtl"
          >
            <div className="relative overflow-hidden rounded-2xl bg-black/95 border-2 border-[#F47A1F]/40 shadow-2xl shadow-[#F47A1F]/20 backdrop-blur-md">
              
              {/* زر الإغلاق */}
              <button
                onClick={closePopup}
                className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* شريط العرض */}
              <div className="bg-gradient-to-r from-[#F47A1F] via-[#FFB85C] to-[#F47A1F] py-2 px-4">
                <div className="flex items-center justify-center gap-2 text-black font-black text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>{t("lastChance")}</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 text-center">
                {/* أيقونة + العنوان */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F47A1F] to-[#FFB85C] flex items-center justify-center shadow-lg shadow-[#F47A1F]/40"
                  >
                    <Gift className="w-6 h-6 text-black" />
                  </motion.div>
                  <div className="text-right">
                    <h2 className="text-lg font-black text-[#F5F7FA]">
                      {t("discount")} <span className="text-[#F47A1F]">{tripData.discountAmount}</span> {t("currency")}
                    </h2>
                    <p className="text-xs text-[#B6BDD6] font-bold">{tripData.title}</p>
                  </div>
                </div>

                {/* السعر */}
                <div className="bg-[#F47A1F]/10 border border-[#F47A1F]/30 rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-[#8A91A8] line-through text-sm font-bold">
                      {tripData.originalPrice}
                    </span>
                    <span className="text-2xl font-black text-[#F5F7FA]">
                      {tripData.price}
                      <span className="text-sm font-bold text-[#F47A1F] mr-1">{t("currency")}</span>
                    </span>
                  </div>
                  <p className="text-[#F47A1F] font-bold text-xs mt-1">
                    {t("code")}: <span className="text-[#FFB85C]">{tripData.discountCode}</span>
                  </p>
                </div>

                {/* الأماكن المتبقية + Progress */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Users className="text-[#F47A1F] w-4 h-4" />
                  <span className="text-xs text-[#B6BDD6] font-bold">{t("remaining")}</span>
                  <span className="text-sm font-black text-[#F47A1F]">4</span>
                  <span className="text-xs text-[#8A91A8]">{t("spots")}</span>
                </div>

                <div className="w-full bg-white/5 h-1 rounded-full mb-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#F47A1F] to-[#FFB85C]"
                  />
                </div>

                {/* زر واتساب */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-black py-3 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle size={20} />
                  {t("bookNow")}
                </motion.a>

                <p className="text-[10px] text-[#8A91A8] mt-2">
                  {t("deposit")}
                </p>
              </div>

              {/* توهجات */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#F47A1F]/20 blur-[40px] pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-600/20 blur-[40px] pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
