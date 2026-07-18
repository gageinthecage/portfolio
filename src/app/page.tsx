"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import VantaBackground from "@/components/VantaBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import InterestsSection from "@/components/InterestsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <VantaBackground />
            <div className="relative z-10">
              <Navbar />
              <main>
                <Hero />
                <ExperienceSection />
                <ProjectsSection />
                <InterestsSection />
              </main>
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
