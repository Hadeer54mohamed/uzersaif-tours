"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
import { dummyTrips } from "@/lib/dummyTrips";

const PriceAction = () => {
  const t = useTranslations("priceAction");
  const tTrip = useTranslations("desertTrip");
  const tTripForYou = useTranslations("tripForYou");

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
    <section className=" relative" dir="rtl" >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F47A1F]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#F47A1F]/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
           {/* Bedouin Message Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto" 
         
        >
          <div id="booking" className="scroll-mt-24 relative p-6 sm:p-8 rounded-2xl border border-[#F47A1F]/30 bg-gradient-to-br from-[#F47A1F]/10 to-[#F47A1F]/5 backdrop-blur-md text-white ">
            {/* Orange Glow Background */}
            <div   className="absolute inset-0 rounded-2xl bg-[#F47A1F]/5 blur-xl pointer-events-none" />
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 opacity-20">
            </div>
            
            {/* Stars decoration */}
            <div  className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-2 left-8 w-1 h-1 bg-[#F47A1F]/40 rounded-full" />
              <div className="absolute top-6 left-16 w-1.5 h-1.5 bg-[#F47A1F]/30 rounded-full" />
              <div className="absolute bottom-4 right-20 w-1 h-1 bg-[#F47A1F]/40 rounded-full" />
              <div className="absolute bottom-8 left-12 w-1 h-1 bg-[#F47A1F]/30 rounded-full" />
            </div>

            <div  className="relative z-10 text-center">
              <h4  className="text-[clamp(1.5rem,5vw,3rem)] font-bold mb-4 text-[#F47A1F] md:text-2xl">
                {tTripForYou("bedouinBox.title")}
              </h4>
              <p className="text-white/90 leading-relaxed mb-4 text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-base md:font-normal">
                {tTripForYou("bedouinBox.line1")}
              </p>
              <p className="text-white/90 leading-relaxed text-[clamp(1.25rem,4vw,2.2rem)] font-bold">
                {tTripForYou("bedouinBox.line2")}
              </p>
              <p className="mt-4 text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#F47A1F] flex items-center justify-center gap-2 md:text-xl md:font-black">
                <span>{tTripForYou("bedouinBox.welcome")}</span>
              </p>
            </div>
          </div>
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

              {/* Foreigner Price */}
              <div className="pt-4 mt-4 border-t border-black/20">
                <p className="text-black/70 font-bold text-sm mb-2">{tTrip("foreignerPriceLabel")}</p>
                <div className="text-4xl md:text-5xl font-black text-black">
                  {tTrip("foreignerPrice")}
                </div>
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
          
          {/* Subscribe Note */}
          <div className="w-full bg-[#F47A1F]/10 backdrop-blur-sm border border-[#F47A1F]/30 rounded-xl p-4 sm:p-5">
            <p className="text-[#FFB85C] font-bold text-[clamp(1rem,3.5vw,1.5rem)] md:text-sm text-center leading-relaxed">
              {t("subscribeNow")}
            </p>
          </div>

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
          {/* <motion.div
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
 */}
          {/* Main CTA Button */}
       {/*    <motion.div
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
              className="w-full bg-gradient-to-r from-[#25D366] to-[#21BA5A] text-white font-black py-5 px-8 rounded-2xl shadow-lg shadow-[#25D366]/40 text-xl flex items-center justify-center transition-all hover:shadow-[#25D366]/60 hover:brightness-110"
            >
              <motion.div
                animate={{ x: [0, -6, 6, -6, 6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1"
              >
                <span className="flex items-center gap-3 font-black text-xl">
                  <WhatsAppIcon size={28} />
                  {t("mainButton")}
                </span>
                <span className="text-black text-sm font-bold flex items-center gap-5">
                  <span>-</span>
                  {t("limitedSpots")}
                  <span>-</span>
                </span>
              </motion.div>
            </motion.a>

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
          </motion.div> */}

        </div>
      </div>
    </section>
  );
};

export default PriceAction;
