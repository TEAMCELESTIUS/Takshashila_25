"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FastForward } from "lucide-react";

interface EventPopupProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  onClose: () => void;
}

interface AlertProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'warning' | 'error';
}

const CassetteTapeAlert = ({ isVisible, onClose, message, type }: AlertProps) => {
  const generateBars = (count: number) => {
    return Array.from({ length: count }, () => Math.random() * 0.8 + 0.2);
  };

  const [bars] = useState(generateBars(32));

  const alertStyles = {
    success: {
      color: '#40ff40',
      emoji: '✓',
    },
    warning: {
      color: '#ffff40',
      emoji: '⚠️',
    },
    error: {
      color: '#ff4040',
      emoji: '✕',
    },
  };

  const currentStyle = alertStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ 
            opacity: 0, 
            x: 100,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className="fixed top-8 right-8 z-[9999]"
        >
          {/* Main cassette body */}
          <div className="relative w-[320px] h-[220px] bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden">
            {/* Top ridged section */}
            <div className="absolute top-0 inset-x-0 h-8 bg-[#262626]">
              <div className="flex justify-between px-4 py-1">
                <span className="text-[#505050] text-xs">TDK D90</span>
                <span className="text-[#505050] text-xs">90 MIN</span>
              </div>
              <div className="flex space-x-0.5 mt-1">
                {Array.from({ length: 38 }).map((_, i) => (
                  <div key={i} className="h-3 w-2 bg-[#1a1a1a]" />
                ))}
              </div>
            </div>

            {/* Main tape window */}
            <div className="absolute top-12 inset-x-6 h-24 bg-[#111] rounded-sm border border-[#333]">
              {/* Tape reels */}
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-[#222] relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-2 rounded-full bg-[#181818] border-4 border-[#282828]">
                    <div className="absolute inset-[2px] rounded-full bg-[#151515]" />
                  </div>
                  {/* Reel teeth */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-1 h-3 bg-[#333]"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 60}deg) translateY(-32px)`
                      }}
                    />
                  ))}
                </motion.div>

                <motion.div 
                  className="w-16 h-16 rounded-full bg-[#222] relative"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-2 rounded-full bg-[#181818] border-4 border-[#282828]">
                    <div className="absolute inset-[2px] rounded-full bg-[#151515]" />
                  </div>
                  {/* Reel teeth */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-1 h-3 bg-[#333]"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 60}deg) translateY(-32px)`
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Sound wave visualization */}
              <div className="absolute inset-0 flex items-center justify-center gap-[2px] px-20">
                {bars.map((height, index) => (
                  <motion.div
                    key={index}
                    className="w-1"
                    style={{ backgroundColor: currentStyle.color }}
                    initial={{ height: "10%" }}
                    animate={{ 
                      height: [`${height * 30}%`, `${height * 70}%`, `${height * 30}%`],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.03
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Label area */}
            <div className="absolute bottom-8 inset-x-6 h-20 bg-white rounded-sm transform rotate-[0.5deg]">
              <div className="absolute inset-0 bg-[#f0f0f0] border border-[#ddd] rounded-sm p-2">
                <div className="h-full flex flex-col justify-center items-center">
                  <div className="text-xs text-[#666] uppercase tracking-widest mb-1">
                    {currentStyle.emoji} Side A
                  </div>
                  <div className="text-sm font-bold text-[#333] text-center">
                    {message}
                  </div>
                </div>
              </div>
            </div>

            {/* Cassette holes */}
            <div className="absolute top-[88px] left-[46%] w-3 h-3 bg-black rounded-full" />
            <div className="absolute top-[88px] right-[46%] w-3 h-3 bg-black rounded-full" />

            {/* Bottom details */}
            <div className="absolute bottom-2 inset-x-0 flex justify-between px-4">
              <span className="text-[#444] text-xs">TYPE I NORMAL</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-[#444] hover:text-[#ff4040] transition-colors duration-200"
              >
                <FastForward size={12} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    message: string;
  }>({
    type: 'success',
    message: ''
  });
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
      setShowToast(true);
      setAlertMessage({
        type: 'error',
        message: 'Please enter a player name'
      });
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

    // Show success cassette alert
    setShowToast(true);
    setAlertMessage({
      type: 'success',
      message: 'Successfully added to cart!'
    });
    
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addToCart();
    }
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
    <>
      <AnimatePresence>
        <motion.div
          ref={popupRef}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          className="fixed left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm flex justify-center items-center z-40 p-4"
          style={{ 
            width: '100vw',
            height: '100vh',
            position: 'fixed',
          }}
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative 
                     [&::-webkit-scrollbar]:w-2 
                     [&::-webkit-scrollbar-track]:bg-green-900/20 
                     [&::-webkit-scrollbar-thumb]:bg-green-600/50
                     [&::-webkit-scrollbar-thumb:hover]:bg-green-500/50
                     hover:[&::-webkit-scrollbar-thumb]:bg-green-500/70
                     [scrollbar-width:thin]
                     [scrollbar-color:theme(colors.green.600/50)_theme(colors.green.900/20)]"
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
                    onKeyPress={handleKeyPress}
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
      
      <CassetteTapeAlert 
        isVisible={showToast} 
        onClose={() => setShowToast(false)}
        message={alertMessage.message}
        type={alertMessage.type}
      />
    </>
  );
}