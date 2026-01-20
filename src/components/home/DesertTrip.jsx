"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { dummyTrips } from "@/lib/dummyTrips";
import { Users, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const BookingCard = ({ selectedTrip, t, tripTitle }) => {
  const phoneNumber = "201069836767";
  const message = t("whatsappMessage", { title: tripTitle });
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const remainingSeats = 4;

  return (
    <div className="bg-[#F47A1F]/10 backdrop-blur-md border border-[#F47A1F]/30 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">

      {/*  Counter */}
      <div className="flex items-center justify-between mb-4 bg-black/20 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <Users className="text-orange-500 w-5 h-5" />
          <span className="text-sm text-gray-300 font-bold">{t("remainingSeats")}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-orange-500">{remainingSeats}</span>
          <span className="text-xs text-gray-500">{t("of")} 14</span>
        </div>
      </div>

      <div className="w-full bg-white/5 h-1.5 rounded-full mb-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          className="h-full bg-gradient-to-r from-orange-600 to-amber-400"
        />
      </div>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="
    w-full
    bg-gradient-to-r from-emerald-500 to-emerald-400
    text-white
    font-black
    py-4 px-8
    rounded-xl
    shadow-lg shadow-emerald-500/40
    text-lg
    flex items-center justify-center gap-3
    transition-all
    hover:shadow-emerald-500/60
    hover:brightness-110
  "
      >
        <MessageCircle size={24} />
        {t("bookNow")}
      </motion.a>


      <div className="mt-4 flex flex-col gap-1 text-center">
        <p className="text-xs text-[#8A91A8] font-bold">
          {t("bookingConfirm")} {selectedTrip.bookingSteps?.deposit}
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <p className="text-[10px] text-emerald-500/80 font-medium">{t("availableNow")}</p>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-600/10 blur-2xl rounded-full pointer-events-none" />
    </div>
  );
};

const DesertTrip = () => {
  const t = useTranslations("desertTrip");
  const [selectedTripId, setSelectedTripId] = useState(dummyTrips[0]?._id);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get translated trip data
  const getTripData = (trip) => {
    const key = trip.translationKey;
    return {
      ...trip,
      title: t(`trips.${key}.title`),
      location: t(`trips.${key}.location`),
      duration: t(`trips.${key}.duration`),
      discountAmount: t(`trips.${key}.discountAmount`),
      gathering: trip.gatheringIcons.map((icon, i) => ({
        icon,
        text: t(`trips.${key}.gathering.${i}`),
      })),
      itinerary: [
        {
          day: t(`trips.${key}.itinerary.day1.title`),
          activities: trip.itineraryIcons.day1.map((icon, i) => ({
            icon,
            text: t(`trips.${key}.itinerary.day1.activities.${i}`),
          })),
        },
        {
          day: t(`trips.${key}.itinerary.day2.title`),
          activities: trip.itineraryIcons.day2.map((icon, i) => ({
            icon,
            text: t(`trips.${key}.itinerary.day2.activities.${i}`),
          })),
        },
        {
          day: t(`trips.${key}.itinerary.day3.title`),
          activities: trip.itineraryIcons.day3.map((icon, i) => ({
            icon,
            text: t(`trips.${key}.itinerary.day3.activities.${i}`),
          })),
        },
      ],
      guarantees: [
        {
          title: t(`trips.${key}.guarantees.food.title`),
          items: [
            t(`trips.${key}.guarantees.food.items.0`),
            t(`trips.${key}.guarantees.food.items.1`),
          ],
        },
        {
          title: t(`trips.${key}.guarantees.sleep.title`),
          items: [
            t(`trips.${key}.guarantees.sleep.items.0`),
            t(`trips.${key}.guarantees.sleep.items.1`),
          ],
        },
        {
          title: t(`trips.${key}.guarantees.cancellation.title`),
          items: [
            t(`trips.${key}.guarantees.cancellation.items.0`),
            t(`trips.${key}.guarantees.cancellation.items.1`),
          ],
        },
        {
          title: t(`trips.${key}.guarantees.safety.title`),
          items: [
            t(`trips.${key}.guarantees.safety.items.0`),
            t(`trips.${key}.guarantees.safety.items.1`),
          ],
        },
      ],
    };
  };

  // Get translated trips (recalculated when t changes - i.e., when language changes)
  const trips = dummyTrips.map(getTripData);
  const selectedTrip = trips.find(trip => trip._id === selectedTripId) || trips[0];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingSkeleton t={t} />;

  return (
    <div className="py-8 relative" dir="rtl">
      <div className="container mx-auto px-4 lg:px-6 relative z-10">


        <AnimatePresence mode="wait">
          {selectedTrip && (
            <motion.div
              key={selectedTripId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              {/* Hero Image */}
              <div className="relative h-[280px] md:h-[400px] rounded-2xl overflow-hidden border border-[#F47A1F]/20 shadow-xl shadow-[#F47A1F]/10">
                <img src={selectedTrip.image} className="w-full h-full object-cover" alt={selectedTrip.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#F47A1F]/30 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#F47A1F]/30 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#F47A1F]/30 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#F47A1F]/30 rounded-br-2xl" />
                <div className="absolute bottom-6 right-6 left-6 text-white">
                  <div className="flex gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#F47A1F] to-[#FFB85C]">{selectedTrip.duration}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md border border-[#F47A1F]/30">{selectedTrip.location}</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-black text-[#F5F7FA]">{selectedTrip.title}</h1>
                </div>
              </div>

              {/* البرنامج + التجمع */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5">
                  <h3 className="text-xl font-black text-[#F5F7FA] mb-4">{t("gatheringPoints")}</h3>
                  <div className="space-y-2">
                    {selectedTrip.gathering?.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start p-3 bg-white/5 rounded-lg border border-[#F47A1F]/10">
                        <div className="w-2 h-2 rounded-full bg-[#F47A1F] mt-1.5 flex-shrink-0"></div>
                        <p className="text-[#B6BDD6] font-bold text-sm leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-[#F5F7FA]">{t("tripProgram")}</h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {selectedTrip.itinerary?.map((day, idx) => (
                      <AccordionItem key={idx} value={`day-${idx}`} className="border-[#F47A1F]/10 bg-black/80 rounded-xl px-3 backdrop-blur-sm">
                        <AccordionTrigger className="text-[#F5F7FA] hover:no-underline font-black text-sm hover:text-[#F47A1F] py-3">
                          {day.day}
                        </AccordionTrigger>
                        <AccordionContent className="pb-3">
                          <div className="space-y-2 pr-3 border-r-2 border-[#F47A1F]/30">
                            {day.activities?.map((act, i) => (
                              <div key={i} className="flex gap-2 text-[#B6BDD6] text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F47A1F] mt-1.5 flex-shrink-0"></span>
                                <span className="font-bold">{act.text}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Booking + Price */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" id="booking">
                <BookingCard selectedTrip={selectedTrip} t={t} tripTitle={selectedTrip.title} />

                <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center">

                  {/* glow */}
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#F47A1F]/10 blur-[60px]" />

                  <div className="relative z-10 text-center space-y-4">

                    {/* discount amount (top like image) */}
                    <div className="
  inline-block mx-auto
  px-6 py-2
  border border-[#F5F7FA]/30
  rounded-full
  text-2xl font-black
  bg-gradient-to-r from-[#F47A1F] via-[#FFB85C] to-[#F47A1F]
  bg-clip-text text-transparent
  drop-shadow-[0_0_12px_rgba(255,184,92,0.35)]
">
                      {t("discount")} {selectedTrip.discountAmount}
                    </div>

                    {/* coupon code */}
                    <p className="text-[#F47A1F] font-black text-lg">
                      {t("useCode")} <span className="underline">{selectedTrip.discountCode}</span>
                    </p>

                    {/* small note */}
                    <p className="text-sm font-bold text-[#8A91A8]">
                      {t("priceAfterDiscount")}
                    </p>

                    {/* price */}
                    <div className="text-5xl font-black text-[#F5F7FA]">
                      {selectedTrip.price}
                      <span className="text-xl font-bold text-[#F47A1F] mr-2">{t("currency")}</span>
                    </div>

                    {/* old price */}
                    <div className="text-xl font-black text-[#8A91A8] line-through">
                      {t("insteadOf")} {selectedTrip.originalPrice} {t("currency")}
                    </div>

                  </div>
                </div>
              </div>


              {/* طريقة الحجز */}
              {selectedTrip.bookingSteps && (
                <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5">
                  <h3 className="text-xl font-black text-[#F5F7FA] mb-4">{t("bookingMethod")}</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-5">
                    <div className="p-7 bg-white/5 rounded-xl border border-[#F47A1F]/10 text-center">
                      <span className="text-[#8A91A8] font-bold text-xl block mb-1">{t("deposit")}</span>
                      <span className="text-xl font-black text-[#F47A1F] text-xl">{selectedTrip.bookingSteps.deposit}</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-[#F47A1F]/10 text-center">
                      <span className="text-[#8A91A8] font-bold text-xl block mb-1">{t("payment")}</span>
                      <span className="font-black text-[#F5F7FA] text-xl">{selectedTrip.bookingSteps.method}</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-[#F47A1F]/10 text-center">
                      <span className="text-[#8A91A8] font-bold text-xl block mb-1">{t("number")}</span>
                      <span className="font-black text-[#F47A1F] text-xl">{selectedTrip.bookingSteps.number}</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-[#F47A1F]/10 text-center">
                      <span className="text-[#8A91A8] font-bold text-xl block mb-1">{t("account")}</span>
                      <span className="font-black text-[#F5F7FA] text-xl">{selectedTrip.bookingSteps.accountName}</span>
                    </div>
                  </div>
                  {/* ملاحظة */}
                  <div className="
  py-5 px-4
  bg-gradient-to-r from-[#FFB85C]/15 to-[#F47A1F]/15
  border border-[#FFB85C]/30
  rounded-xl
  backdrop-blur-sm
  text-center
  space-y-1.5
  cursor-pointer
  transition-all duration-300
  hover:scale-[1.03]
  hover:shadow-[0_0_25px_rgba(255,184,92,0.25)]
">
                    <span className="
    block
    text-white
    font-extrabold
    text-base
  ">
                      {t("subscribeNow")}
                    </span>

                    <p className="text-[#FFB85C] font-semibold text-xs">
                      {t("importantNote")}
                    </p>
                  </div>

                  {/* زر الواتساب */}
                  <motion.a
                    href={`https://wa.me/201069836767?text=${encodeURIComponent(t("whatsappMessage", { title: selectedTrip.title }))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-black py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/40 text-lg flex items-center justify-center gap-3 transition-all hover:shadow-emerald-500/60 hover:brightness-110"
                  >
                    <MessageCircle size={24} />
                    {t("bookNow")}
                  </motion.a>
                </div>
              )}



              {/* الضمانات */}
              {selectedTrip.guarantees && (
                <div>
                  <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold mb-6 text-primary text-center">
                    {t("guaranteeTitle")}
                  </h2>

                  <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-[#F47A1F]/20">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
                      {/* بقية الضمانات */}
                      {selectedTrip.guarantees.map((g, i) => (
                        <div key={i} className="transition-transform hover:scale-105">
                          <h4 className="text-sm font-black text-[#F47A1F] mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#F47A1F]"></span>
                            {g.title}
                          </h4>
                          <ul className="space-y-2 pr-4">
                            {g.items.map((item, idx) => (
                              <li key={idx} className="flex gap-2 text-[#B6BDD6] items-start">
                                <span className="w-2 h-2 rounded-full bg-emerald-300 mt-1 flex-shrink-0"></span>
                                <span className="font-bold text-xs text-white">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-2 lg:col-span-1 bg-emerald-500/50 backdrop-blur-lg rounded-xl p-5 border border-white/20 flex items-center justify-center transition-transform hover:scale-105 shadow-xl">
                        <p className="text-white font-bold text-sm text-center leading-relaxed">
                          {t("guaranteeNote")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}


            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LoadingSkeleton = ({ t }) => (
  <div className="min-h-[40vh] flex items-center justify-center" dir="rtl">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-[#F47A1F]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F47A1F]" />
      </motion.div>
      <p className="text-lg font-bold text-[#F5F7FA]">{t ? t("loading") : "جاري التحميل..."}</p>
    </motion.div>
  </div>
);

export default DesertTrip;
