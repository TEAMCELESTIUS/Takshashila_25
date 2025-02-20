"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { isMobile } from 'react-device-detect';

const MainSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const videoSrc = isMobile ? '//TK_EDIT_ROZX.mp4' : '/TK_EDIT_ROZX.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (isMobile) {
        // On mobile, set progress to 100 immediately after video starts
        setProgress(100);
      } else {
        const progress = (video.currentTime / video.duration) * 100;
        setProgress(progress);
      }
    };

    const handleVideoEnd = () => {
      video.pause();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnd);
    
    // Set initial progress for mobile
    if (isMobile) {
      setProgress(100);
    }
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  // Calculate final animation values
  const finalScale = 1;
  const finalY = 0;
  const currentScale = isMobile ? finalScale : (progress >= 100 ? finalScale : 0.3 + (Math.min(progress, 100) / 100) * 0.7);
  const currentY = isMobile ? finalY : (progress >= 100 ? finalY : 100 - Math.min(progress, 100));

  return (
    <section className={`relative h-screen flex items-center justify-center overflow-hidden ${isMobile ? 'touch-none' : ''}`}>
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
        >
          <source src="/footage/tklife1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Animated Text Content */}
      <motion.div 
        className="absolute flex items-center justify-center w-full h-full"
        initial={{ 
          opacity: 0, 
          scale: 0.3,
          z: -100,  // Start from behind
          y: 100    // Start from below
        }}
        animate={{ 
          opacity: Math.min(1, progress / 50),
          scale: 0.3 + (progress / 100) * 0.7,
          z: -100 + progress,  // Move forward
          y: Math.max(0, 100 - progress)  // Move up
        }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="w-fit h-fit">
          <Image 
            src="/tk25-text.svg" 
            alt="Takshashila Text" 
            width={600} 
            height={150} 
            priority
            className="relative z-10 transition-transform duration-700 ease-in-out hover:scale-115"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default MainSection;
