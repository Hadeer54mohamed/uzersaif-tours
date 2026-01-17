"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { 
  Sun, 
  Tent, 
  Car, 
  MapPin, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  Camera,
  ChevronLeft,
  Sparkles,
  Star,
  Users,
  Phone,
  MessageCircle
} from "lucide-react";
import { dummyTrips } from "@/lib/dummyTrips";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const sidebarItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const DesertTrip = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dayIcons = [
    <Sun key="sun" className="w-5 h-5" />,
    <Car key="car" className="w-5 h-5" />,
    <Tent key="tent" className="w-5 h-5" />,
  ];

  useEffect(() => {
    // استخدام البيانات الاستاتيكية مباشرة
    setTrips(dummyTrips);
    setSelectedTrip(dummyTrips[0]);
    setIsLoading(false);
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="relative w-20 h-20 mx-auto"
          >
            <div className="absolute inset-0 rounded-full border-4 border-[#F47A1F]/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F47A1F] animate-spin" />
            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-[#F47A1F]" />
          </motion.div>
          <div>
            <p className="text-lg font-semibold text-[#F5F7FA]">جاري تحميل الرحلات</p>
            <p className="text-sm text-[#B6BDD6]">انتظر لحظة...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Get image URL (استاتيكي)
  const getImageUrl = (trip) => {
    if (!trip?.image) return "/trip.jpg";
    return trip.image;
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row py-8 lg:py-12">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-80 p-4 lg:p-6 lg:min-h-screen"
      >
        <div className="lg:sticky lg:top-24">
          {/* Sidebar Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-6 p-4 rounded-2xl
                       bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70
                       border border-[#F47A1F]/20"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center
                           bg-gradient-to-br from-[#F47A1F] to-[#FFB85C] shadow-lg shadow-[#F47A1F]/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F5F7FA]">الرحلات</h2>
              <p className="text-sm text-[#B6BDD6]">{trips.length} رحلة متاحة</p>
            </div>
          </motion.div>

          {/* Trips List */}
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {trips.map((trip, index) => (
              <motion.li
                key={trip._id}
                variants={sidebarItemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 
                           border backdrop-blur-sm ${
                  selectedTrip?._id === trip._id 
                    ? 'bg-gradient-to-br from-[#F47A1F]/15 to-[#1B2A4A]/60 border-[#F47A1F]/50 shadow-lg shadow-[#F47A1F]/10' 
                    : 'bg-gradient-to-br from-[#0D1324]/80 to-[#1B2A4A]/50 border-[#F47A1F]/10 hover:border-[#F47A1F]/30'
                }`}
                onClick={() => setSelectedTrip(trip)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                                   ${selectedTrip?._id === trip._id 
                                     ? 'bg-[#F47A1F]/20 border border-[#F47A1F]/50' 
                                     : 'bg-[#1B2A4A]/50 border border-[#F47A1F]/20'}`}>
                      <Star className={`w-5 h-5 ${selectedTrip?._id === trip._id ? 'text-[#F47A1F]' : 'text-[#B6BDD6]'}`} />
                    </div>
                    <span className={`font-semibold transition-colors ${
                      selectedTrip?._id === trip._id ? 'text-[#F47A1F]' : 'text-[#F5F7FA]'
                    }`}>
                      {trip.title}
                    </span>
                  </div>
                  {selectedTrip?._id === trip._id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-[#F47A1F]" />
                    </motion.div>
                  )}
                </div>
                {trip.duration && (
                  <p className="text-sm mt-2 flex items-center gap-2 text-[#8A91A8] mr-13">
                    <Clock className="w-3.5 h-3.5" />
                    {trip.duration}
                  </p>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#2A1F3F]/40 to-[#0D1324]/60 border border-[#F47A1F]/15"
          >
            <p className="text-sm text-[#B6BDD6] mb-3">هل تحتاج مساعدة؟</p>
            <div className="flex gap-2">
              <motion.a
                href="tel:+201234567890"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium
                           bg-[#F47A1F]/10 border border-[#F47A1F]/30 text-[#F47A1F]
                           hover:bg-[#F47A1F]/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                اتصل
              </motion.a>
              <motion.a
                href="https://wa.me/201234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium
                           bg-emerald-500/10 border border-emerald-500/30 text-emerald-400
                           hover:bg-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                واتساب
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 px-4 lg:px-8 py-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedTrip && (
            <motion.div
              key={selectedTrip._id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Hero Section */}
              <motion.section
                variants={itemVariants}
                className="relative h-[300px] md:h-[420px] w-full overflow-hidden rounded-3xl shadow-2xl
                           border border-[#F47A1F]/20"
              >
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={getImageUrl(selectedTrip)}
                  alt={selectedTrip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A13] via-[#070A13]/50 to-transparent" />
                
                {/* Rating Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full
                             bg-[#070A13]/60 backdrop-blur-sm border border-[#F47A1F]/30"
                >
                  <Star className="w-4 h-4 text-[#FFB85C] fill-[#FFB85C]" />
                  <span className="text-sm font-semibold text-[#F5F7FA]">4.9</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-end p-6 md:p-10"
                >
                  <h1 className="text-3xl md:text-5xl font-black mb-4 drop-shadow-lg text-[#F5F7FA]">
                    {selectedTrip.title}
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {selectedTrip.duration && (
                      <span className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-xl
                                     bg-[#0D1324]/60 border border-[#F47A1F]/30 text-[#F5F7FA]">
                        <Clock className="w-4 h-4 text-[#FFB85C]" />
                        {selectedTrip.duration}
                      </span>
                    )}
                    {selectedTrip.location && (
                      <span className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-xl
                                     bg-[#0D1324]/60 border border-[#F47A1F]/30 text-[#F5F7FA]">
                        <MapPin className="w-4 h-4 text-[#FFB85C]" />
                        {selectedTrip.location}
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.section>

              {/* تجمع الرحلة والتحرك */}
              {selectedTrip.gathering && selectedTrip.gathering.length > 0 && (
                <motion.div
                  variants={cardVariants}
                  className="rounded-3xl p-6 md:p-8 shadow-xl
                             bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70
                             border border-[#F47A1F]/20"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-[#F5F7FA]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                   bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10
                                   border border-[#F47A1F]/30">
                      <MapPin className="w-6 h-6 text-[#F47A1F]" />
                    </div>
                    تفاصيل التجمع والتحرك
                  </h2>
                  <ul className="space-y-4">
                    {selectedTrip.gathering.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl
                                   bg-[#1B2A4A]/40 border border-[#F47A1F]/10
                                   hover:border-[#F47A1F]/30 transition-all"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-lg text-[#B6BDD6]">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* برنامج الرحلة */}
              {selectedTrip.itinerary && selectedTrip.itinerary.length > 0 && (
                <motion.div variants={cardVariants}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3 text-[#F5F7FA]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                   bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10
                                   border border-[#F47A1F]/30">
                      <Sun className="w-6 h-6 text-[#F47A1F]" />
                    </div>
                    برنامج الرحلة
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {selectedTrip.itinerary.map((day, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                      >
                        <AccordionItem value={`day-${index}`} className="border-none">
                          <AccordionTrigger className="flex items-center justify-between rounded-2xl px-6 py-5 shadow-md transition-all duration-300 
                                                       bg-gradient-to-br from-[#F47A1F]/10 to-[#1B2A4A]/60
                                                       border border-[#F47A1F]/25 hover:border-[#F47A1F]/50
                                                       text-[#F47A1F]">
                            <span className="flex items-center gap-3 text-lg font-semibold">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center
                                             bg-[#F47A1F]/20 border border-[#F47A1F]/40">
                                {dayIcons[index] || <Sun className="w-5 h-5 text-[#F47A1F]" />}
                              </div>
                              {day.day}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="rounded-2xl p-6 mt-3
                                                       bg-[#0D1324]/80 border border-[#F47A1F]/15">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {day.activities?.map((act, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.05 }}
                                  whileHover={{ scale: 1.02 }}
                                  className="flex items-center gap-4 p-4 rounded-xl shadow-sm 
                                             bg-[#1B2A4A]/50 border border-[#F47A1F]/10
                                             hover:border-[#F47A1F]/30 hover:shadow-md transition-all duration-300"
                                >
                                  <span className="text-2xl">{act.icon}</span>
                                  <span className="text-[#B6BDD6]">{act.text}</span>
                                </motion.div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              )}

              {/* Grid للأقسام الثلاثة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* الأسعار للفرد */}
                {(selectedTrip.prices || selectedTrip.price) && (
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    className="rounded-3xl p-6 md:p-8 shadow-xl
                               bg-gradient-to-br from-[#F47A1F]/10 to-[#1B2A4A]/60
                               border border-[#F47A1F]/25"
                  >
                    <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-[#F5F7FA]">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                     bg-gradient-to-br from-[#F47A1F] to-[#FFB85C] shadow-lg">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      الأسعار للفرد
                    </h2>
                    {selectedTrip.prices ? (
                      <ul className="space-y-4">
                        {selectedTrip.prices.map((price, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex justify-between items-center p-4 rounded-xl
                                       bg-[#0D1324]/60 border border-[#F47A1F]/15"
                          >
                            <span className="text-[#B6BDD6] flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#F47A1F]" />
                              {price.label}
                            </span>
                            <span className="font-bold text-xl text-[#F47A1F]">{price.amount}</span>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-5xl font-black text-gradient-fire">{selectedTrip.price}</p>
                        <p className="mt-2 text-[#8A91A8]">جنيه مصري</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* السعر يشمل */}
                {selectedTrip.included && selectedTrip.included.length > 0 && (
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    className="rounded-3xl p-6 md:p-8 shadow-xl
                               bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70
                               border border-emerald-500/20"
                  >
                    <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-[#F5F7FA]">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                     bg-emerald-500/20 border border-emerald-500/40">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      السعر يشمل
                    </h2>
                    <ul className="space-y-3">
                      {selectedTrip.included.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-3 text-[#B6BDD6]"
                        >
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* الملاحظات */}
              {selectedTrip.notes && selectedTrip.notes.length > 0 && (
                <motion.div
                  variants={cardVariants}
                  className="rounded-3xl p-6 md:p-8 shadow-xl
                             bg-gradient-to-br from-[#FFB85C]/10 to-[#1B2A4A]/60
                             border border-[#FFB85C]/25"
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-[#F5F7FA]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                   bg-[#FFB85C]/20 border border-[#FFB85C]/40">
                      <AlertTriangle className="w-6 h-6 text-[#FFB85C]" />
                    </div>
                    ملاحظات مهمة
                  </h2>
                  <ul className="space-y-3">
                    {selectedTrip.notes.map((note, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-[#B6BDD6]"
                      >
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#FFB85C]" />
                        {note}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* استخراج التصاريح */}
              <motion.div
                variants={cardVariants}
                className="rounded-3xl p-8 md:p-10 shadow-xl text-center relative overflow-hidden
                           bg-gradient-to-br from-[#2A1F3F]/50 via-[#0D1324]/80 to-[#1B2A4A]/50
                           border border-[#F47A1F]/25"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#F47A1F]/15 to-transparent rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-[#FFB85C]/10 to-transparent rounded-tl-full" />
                
                <div className="relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5
                              bg-gradient-to-br from-[#F47A1F] to-[#FFB85C] shadow-lg shadow-[#F47A1F]/30"
                  >
                    <Camera className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#F5F7FA]">
                    استخراج التصاريح
                  </h2>
                  <p className="text-lg max-w-xl mx-auto text-[#B6BDD6]">
                    ابعتلنا صورة بطاقتك علشان نبدأ فورًا في استخراج تصاريح الرحلة الخاصة بيك.
                  </p>
                </div>
              </motion.div>

              {/* طرق الدفع */}
              {selectedTrip.paymentMethods && selectedTrip.paymentMethods.length > 0 && (
                <motion.div
                  variants={cardVariants}
                  className="rounded-3xl p-6 md:p-8 shadow-xl
                             bg-gradient-to-br from-[#0D1324]/90 to-[#1B2A4A]/70
                             border border-[#F47A1F]/20"
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-[#F5F7FA]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                   bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10
                                   border border-[#F47A1F]/30">
                      <CreditCard className="w-6 h-6 text-[#F47A1F]" />
                    </div>
                    طرق الحجز والدفع
                  </h2>
                  <ul className="space-y-3">
                    {selectedTrip.paymentMethods.map((method, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3 p-4 rounded-xl
                                   bg-[#1B2A4A]/40 border border-[#F47A1F]/10 text-[#B6BDD6]"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#F47A1F]" />
                        {method}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* CTA Button */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center py-8"
              >
                <motion.a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 text-lg rounded-2xl font-bold shadow-2xl transition-all duration-300 
                             bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white
                             shadow-[#F47A1F]/40 hover:shadow-[#F47A1F]/60
                             flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  احجز الآن
                </motion.a>
                <motion.a
                  href="tel:+201234567890"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 text-lg rounded-2xl font-bold transition-all duration-300 
                             bg-transparent border-2 border-[#F47A1F]/50 text-[#F5F7FA]
                             hover:bg-[#F47A1F]/10 hover:border-[#F47A1F]
                             flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  اتصل للاستفسار
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DesertTrip;
