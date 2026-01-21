"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Star, Quote, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { testimonials as testimonialsOriginal } from "@/data/testimonialsData";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Grid } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index, t, openModal }) => {
  const hasImages = testimonial.images && testimonial.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openModal(testimonial)}
      className="cursor-pointer h-full"
    >
      <Card className="hover:shadow-xl transition-all duration-300 text-center backdrop-blur-sm card-cosmic overflow-hidden flex flex-col h-full" style={{ minHeight: hasImages ? '280px' : '200px' }}>
        {hasImages && (
          <div className="relative h-32 w-full overflow-hidden flex-shrink-0">
            <div className="flex h-full">
              {testimonial.images.slice(0, 3).map((img, i) => (
                <div key={i} className="relative flex-1 h-full">
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-[#F47A1F] text-white">
              {testimonial.images.length} {t("photos")}
            </div>
          </div>
        )}

        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex mb-2 justify-center">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current star-rating" />
            ))}
          </div>
          <p className="text-secondary leading-relaxed mb-3 text-xs flex-1 line-clamp-4">
            "{testimonial.comment}"
          </p>
          <div className="flex items-center gap-2 pt-2 border-t border-fire-light justify-center">
            <h4 className="font-bold text-sm text-primary">{testimonial.name}</h4>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Testimonials = () => {
  const t = useTranslations("testimonials");
  const tData = useTranslations("testimonialsData");
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get translated testimonials
  const testimonials = testimonialsOriginal.map((item, index) => ({
    ...item,
    name: tData(`items.${index}.name`),
    comment: tData(`items.${index}.comment`),
  }));

  useEffect(() => {
    setStars(generateStars(60));
    setMeteors(generateMeteors(3, { delayMultiplier: 6, baseRepeatDelay: 15 }));
  }, []);

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedTestimonial) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedTestimonial.images.length);
    }
  };

  const prevImage = () => {
    if (selectedTestimonial) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedTestimonial.images.length) % selectedTestimonial.images.length);
    }
  };


  return (
    <section className="relative py-6 sm:py-8 md:py-10 overflow-hidden">
      <div className="absolute inset-0 bg-cosmic-space" />
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (<StarParticle key={star.id} star={star} />))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {meteors.map((meteor) => (<ShootingStar key={meteor.id} meteor={meteor} />))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10"
        >
          <h2 className="text-[clamp(1.25rem,4vw,2.5rem)] font-bold leading-tight text-primary">
            {t("title")}
          </h2>
        </motion.div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, A11y, Grid]}
            spaceBetween={16}
            slidesPerView={1}
            grid={{
              rows: 2,
              fill: "row",
            }}
            navigation={{
              prevEl: ".testimonials-prev",
              nextEl: ".testimonials-next",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                grid: {
                  rows: 2,
                  fill: "row",
                },
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                grid: {
                  rows: 2,
                  fill: "row",
                },
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                grid: {
                  rows: 2,
                  fill: "row",
                },
                spaceBetween: 24,
              },
            }}
            className="testimonials-swiper"
            dir="rtl"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  t={t}
                  openModal={openModal}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="testimonials-prev absolute top-1/2 -translate-y-1/2 -right-1 sm:-right-4 md:-right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-500 sm:bg-primary/90 hover:bg-orange-600 sm:hover:bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="السابق"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button
            className="testimonials-next absolute top-1/2 -translate-y-1/2 -left-1 sm:-left-4 md:-left-6 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-500 sm:bg-primary/90 hover:bg-orange-600 sm:hover:bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="التالي"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden border border-[#F47A1F]/30"
            >
              {/* زر الإغلاق */}
              <button onClick={closeModal} className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#F47A1F] transition-all">
                <X className="w-5 h-5" />
              </button>

              {/* عرض الصور */}
              {selectedTestimonial.images && selectedTestimonial.images.length > 0 && (
                <div className="relative h-64 md:h-80">
                  <Image
                    src={selectedTestimonial.images[currentImageIndex]}
                    alt={selectedTestimonial.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  
                  {selectedTestimonial.images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#F47A1F] transition-all">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <button onClick={nextImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#F47A1F] transition-all">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedTestimonial.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-[#F47A1F] w-6' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* المحتوى */}
              <div className="p-5">
                <div className="flex mb-3 justify-center">
                  {[...Array(selectedTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFB85C] text-[#FFB85C]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#F47A1F]/30 mb-2" />
                <p className="text-[#B6BDD6] leading-relaxed mb-4 text-center text-lg">{selectedTestimonial.comment}</p>

                <div className="flex items-center gap-3 pt-3 border-t border-[#F47A1F]/20 justify-center">
                  <div>
                    <h4 className="font-bold text-primary text-xl">{selectedTestimonial.name}</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
