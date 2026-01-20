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
import { homeGallery, mountainGallery, afterHeroVideo, hotelGallery } from "@/data/mediaSwiperData";
import ReviewsVideos from "@/components/home/ReviewsVideos";
import ExitIntentPopup from "@/components/ExitIntentPopup";

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
     <Experiences />
        <SectionDivider />
        <MediaSwiper 
          customMedia={homeGallery}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
        />
    
        <SectionDivider />
        <WhyChooseUs /> 
        <SectionDivider />
        <MediaSwiper 
          customMedia={mountainGallery}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
        />
        <SectionDivider />
        <AboutBedouin />
        <SectionDivider />
        <MediaSwiper 
          customMedia={mountainGallery}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
        /> 
         <SectionDivider />
        <DesertTrip />
        <SectionDivider />
        <ReviewsVideos />

        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <MediaSwiper 
          customMedia={hotelGallery}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
          objectFit="contain"
        /> 
         <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Footer />
      </div>

      <ExitIntentPopup />
    </>
  );
};

export default Home;
