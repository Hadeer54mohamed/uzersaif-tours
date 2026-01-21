"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import FAQ from "@/components/home/FAQ";
import Testimonials from "@/components/home/Testimonials";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";
import Experiences from "@/components/home/Experiences";
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
import {  hotelGallery, DesertTrips } from "@/data/mediaSwiperData";
import ReviewsVideos from "@/components/home/ReviewsVideos";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import BeforeContinue from "@/components/home/BeforeContinue";
import DesertComparison from "@/components/home/DesertComparison";
import DesertFeeling from "@/components/home/DesertFeeling";
import TripForYou from "@/components/home/TripForYou";
import PriceAction from "@/components/home/PriceAction";
const Home = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [stars, setStars] = useState<any[]>([]);
  const [meteors, setMeteors] = useState<any[]>([]);

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
        <BeforeContinue />
        <SectionDivider />
        <DesertComparison />
        <SectionDivider />
        <DesertFeeling />

        <SectionDivider />
        <WhyChooseUs />
        <SectionDivider />
        <Experiences />

        <SectionDivider />
        <AboutBedouin />
        <SectionDivider />
        <DesertTrip />
        <MediaSwiper
          customMedia={DesertTrips}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
          objectFit="contain"
        />
        <SectionDivider />
        <ReviewsVideos />

        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <TripForYou />
        <SectionDivider />
        <PriceAction />
        <SectionDivider />
        
        <MediaSwiper
          customMedia={hotelGallery}
          height="h-[600px]"
          className="container mx-auto px-4 my-12"
          objectFit="contain"
        />
        <SectionDivider />
        <Testimonials />
        <Footer />
      </div>

      <ExitIntentPopup />
    </>
  );
};

export default Home;
