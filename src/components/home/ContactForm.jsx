"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

// Confetti Component
function Confetti() {
  const colors = ["#F47A1F", "#22c55e", "#FFB85C", "#4ade80", "#fff", "#ffd700"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    size: 8 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.left}vw`, rotate: 0, opacity: 1 }}
          animate={{
            y: "110vh",
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

// Success Modal Component
function SuccessModal({ onClose, t }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-[rgba(244,122,31,0.4)] rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#22c55e] to-[#4ade80] flex items-center justify-center"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-12 h-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-white mb-3"
        >
          {t("successTitle")}
        </motion.h3>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-8"
        >
          {t("successMessage")}
        </motion.p>

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-8 py-3 bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white font-bold rounded-xl hover:shadow-[0_10px_30px_rgba(244,122,31,0.4)] transition-all"
        >
          {t("successButton")}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // دالة التحقق من الحقول
  function validateForm(formData) {
    const errors = {};
    
    if (!formData.get("nationality")) {
      errors.nationality = t("validation.nationality");
    }
    if (!formData.get("fullName")?.trim()) {
      errors.fullName = t("validation.fullName");
    }
    if (!formData.get("email")?.trim()) {
      errors.email = t("validation.email");
    }
    if (!formData.get("phone")?.trim()) {
      errors.phone = t("validation.phone");
    }
    if (!formData.get("tripDate")) {
      errors.tripDate = t("validation.tripDate");
    }
    if (!formData.get("comingWith")) {
      errors.comingWith = t("validation.comingWith");
    }
    if (!formData.get("depositReady")) {
      errors.depositReady = t("validation.depositReady");
    }
    
    return errors;
  }

  const tripDateOptions = [
    { value: t("tripDates.jan29"), label: t("tripDates.jan29") },
    { value: t("tripDates.nov13"), label: t("tripDates.nov13") },
    { value: t("tripDates.notDecided"), label: t("tripDates.notDecided") },
  ];

  const comingWithOptions = [
    { value: t("comingWithOptions.alone"), label: t("comingWithOptions.alone") },
    { value: t("comingWithOptions.withSomeone"), label: t("comingWithOptions.withSomeone"), default: true },
    { value: t("comingWithOptions.smallGroup"), label: t("comingWithOptions.smallGroup") },
  ];

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    const data = {
      nationality: formData.get("nationality"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      tripDate: formData.get("tripDate"),
      comingWith: formData.get("comingWith") || "مع شخص",
      notes: formData.get("notes"),
      depositReady: formData.get("depositReady"),
    };

    // إرسال البيانات كـ URL-encoded form data
    const formBody = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      formBody.append(key, value || "");
    });

    fetch("https://script.google.com/macros/s/AKfycbzo4rJYKhg_TmDTIAJIA5A33bKrzno8kWZBTp3-kfAQjqgX85OmxwckhC_zz-_bqNRL6A/exec", {
      method: "POST",
      mode: "no-cors",
      body: formBody,
    })
      .then(() => {
        setShowSuccess(true);
        setShowConfetti(true);
        setError(false);
        form.reset();
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCloseSuccess() {
    setShowSuccess(false);
  }

  const inputStyles = `
    w-full px-4 py-3 rounded-xl
    bg-black/50 border border-[rgba(244,122,31,0.3)]
    text-white placeholder:text-gray-500
    focus:outline-none focus:border-[#F47A1F] focus:shadow-[0_0_12px_rgba(244,122,31,0.5)]
    transition-all duration-300
  `;

  const labelStyles = "flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white transition-colors";

  const radioStyles = `
    w-5 h-5 appearance-none rounded-full border-2 border-[rgba(244,122,31,0.5)]
    checked:bg-[#F47A1F] checked:border-[#F47A1F]
    transition-all duration-200 cursor-pointer
    relative
    checked:after:content-[''] checked:after:absolute checked:after:inset-[3px]
    checked:after:bg-white checked:after:rounded-full
  `;

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && <SuccessModal onClose={handleCloseSuccess} t={t} />}
      </AnimatePresence>

      <section id="contact-form" className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-fire  mb-4">
                {t("sectionTitle")}
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="card-cosmic rounded-2xl p-6 md:p-8 space-y-6"
            >
              <div>
                <label className="block text-white mb-2 font-medium">{t("nationality")}</label>
                <select name="nationality" required className={`${inputStyles} ${fieldErrors.nationality ? 'border-red-500' : ''}`}>
                  <option value="" className="bg-black">{t("selectNationality")}</option>
                  <option value={t("egyptian")} className="bg-black">{t("egyptian")}</option>
                  <option value={t("nonEgyptian")} className="bg-black">{t("nonEgyptian")}</option>
                </select>
                {fieldErrors.nationality && <p className="text-red-500 text-sm mt-1">{fieldErrors.nationality}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">{t("fullName")}</label>
                <input
                  name="fullName"
                  required
                  placeholder={t("fullNamePlaceholder")}
                  className={`${inputStyles} ${fieldErrors.fullName ? 'border-red-500' : ''}`}
                />
                {fieldErrors.fullName && <p className="text-red-500 text-sm mt-1">{fieldErrors.fullName}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">{t("email")}</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className={`${inputStyles} ${fieldErrors.email ? 'border-red-500' : ''}`}
                  dir="ltr"
                />
                {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">{t("phone")}</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder={t("phonePlaceholder")}
                  className={`${inputStyles} ${fieldErrors.phone ? 'border-red-500' : ''}`}
                  dir="ltr"
                />
                {fieldErrors.phone && <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-white mb-3 font-medium">{t("tripDate")}</label>
                <div className="space-y-3">
                  {tripDateOptions.map((option) => (
                    <label key={option.value} className={labelStyles}>
                      <input
                        type="radio"
                        name="tripDate"
                        value={option.value}
                        required
                        className={radioStyles}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.tripDate && <p className="text-red-500 text-sm mt-1">{fieldErrors.tripDate}</p>}
              </div>

              <div>
                <label className="block text-white mb-3 font-medium">
                  {t("comingWith")}
                </label>
                <div className="space-y-3">
                  {comingWithOptions.map((option) => (
                    <label key={option.value} className={labelStyles}>
                      <input
                        type="radio"
                        name="comingWith"
                        value={option.value}
                        required
                        className={radioStyles}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.comingWith && <p className="text-red-500 text-sm mt-1">{fieldErrors.comingWith}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">{t("notes")}</label>
                <textarea
                  name="notes"
                  placeholder={t("notesPlaceholder")}
                  rows={4}
                  className={inputStyles + " resize-none"}
                />
              </div>

              <div className={`bg-[rgba(244,122,31,0.1)] rounded-xl p-4 border ${fieldErrors.depositReady ? 'border-red-500' : 'border-[rgba(244,122,31,0.2)]'}`}>
                <label className="block text-white mb-3 font-medium">
                  {t("depositQuestion")} <span className="text-[#F47A1F]">{t("depositAmount")}</span> {t("afterContact")}
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className={labelStyles}>
                    <input
                      type="radio"
                      name="depositReady"
                      value={t("yes")}
                      required
                      className={radioStyles}
                    />
                    <span>{t("yes")}</span>
                  </label>
                  <label className={labelStyles}>
                    <input
                      type="radio"
                      name="depositReady"
                      value={t("needToAsk")}
                      className={radioStyles}
                    />
                    <span>{t("needToAsk")}</span>
                  </label>
                </div>
                {fieldErrors.depositReady && <p className="text-red-500 text-sm mt-1">{fieldErrors.depositReady}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-[#22c55e] to-[#4ade80] hover:shadow-[0_10px_30px_rgba(34,197,94,0.4)] text-white disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t("submitting")}
                  </span>
                ) : (
                  t("submitButton")
                )}
              </motion.button>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-center"
                  >
                    {t("errorMessage")}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
