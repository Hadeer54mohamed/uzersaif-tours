"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Star, Quote, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonialsData";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

const Testimonials = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    setStars(generateStars(60));
    setMeteors(generateMeteors(3, { delayMultiplier: 6, baseRepeatDelay: 15 }));
  }, []);

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

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
    <section className="relative py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="absolute inset-0 bg-cosmic-space" />
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (<StarParticle key={star.id} star={star} />))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {meteors.map((meteor) => (<ShootingStar key={meteor.id} meteor={meteor} />))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl opacity-15 glow-purple" />
        <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full blur-3xl opacity-15 glow-fire" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-primary">آراء عملائنا</h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-secondary">استمع إلى تجارب عملائنا السعداء</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {currentTestimonials.map((testimonial, index) => {
              const hasImages = testimonial.images && testimonial.images.length > 0;
              return (
                <motion.div
                  key={testimonial.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal(testimonial)}
                  className="cursor-pointer"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 backdrop-blur-sm card-cosmic overflow-hidden flex flex-col" style={{ minHeight: hasImages ? '280px' : '200px' }}>
                    {hasImages && (
                      <div className="relative h-32 w-full overflow-hidden flex-shrink-0">
                        <div className="flex h-full">
                          {testimonial.images.slice(0, 3).map((img, i) => (
                            <div key={i} className="relative flex-1 h-full">
                              <Image src={img} alt="" fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070A13] to-transparent" />
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-[#F47A1F] text-white">
                          {testimonial.images.length} صور
                        </div>
                      </div>
                    )}

                    <CardContent className="p-4 flex flex-col flex-1">
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current star-rating" />
                        ))}
                      </div>
                      <p className="text-secondary leading-relaxed mb-3 text-xs flex-1 line-clamp-4">
                        "{testimonial.comment}"
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-fire-light">
                        <h4 className="font-bold text-sm text-primary">{testimonial.name}</h4>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* أزرار التنقل */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B2A4A]/60 border border-[#F47A1F]/30 text-white hover:bg-[#F47A1F]/20 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="font-bold text-sm">السابق</span>
            </motion.button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentPage ? 'bg-[#F47A1F] w-6' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B2A4A]/60 border border-[#F47A1F]/30 text-white hover:bg-[#F47A1F]/20 transition-all"
            >
              <span className="font-bold text-sm">التالي</span>
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>
        )}
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
              className="relative w-full max-w-2xl bg-gradient-to-br from-[#0D1324] to-[#1B2A4A] rounded-2xl overflow-hidden border border-[#F47A1F]/30"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1324] to-transparent" />
                  
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
                <div className="flex mb-3">
                  {[...Array(selectedTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFB85C] text-[#FFB85C]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#F47A1F]/30 mb-2" />
                <p className="text-[#B6BDD6] leading-relaxed mb-4">{selectedTestimonial.comment}</p>

                <div className="flex items-center gap-3 pt-3 border-t border-[#F47A1F]/20">
                  <div>
                    <h4 className="font-bold text-[#F5F7FA]">{selectedTestimonial.name}</h4>
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
