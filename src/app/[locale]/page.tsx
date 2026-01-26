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
import DesertComparison from "@/components/home/DesertComparison";
import DesertFeeling from "@/components/home/DesertFeeling";
import TripForYou from "@/components/home/TripForYou";
import PriceAction from "@/components/home/PriceAction";
import Guarantees from "@/components/home/Guarantees";
import ContactForm from "@/components/home/ContactForm";

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
        <TripForYou />
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
        <ReviewsVideos 
          id="reviews" 
          videos={[
            { id: "QViYDcYGl34" },
            { id: "-aUqfhZNjPQ" },
            { id: "hkvlJHJEeHs" },
            { id: "jIYepfj2xZk" },
            { id: "qBw1QuRwz_o" },
            { id: "GzfxsGQc1LA" },
            { id: "mmtSc1TVgN4" },
            { id: "kUQyvODbExY" },
            { id: "yeYdMzvLTXk" },
            { id: "jdI3GoGe9XI" },
            { id: "i4w2WfMh-fw" },
                    ]} 
        />
        <Guarantees />
        <SectionDivider />
        <FAQ />
        
        <SectionDivider />
        <PriceAction />
        <ContactForm />

        <ReviewsVideos 
          id="companies-reviews" 
          layout="grid"
          showHeader={true}
          showCTA={true}
          videos={[
            { id: "teb8R0GzsZY" },
            { id: "I6bBE2nX3o4" },
            { id: "yYJvqp7E7Fc" },
            { id: "va6gEAnAF8s" },
            { id: "9gBoQJT9FdY" },
            { id: "WnfyS2w89Eo" },
            { id: "hwMn050Og5c" },
            { id: "7asO-BWZZ0w" },
            { id: "59R8g9EeNeQ" },
            { id: "CserZezSSew" },
          ]} 
        />
        <Footer />
      </div>
    </>
  );
};

export default Home;
