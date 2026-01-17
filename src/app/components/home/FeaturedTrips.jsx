"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { dummyTrips } from "@/lib/dummyTrips";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";

const LIMIT = 6;

export default function TripsSection() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(LIMIT);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    // استخدام البيانات الاستاتيكية مباشرة
    setTrips(dummyTrips);
    setLoading(false);
  }, []);

  useEffect(() => {
    setStars(generateStars(70));
    setMeteors(generateMeteors(4));
  }, []);

  return (
    <section className="relative py-8 sm:py-10 md:py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cosmic-space" />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <StarParticle key={star.id} star={star} />
        ))}
      </div>

      {/* Meteors */}
      <div className="absolute inset-0 pointer-events-none">
        {meteors.map((meteor) => (
          <ShootingStar key={meteor.id} meteor={meteor} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            رحلاتنا
          </h2>
          <p className="text-secondary">
            اختار رحلتك المناسبة من تجاربنا المميزة
          </p>
        </div>
        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(LIMIT)].map((_, i) => (
              <div
                key={i}
                className="h-full rounded-3xl overflow-hidden bg-white/5 animate-pulse"
              >
                <div className="relative h-48 sm:h-56 bg-white/10" />

                <div className="p-4 text-center">
                  <div className="h-5 bg-white/20 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2 mx-auto mb-1"></div>
                  <div className="h-3 bg-white/10 rounded w-1/3 mx-auto mb-2"></div>
                  <div className="h-12 bg-white/10 rounded mx-auto mb-2"></div>
                  <div className="h-5 bg-white/20 rounded w-1/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && trips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-16 text-center relative z-10"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-28 h-28 mx-auto mb-4 rounded-full bg-[#F47A1F]/10 border border-[#F47A1F]/30 shadow-xl"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[#F47A1F]"
              >
                <Plane className="w-12 h-12" />
              </motion.div>
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 text-primary">
              لا توجد رحلات حالياً
            </h3>

            <p className="text-[#B6BDD6] text-lg">
              ✨ تابعينا قريبًا، رحلات جديدة في الطريق ✨
            </p>
          </motion.div>
        )}
        {/* Trips Cards */}
        {!loading && trips.length > 0 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trips.slice(0, visibleCount).map((trip) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Link href="/Trips">
                    <Card className="h-full rounded-3xl overflow-hidden card-cosmic">
                      <div className="relative h-48 sm:h-56">
                        <Image
                          src={trip.image || "/trip.jpg"}
                          alt={trip.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 overlay-bottom" />

                        {trip.rating && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full flex items-center gap-1 shadow backdrop-blur-sm rating-badge">
                            <Star className="w-4 h-4 fill-current star-rating" />
                            <span className="text-sm font-bold text-primary">
                              {trip.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4 text-center">
                        <h3 className="font-bold text-primary">{trip.title}</h3>

                        <div className="flex justify-center gap-2 text-sm text-secondary">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {trip.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {trip.duration}
                          </span>
                        </div>

                        <p className="text-sm line-clamp-3 text-muted my-2">
                          {trip.description}
                        </p>

                        <p className="text-xl font-bold price-text">
                          {trip.price} ج.م
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < trips.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + LIMIT)}
                  className="px-6 py-2 rounded-full bg-primary text-white hover:opacity-90 transition"
                >
                  عرض المزيد
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
