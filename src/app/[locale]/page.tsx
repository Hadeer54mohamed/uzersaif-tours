"use client";

import { useState } from "react";
import Hero from "@/components/home/Hero";
import FAQ from "@/components/home/FAQ";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";
import Experiences from "@/components/home/Experiences";
import SpaceshipIntro from "@/components/SpaceshipIntro";
import { motion } from "framer-motion";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutBedouin from "@/components/home/AboutBedouin";
import DesertTrip from "@/components/home/DesertTrip";
import MediaSwiper from "@/components/MediaSwiper";
import { hotelGallery } from "@/data/mediaSwiperData";
import ReviewsVideos from "@/components/home/ReviewsVideos";
import BeforeContinue from "@/components/home/BeforeContinue";
import DesertComparison from "@/components/home/DesertComparison";
import DesertFeeling from "@/components/home/DesertFeeling";
import TripForYou from "@/components/home/TripForYou";
import PriceAction from "@/components/home/PriceAction";

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <SpaceshipIntro onComplete={() => setShowIntro(false)} />}

      <div className="min-h-screen relative z-10">
        <Navbar transparent />

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
          customMedia={hotelGallery}
          height="h-[600px]"
          className="container mx-auto px-4"
          objectFit="contain"
          intervalDefault={15}
        />
        <SectionDivider />
        <ReviewsVideos />

        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <TripForYou />
        <SectionDivider />
        <PriceAction />
        <Footer />
      </div>
    </>
  );
};

export default Home;
