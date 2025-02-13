"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EventPopupProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  onClose: () => void;
}

export default function EventPopup({ 
  id, 
  title, 
  date, 
  location, 
  description, 
  category, 
  onClose 
}: EventPopupProps) {
  const [playerName, setPlayerName] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Update body overflow handling
  useEffect(() => {
    // Store original overflow
    const originalOverflow = document.body.style.overflow;
    // Set overflow to hidden when popup opens
    document.body.style.overflow = 'hidden';
    
    // Restore original overflow when popup closes
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (popupRef.current) {
        popupRef.current.style.position = 'fixed';
        popupRef.current.style.top = '50%';
        popupRef.current.style.left = '50%';
        popupRef.current.style.transform = 'translate(-50%, -50%)';
      }
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    }
  }, []);

  const addToCart = () => {
    if (!playerName.trim()) {
      alert("Please enter a player name");
      return;
    }

    // Get existing cart or initialize new one
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");

    // Add event to cart if not already present
    if (!cart.includes(id)) {
      cart.push(id);
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    // Store player name for this event
    const eventPlayers = JSON.parse(sessionStorage.getItem(id) || "[]");
    eventPlayers.push(playerName);
    sessionStorage.setItem(id, JSON.stringify(eventPlayers));

    alert("Added to cart successfully!");
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={popupRef}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        className="fixed left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        style={{ 
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative noScrollbar"
          style={{
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="sticky top-0 left-0 right-0 bg-gradient-to-br from-green-800 to-green-900 p-8 pb-4 z-10">
            <div className="flex justify-between items-start">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400"
              >
                {title}
              </motion.h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="text-gray-300 hover:text-gray-100 transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>
          </div>

          <div className="px-8 pb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 mb-6"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-300">Date:</span>
                <span className="text-sm text-gray-100">{date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-300">Location:</span>
                <span className="text-sm text-gray-100">{location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-300">Category:</span>
                <span className="px-3 py-1 text-sm bg-green-700 text-green-100 rounded-full">
                  {category}
                </span>
              </div>
              <p className="text-gray-200 leading-relaxed text-justify [text-align-last:left] hyphens-auto break-words" style={{ wordSpacing: '-0.05em' }}>
                {description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter player name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-green-700 rounded-xl 
                           focus:border-green-400 focus:ring-2 focus:ring-green-400 
                           transition-all duration-200 outline-none bg-green-900 text-gray-100 placeholder-gray-400"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-600 to-teal-600 opacity-10 blur-xl rounded-xl" />
              </div>

              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-gray-100 bg-green-700 
                           hover:bg-green-600 transition-colors duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addToCart}
                  className="px-6 py-2.5 rounded-xl text-white 
                           bg-gradient-to-r from-green-600 to-teal-600
                           hover:from-green-500 hover:to-teal-500 
                           transition-colors duration-200"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}