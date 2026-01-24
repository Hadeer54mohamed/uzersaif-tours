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
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

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
              <div className="relative h-[220px] sm:h-[280px] md:h-[400px] rounded-2xl overflow-hidden border border-[#F47A1F]/20 shadow-xl shadow-[#F47A1F]/10">
                <img src={selectedTrip.image} className="w-full h-full object-cover" alt={selectedTrip.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-0 left-0 w-10 h-10 sm:w-16 sm:h-16 border-t-2 border-l-2 border-[#F47A1F]/30 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-10 h-10 sm:w-16 sm:h-16 border-t-2 border-r-2 border-[#F47A1F]/30 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-16 sm:h-16 border-b-2 border-l-2 border-[#F47A1F]/30 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-16 sm:h-16 border-b-2 border-r-2 border-[#F47A1F]/30 rounded-br-2xl" />
                <div className="absolute bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-6 text-white">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-4 py-1.5 rounded-full text-base sm:text-lg font-bold bg-gradient-to-r from-[#F47A1F] to-[#FFB85C]">{selectedTrip.duration}</span>
                    <span className="px-4 py-1.5 rounded-full text-base sm:text-lg font-bold bg-black/60 backdrop-blur-md border border-[#F47A1F]/30">{selectedTrip.location}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F7FA]">{selectedTrip.title}</h1>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" >
                <div className="space-y-4 order-1">
                  <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5">
                    <h3 className="text-4xl font-bold text-fire mb-4 md:text-2xl md:font-black">{t("gatheringPoints")}</h3>
                    <div className="space-y-2">
                      {selectedTrip.gathering?.map((item, i) => (
                        <div key={i} className="flex gap-3 items-start p-3 bg-white/5 rounded-lg border border-[#F47A1F]/10">
                          <div className="w-2 h-2 rounded-full bg-[#F47A1F] mt-1.5 flex-shrink-0"></div>
                          <p className="text-white font-bold text-[clamp(1.25rem,4vw,2.2rem)] leading-relaxed md:text-sm">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* بوكس السعر */}
                 {/*  <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#F47A1F]/10 blur-[60px]" />
                    <div className="relative z-10 text-center space-y-4">
                      <div className="inline-block mx-auto px-6 py-2 border border-[#F5F7FA]/30 rounded-full text-[clamp(1.25rem,4vw,2.2rem)] font-bold md:text-2xl md:font-black bg-gradient-to-r from-[#F47A1F] via-[#FFB85C] to-[#F47A1F] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,184,92,0.35)]">
                        {t("discount")} {selectedTrip.discountAmount}
                      </div>
                      <p className="text-[#F47A1F] font-bold text-[clamp(1.25rem,4vw,2.2rem)] md:text-lg md:font-black">
                        {t("useCode")} <span className="underline">{selectedTrip.discountCode}</span>
                      </p>
                      <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#8A91A8] md:text-sm">
                        {t("priceAfterDiscount")}
                      </p>
                      <div className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#F5F7FA]">
                        {selectedTrip.price}
                        <span className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#F47A1F] mr-2">{t("currency")}</span>
                      </div>
                      <div className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#8A91A8] line-through md:text-xl md:font-black">
                        {t("insteadOf")} {selectedTrip.originalPrice} {t("currency")}
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="space-y-3 order-2">
                  <h3 className="text-4xl font-bold text-fire md:text-2xl md:font-black">{t("tripProgram")}</h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {selectedTrip.itinerary?.map((day, idx) => (
                      <AccordionItem key={idx} value={`day-${idx}`} className="border-[#F47A1F]/10 bg-black/80 rounded-xl px-3 backdrop-blur-sm">
                        <AccordionTrigger className="text-[#F5F7FA] hover:no-underline font-bold text-[clamp(1.25rem,4vw,2.2rem)] hover:text-[#F47A1F] py-3 md:text-sm md:font-black">
                          {day.day}
                        </AccordionTrigger>
                        <AccordionContent className="pb-3">
                          <div className="space-y-2 pr-3 border-r-2 border-[#F47A1F]/30">
                            {day.activities?.map((act, i) => (
                              <div key={i} className="flex gap-2 text-white text-[clamp(1.25rem,4vw,2.2rem)] md:text-sm">
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


              {/* طريقة الحجز */}
              {selectedTrip.bookingSteps && (
                <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5">
               
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
                   

                    <p className="text-[#FFB85C] font-bold text-[clamp(1.25rem,4vw,2.2rem)] md:text-xs md:font-black">
                      {t("importantNote")}
                    </p>
                  </div>

                  {/* Booking CTA */} 
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 w-full"
                  >
                  <motion.a
                    href="#booking"
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white py-4 px-8 rounded-2xl shadow-lg shadow-[#F47A1F]/40 flex flex-col items-center justify-center gap-1 transition-all hover:shadow-[#F47A1F]/60 hover:brightness-110"
                  >
                    <motion.div 
                      animate={{ x: [0, -6, 6, -6, 6, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex flex-col items-center gap-1"
                    >
                      <span className="flex items-center gap-3 font-black text-xl">
                        <MessageCircle size={28} />
                        {t("bookingButton")}
                      </span>
                      <span className="text-black text-sm font-bold flex items-center gap-5">
                        <span>-</span>
                        {t("limitedSpots")}
                        <span>-</span>
                      </span>
                    </motion.div>
                  </motion.a>
                  </motion.div>
                </div>
              )}



              {/* الضمانات */}
             


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
      <p className="text-[clamp(1.25rem,4vw,2.2rem)] font-bold text-[#F5F7FA] md:text-lg">{t ? t("loading") : "جاري التحميل..."}</p>
    </motion.div>
  </div>
);

export default DesertTrip;
