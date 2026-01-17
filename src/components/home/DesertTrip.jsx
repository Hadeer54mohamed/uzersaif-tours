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

const BookingCard = ({ selectedTrip }) => {
  const phoneNumber = "201011879549";
  const message = `أهلاً ساهر، حابب أحجز مكاني في "${selectedTrip.title}". ممكن تفاصيل ؟`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const remainingSeats = 4; 

  return (
    <div className="bg-gradient-to-br from-[#F47A1F]/10 to-[#1B2A4A]/60 backdrop-blur-md border border-[#F47A1F]/30 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">
      
      {/*  Counter */}
      <div className="flex items-center justify-between mb-4 bg-black/20 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <Users className="text-orange-500 w-5 h-5" />
          <span className="text-sm text-gray-300 font-bold">الأماكن المتبقية:</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-orange-500">{remainingSeats}</span>
          <span className="text-xs text-gray-500">من 14</span>
        </div>
      </div>

      {/*(Progress Bar) */}
      <div className="w-full bg-white/5 h-1.5 rounded-full mb-6 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "70%" }} 
          className="h-full bg-gradient-to-r from-orange-600 to-amber-400"
        />
      </div>

      {/* زر الواتساب */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white font-black py-4 px-8 rounded-xl shadow-lg shadow-[#F47A1F]/40 text-lg flex items-center justify-center gap-3 transition-shadow hover:shadow-[#F47A1F]/60"
      >
        <MessageCircle size={24} />
        احجز مكانك الآن
      </motion.a>

      <div className="mt-4 flex flex-col gap-1 text-center">
        <p className="text-xs text-[#8A91A8] font-bold">
          يتم تأكيد الحجز عند دفع العربون {selectedTrip.bookingSteps?.deposit}
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <p className="text-[10px] text-emerald-500/80 font-medium">متاح الحجز الآن - رد فوري</p>
        </div>
      </div>

      {/* لمسة جمالية خلفية */}
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-600/10 blur-2xl rounded-full pointer-events-none" />
    </div>
  );
};

const DesertTrip = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTrips(dummyTrips);
    setSelectedTrip(dummyTrips[0]);
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="py-8 relative" dir="rtl">
      {/* توهجات فضائية */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-[#F47A1F]" />
        <div className="absolute bottom-40 left-10 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10 bg-purple-600" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F7FA] mb-3">
            استكشف <span className="text-[#F47A1F]">مغامراتنا</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] mx-auto rounded-full" />
        </motion.div>

        {/* تابات اختيار الرحلة */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {trips.map((trip) => (
            <motion.button
              key={trip._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTrip(trip)}
              className={`px-6 py-2 rounded-xl font-bold transition-all border-2 backdrop-blur-sm text-sm ${
                selectedTrip?._id === trip._id
                  ? "bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] border-[#F47A1F] text-white shadow-lg shadow-[#F47A1F]/30"
                  : "bg-[#0D1324]/60 border-[#F47A1F]/20 text-[#B6BDD6] hover:border-[#F47A1F]/50"
              }`}
            >
              {trip.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedTrip && (
            <motion.div
              key={selectedTrip._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              {/* Hero Image */}
              <div className="relative h-[280px] md:h-[400px] rounded-2xl overflow-hidden border border-[#F47A1F]/20 shadow-xl shadow-[#F47A1F]/10">
                <img src={selectedTrip.image} className="w-full h-full object-cover" alt={selectedTrip.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A13] via-[#070A13]/40 to-transparent" />
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#F47A1F]/30 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#F47A1F]/30 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#F47A1F]/30 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#F47A1F]/30 rounded-br-2xl" />
                <div className="absolute bottom-6 right-6 left-6 text-white">
                  <div className="flex gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#F47A1F] to-[#FFB85C]">{selectedTrip.duration}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0D1324]/60 backdrop-blur-md border border-[#F47A1F]/30">{selectedTrip.location}</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-black text-[#F5F7FA]">{selectedTrip.title}</h1>
                </div>
              </div>

              {/* Price + Booking */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#F47A1F]/10 blur-[60px]" />
                  <div className="relative z-10 text-center">
                    <span className="text-xl text-[#8A91A8] font-black">سعر الرحلة</span>
                    <div className="flex items-baseline justify-center gap-3 my-2">
                      <span className="text-5xl font-black text-[#F5F7FA]">{selectedTrip.price}</span>
                      <span className="text-xl font-bold text-[#F47A1F]">جنيه</span>
                      <span className="text-4xl text-[#8A91A8] line-through">{selectedTrip.originalPrice}</span>
                    </div>
                    <div className="inline-flex items-center gap-4 bg-emerald-500/10 text-emerald-400 px-8 py-4 rounded-2xl border border-emerald-500/20 font-black text-xl">
  خصم {selectedTrip.discountAmount} بكود: 
  <span className="text-[#F47A1F] text-3xl ml-2">
    {selectedTrip.discountCode}
  </span>
</div>
                  </div>
                </div>
                <BookingCard selectedTrip={selectedTrip} />
              </div>

              {/* طريقة الحجز */}
              {selectedTrip.bookingSteps && (
                <div className="bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5">
                  <h3 className="text-xl font-black text-[#F5F7FA] mb-4">طريقة الحجز والدفع</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-7 bg-[#1B2A4A]/50 rounded-xl border border-[#F47A1F]/10 text-center">
                      <span className="text-[#8A91A8] font-bold text-xl block mb-1">العربون</span>
                      <span className="text-xl font-black text-[#F47A1F] text-xl">{selectedTrip.bookingSteps.deposit}</span>
                    </div>
                    <div className="p-3 bg-[#1B2A4A]/50 rounded-xl border border-[#F47A1F]/10 text-center">
                      <span className="text-[#8A91A8] font-bold text-xl block mb-1">الدفع</span>
                        <span className="font-black text-[#F5F7FA] text-xl">{selectedTrip.bookingSteps.method}</span>
                    </div>
                    <div className="p-3 bg-[#1B2A4A]/50 rounded-xl border border-[#F47A1F]/10 text-center">
                      <span className="text-[#8A91A8] font-bold text-xl block mb-1">الرقم</span>
                      <span className="font-black text-[#F47A1F] text-xl">{selectedTrip.bookingSteps.number}</span>
                    </div>
                    <div className="p-3 bg-[#1B2A4A]/50 rounded-xl border border-[#F47A1F]/10 text-center">
                      <span className="text-[#8A91A8] font-bold text-xl block mb-1">الحساب</span>
                      <span className="font-black text-[#F5F7FA] text-xl">{selectedTrip.bookingSteps.accountName}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* البرنامج + التجمع */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-[#F5F7FA]">برنامج الرحلة</h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {selectedTrip.itinerary?.map((day, idx) => (
                      <AccordionItem key={idx} value={`day-${idx}`} className="border-[#F47A1F]/10 bg-gradient-to-br from-[#0D1324]/80 to-[#1B2A4A]/50 rounded-xl px-3 backdrop-blur-sm">
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
                <div className="bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5">
                  <h3 className="text-xl font-black text-[#F5F7FA] mb-4">نقاط التجمع</h3>
                  <div className="space-y-2">
                    {selectedTrip.gathering?.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start p-3 bg-[#1B2A4A]/40 rounded-lg border border-[#F47A1F]/10">
                        <div className="w-2 h-2 rounded-full bg-[#F47A1F] mt-1.5 flex-shrink-0"></div>
                        <p className="text-[#B6BDD6] font-bold text-sm leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* الضمانات */}
              {selectedTrip.guarantees && (
                <div>
                  <h3 className="text-xl font-black text-[#F5F7FA] mb-4 text-center">ضمانات الرحلة</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {selectedTrip.guarantees.map((g, i) => (
                      <motion.div key={i} whileHover={{ y: -3 }} className="bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70 backdrop-blur-sm rounded-xl p-4 border border-[#F47A1F]/20 hover:border-[#F47A1F]/40">
                        <h4 className="text-sm font-black text-[#F47A1F] mb-2">{g.title}</h4>
                        <ul className="space-y-1">
                          {g.items.map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-[#B6BDD6]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                              <span className="font-bold text-xs">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ملاحظة */}
              <div className="p-4 bg-gradient-to-r from-[#FFB85C]/10 to-[#F47A1F]/10 border border-[#FFB85C]/30 rounded-xl backdrop-blur-sm">
                <p className="text-[#FFB85C] font-bold text-sm text-center">
                  يرجى إرسال صورة البطاقة الشخصية وصورة التحويل لحجز الفندق واستخراج التصاريح الأمنية
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-[40vh] flex items-center justify-center" dir="rtl">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-[#F47A1F]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F47A1F]" />
      </motion.div>
      <p className="text-lg font-bold text-[#F5F7FA]">جاري التحميل...</p>
    </motion.div>
  </div>
);

export default DesertTrip;
