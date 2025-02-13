"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import EventPopup from "./eventPopup"

interface EventCardProps {
  title: string
  date: string
  location: string
  image: string
  description: string
  registrationLink: string
  category: string
  isVinylHovered: boolean
}

export default function EventCard({
  title,
  date,
  location,
  image,
  description,
  category,
  isVinylHovered,
}: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const getZIndex = () => {
    if (isVinylHovered) {
      return 1
    } else {
      return isHovered ? 7 : 6
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
        style={{
          zIndex: getZIndex(),
          transition: "z-index 0.3s, transform 0.3s",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={(e) => {
          const relatedTarget = e.relatedTarget as HTMLElement
          if (!relatedTarget?.closest(".hover-content")) {
            setIsHovered(false)
          }
        }}
        onClick={() => setShowPopup(true)}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          priority
          style={{ 
            objectFit: "cover",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.3s"
          }}
          onLoad={() => setImageLoaded(true)}
          className="transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-70 p-4 flex flex-col justify-between hover-content"
          style={{
            zIndex: isVinylHovered ? 1 : 7,
            paddingTop: "calc(2rem + 2.5em)",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? 0 : "-100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-2">
            <p className="text-white">{date}</p>
            <p className="text-white">{location}</p>
            <p className="text-white mt-2 line-clamp-3">{description}</p>
            {description.length > 150 && (
              <p className="text-gray-400 text-sm italic">Click to read more...</p>
            )}
          </div>
          <div className="mt-4">
            <button
              className="button bg-white text-black py-2 px-4 rounded overflow-hidden hover-content hover:bg-gray-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setShowPopup(true)
              }}
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
          </div>
        </motion.div>
        <div
          className="absolute top-0 left-0 p-4 w-full bg-gradient-to-b from-black/70 to-transparent"
          style={{ zIndex: isVinylHovered ? 1 : 10 }}
        >
          <h3 className="text-2xl text-white font-lexend line-clamp-2">{title}</h3>
        </div>
      </motion.div>

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

