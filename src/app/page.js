"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import FAQ from "@/components/home/FAQ";
import Testimonials from "@/components/home/Testimonials";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Guarantee from "@/components/home/Guarantee";
import { SectionDivider } from "@/components/ui/SectionDivider";
import Experiences from "@/components/home/Experiences";
import BeforeBooking from "@/components/home/BeforeBooking";
import AssuranceSection from "@/components/home/AssuranceSection";
import SpaceshipIntro from "@/components/SpaceshipIntro";
import { motion } from "framer-motion";
import {
  StarParticle,
  ShootingStar,
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutBedouin from "@/components/home/AboutBedouin";
import DesertTrip from "@/components/home/DesertTrip";
import MediaSwiper from "@/components/MediaSwiper";
import { homeGallery, mountainGallery } from "@/data/mediaSwiperData";

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasVisited(true);
  };

  useEffect(() => {
    if (!hasVisited) return;
    setStars(generateStars(120));
    setMeteors(
      generateMeteors(8, {
        delayMultiplier: 3,
        baseRepeatDelay: 8,
        repeatDelayRange: 12,
      })
    );
  }, [hasVisited]);

  return (
    <>
      {showIntro && <SpaceshipIntro onComplete={handleIntroComplete} />}

      {/* 🌌 خلفية فضائية ثابتة */}
      <div className="fixed inset-0 z-0 bg-cosmic-space" />

      {/* ✨ طبقة النجوم */}
      {hasVisited && (
        <div className="fixed inset-0 pointer-events-none z-[1]">
          {stars.map((star) => (
            <StarParticle key={star.id} star={star} />
          ))}
        </div>
      )}

      {/* ☄️ طبقة الشهب */}
      {hasVisited && (
        <div className="fixed inset-0 pointer-events-none z-[2]">
          {meteors.map((meteor) => (
            <ShootingStar key={meteor.id} meteor={meteor} />
          ))}
        </div>
      )}

      {/* توهج في الزوايا */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 glow-purple" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 glow-fire" />
        <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 glow-blue" />
      </div>

      <div className="min-h-screen relative z-10">
        <Navbar transparent />
        
        {showIntro && <SpaceshipIntro onComplete={() => setShowIntro(false)} />}

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: showIntro ? 0 : 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Hero />
        </motion.div>
        <SectionDivider />
        <MediaSwiper 
          customMedia={homeGallery}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
        />

        <SectionDivider />
        <WhyChooseUs />
        <MediaSwiper 
          customMedia={mountainGallery}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
        />
        <AboutBedouin />
        <SectionDivider />
        <MediaSwiper 
          customMedia={mountainGallery}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
        /> 
         <SectionDivider />
        <DesertTrip />
        <Guarantee />
        <SectionDivider />
        <Experiences />
      
        <SectionDivider />
        <BeforeBooking />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Footer />
      </div>
    </>
  );
};

export default Home;
