"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SlideShowProps {
  images: string[];
  interval?: number;
  height?: string | number;
  showControls?: boolean;
}

const SlideShow: React.FC<SlideShowProps> = ({ 
  images, 
  interval = 3000,
  height = '400px',
  showControls = true
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // const goToNext = () => {
  //   setCurrentIndex((prevIndex) => 
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const goToPrev = () => {
  //   setCurrentIndex((prevIndex) => 
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };

  if (!images.length) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="relative w-full h-full">
            <Image 
              src={image} 
              alt={`Slide ${index + 1}`}
              fill
              priority={index === currentIndex}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>
        </div>
      ))}
      
      {showControls && images.length > 1 && (
        <>
          {/* <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 
                     hover:bg-black/80 transition-colors z-10"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 
                     hover:bg-black/80 transition-colors z-10"
            onClick={goToNext}
            aria-label="Next slide"
          >
            →
          </button> */}
        </>
      )}
    </div>
  );
};

export default SlideShow;