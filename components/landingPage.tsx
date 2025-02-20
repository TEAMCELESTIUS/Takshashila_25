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
import CountdownSection from './countdownSection';
import { isMobile } from 'react-device-detect';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    // Set video source based on device type
    setVideoSrc(isMobile ? '/footage/landingscreen_mob.mov' : '/footage/landingscreen_lap.mov');

    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const content = (
    <div 
      className="relative min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #004225 0%, #013220 50%, #002616 100%)',
        // Alternative gradients if you prefer:
        // background: 'linear-gradient(135deg, #004225 0%, #016936 50%, #004225 100%)',
        // background: 'linear-gradient(to bottom right, #005f35 0%, #003820 100%)',
      }}
    >
      {/* Subtle overlay for better content visibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10">
        <NavBar />
        <div className="flex flex-col" data-scroll-container>
          <MainSection />
          <AboutUs />
          <EventRoller/>
          <SponsorSlider />
          <Contact />
          <CountdownSection />
          <Footer />
        </div>
      </div>
    </div>
  );

  return (
    <div className="cursor-none">
      <InteractiveCursor />
      {isMobile ? content : (
        <LocomotiveScrollProvider>
          {content}
        </LocomotiveScrollProvider>
      )}
    </div>
  );
}