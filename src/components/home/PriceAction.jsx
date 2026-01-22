"use client";

import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { dummyTrips } from "@/lib/dummyTrips";

const PriceAction = () => {
  const t = useTranslations("priceAction");
  const tTrip = useTranslations("desertTrip");

  // Get trip data
  const trip = dummyTrips[0];
  const tripKey = trip.translationKey;

  const phoneNumber = "201069836767";
  const tripTitle = tTrip(`trips.${tripKey}.title`);
  const message = tTrip("whatsappMessage", { title: tripTitle });
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const askQuestionMessage = t("askQuestionMessage");
  const askQuestionUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(askQuestionMessage)}`;

  const afterBookingItems = [
    { key: "contact", text: t("afterBooking.contact") },
    { key: "details", text: t("afterBooking.details") },
    { key: "cancel", text: t("afterBooking.cancel") },
  ];

  return (
    <section className=" relative" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F47A1F]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#F47A1F]/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#F5F7FA] leading-relaxed">
              {t("introLine1")}
              <br />
              <span className="text-[#F47A1F]">{t("introLine2")}</span>
              <br />
              {t("introLine3")}
            </h2>
          </motion.div>

          {/* Price Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#F47A1F] to-[#FFB85C] rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-[#F47A1F]/30"
          >
            {/* Glow Effect */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 blur-[60px]" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 blur-[60px]" />

            <div className="relative z-10 text-center space-y-5">
              {/* Discount Badge */}
              <div className="inline-block mx-auto px-6 py-2 border border-black/30 rounded-full text-2xl font-black bg-black text-white">
                {tTrip("discount")} {tTrip(`trips.${tripKey}.discountAmount`)}
              </div>

              {/* Coupon Code */}
              <p className="text-black font-black text-lg">
                {tTrip("useCode")} <span className="underline">{trip.discountCode}</span>
              </p>

              {/* Small Note */}
              <p className="text-sm font-bold text-black/70">
                {tTrip("priceAfterDiscount")}
              </p>

              {/* Price */}
              <div className="text-5xl md:text-6xl font-black text-black">
                {trip.price}
                <span className="text-xl font-bold text-black/80 mr-2">{tTrip("currency")}</span>
              </div>

              {/* Old Price */}
              <div className="text-xl font-black text-black/60 line-through">
                {tTrip("insteadOf")} {trip.originalPrice} {tTrip("currency")}
              </div>

              {/* Price Includes Note */}
              <div className="pt-4 border-t border-black/20">
                <p className="text-black/80 font-bold text-base leading-relaxed">
                  {t("priceIncludes")}
                  <br />
                  <span className="text-black">{t("priceIncludesDetail")}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Booking Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5 sm:p-6"
          >
            <h3 className="text-xl font-black text-[#F5F7FA] mb-4 text-center">{t("bookingMethodTitle")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 bg-white/5 rounded-xl border border-[#F47A1F]/10 text-center">
                <span className="text-[#8A91A8] font-bold text-sm block mb-1">{tTrip("deposit")}</span>
                <span className="text-lg font-black text-[#F47A1F]">{trip.bookingSteps.deposit}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-[#F47A1F]/10 text-center">
                <span className="text-[#8A91A8] font-bold text-sm block mb-1">{tTrip("payment")}</span>
                <span className="font-black text-[#F5F7FA] text-sm">{trip.bookingSteps.method}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-[#F47A1F]/10 text-center">
                <span className="text-[#8A91A8] font-bold text-sm block mb-1">{tTrip("number")}</span>
                <span className="font-black text-[#F47A1F] text-lg">{trip.bookingSteps.number}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-[#F47A1F]/10 text-center">
                <span className="text-[#8A91A8] font-bold text-sm block mb-1">{tTrip("account")}</span>
                <span className="font-black text-[#F5F7FA] text-sm">{trip.bookingSteps.accountName}</span>
              </div>
            </div>
          </motion.div>

          {/* After Booking Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6"
          >
            <h3 className="text-xl font-black text-[#F5F7FA] mb-4">{t("afterBooking.title")}</h3>
            <div className="space-y-3">
              {afterBookingItems.map((item, idx) => (
                <div key={item.key} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[#B6BDD6] font-bold text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emotional Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-4 py-4"
          >
            <p className="text-[#8A91A8] font-bold text-base leading-relaxed">
              {t("askQuestion")}
            </p>
            <p className="text-[#B6BDD6] font-bold text-base leading-relaxed">
              {t("feelingCalm")}
              <br />
              <span className="text-[#F47A1F]">{t("notCoincidence")}</span>
            </p>
          </motion.div>

          {/* Main CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white font-black py-5 px-8 rounded-2xl shadow-lg shadow-[#F47A1F]/40 text-xl flex items-center justify-center gap-3 transition-all hover:shadow-[#F47A1F]/60 hover:brightness-110"
            >
              <MessageCircle size={28} />
              {t("mainButton")}
              <ArrowLeft size={24} />
            </motion.a>

            {/* Secondary Link */}
            <motion.a
              href={askQuestionUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              className="block text-center"
            >
              <p className="text-[#8A91A8] font-bold text-sm hover:text-[#F47A1F] transition-colors cursor-pointer underline underline-offset-4">
                {t("secondaryLink")}
              </p>
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PriceAction;
