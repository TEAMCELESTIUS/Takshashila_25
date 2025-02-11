"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import EventPopup from "./eventPopup";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  registrationLink: string;
  category: string;
  isVinylHovered: boolean;
}

export default function EventCard({ 
  title, 
  date, 
  location, 
  image, 
  description, 
  category,
  isVinylHovered 
}: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Dynamic z-index calculation based on both states
  const getZIndex = () => {
    if (isVinylHovered) {
      // When vinyl is hovered, keep cards well below vinyl (z-index 20)
      return 1;
    } else {
      // When vinyl is not hovered, cards can be above
      return isHovered ? 7 : 6;
    }
  };

  return (
    <>
      <div
        className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg cursor-pointer"
        style={{ 
          zIndex: getZIndex(),
          transition: 'z-index 0.3s'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={(e) => {
          const relatedTarget = e.relatedTarget as HTMLElement;
          if (!relatedTarget?.closest('.hover-content')) {
            setIsHovered(false);
          }
        }}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-70 p-4 flex flex-col justify-between hover-content"
          style={{ zIndex: isVinylHovered ? 1 : 7 }} // Keep hover content at same level as card when vinyl hovered
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? 0 : "-100%" }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h3 className="text-2xl text-white relative pb-4 font-lexend">{title}</h3>
            <p className="text-white mb-2">{date}</p>
            <p className="text-white mb-2">{location}</p>
            <p className="text-white">{description}</p>
          </div>
          <button 
            onClick={() => setShowPopup(true)}
            className="button bg-white text-black py-2 px-4 rounded self-start overflow-hidden hover-content"
          >
            <span className="inline-block">
              {"VIEW MORE".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="letter inline-block"
                  initial={{ rotateX: 0, opacity: 1 }}
                  animate={{ rotateX: isHovered ? 360 : 0, opacity: 1 }}
                  transition={{ duration: 1.0, delay: index * 0.1 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </button>
        </motion.div>
        <div className="absolute top-0 left-0 p-4" style={{ zIndex: isVinylHovered ? 1 : 10 }}>
          <h3 className="text-2xl text-white relative pb-4 font-lexend">{title}</h3>
        </div>
      </div>

      {showPopup && (
        <EventPopup
          id={title}
          title={title}
          date={date}
          location={location}
          description={description}
          category={category}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  )
}

