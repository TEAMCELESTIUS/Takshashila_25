"use client"
import AboutUs from '../components/aboutUs';
import NavBar from '../components/navBar';
import SponsorSlider from '../components/SponsorSlider';
import Footer from '../components/footer';
import LocomotiveScrollProvider from '@/components/locomotiveScroll';
import InteractiveCursor from '@/components/interactiveCursor';
import { useEffect, useState } from 'react';
import Contact from '@/components/contact';
import MainSection from '@/components/mainSection';
import EventRoller from './eventRoller';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="cursor-none">
      <InteractiveCursor />
      <LocomotiveScrollProvider>
      
      <div className="relative min-h-screen overflow-hidden">
          {/* Background with blur effect */}
          <div 
            className={`fixed inset-0 bg-[url('/TKback2.png')] bg-cover bg-center transition-all duration-700 ${
              scrolled ? 'backdrop-blur-md' : ''
            }`}
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-[#050505] bg-opacity-70 z-10" />

          <div className="relative z-20">
            <NavBar />
            <div className="flex flex-col min-h-screen" data-scroll-container>
              
                <MainSection />
                <AboutUs />
                <EventRoller/>
                <SponsorSlider />
                <Contact />
                <Footer />

            </div>
          </div>
        </div>
      </LocomotiveScrollProvider>
    </div>
  );
}