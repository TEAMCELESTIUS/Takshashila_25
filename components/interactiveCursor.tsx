"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  note: string;
  id: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const musicNotes = ["♩", "♪", "♫", "♬", "♭", "♮", "𝄞", "𝄡", "𝄠", "𝄢", "𝄟"];

export default function InteractiveCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [clicked, setClicked] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(Date.now());
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTime.current;
      const distance = Math.hypot(
        newPosition.x - lastPosition.current.x,
        newPosition.y - lastPosition.current.y
      );

      if (distance > 35 || timeSinceLastMove > 100) {
        lastPosition.current = newPosition;
        lastMoveTime.current = now;

        setTrail((prevTrail) => [
          ...prevTrail.slice(-9),
          {
            x: newPosition.x,
            y: newPosition.y,
            note: musicNotes[Math.floor(Math.random() * musicNotes.length)],
            id: now,
          },
        ]);
      }
    };

    const handleMouseStop = () => setTrail([]);

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      setClicked(true);
      setTimeout(() => setClicked(false), 1000);

      for (let i = 0; i < 3; i++) {
        const newRipple = { x, y, id: Date.now() + i };
        setRipples((prevRipples) => [...prevRipples, newRipple]);
        setTimeout(
          () => setRipples((prevRipples) => prevRipples.filter((r) => r.id !== newRipple.id)),
          1000
        );
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseStop);
    document.addEventListener("click", handleClick);
    document.addEventListener("dblclick", (e) => e.preventDefault());

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseStop);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("dblclick", (e) => e.preventDefault());
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed pointer-events-none z-50"
    >
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            className="absolute text-white text-2xl pointer-events-none"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {point.note}
          </motion.div>
        ))}
      </AnimatePresence>

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute border border-white rounded-full pointer-events-none"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 50, height: 50, opacity: 0, x: -25, y: -25 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          width: "16px",
          height: "16px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
        animate={{
          width: clicked ? "14px" : "13px",
          height: clicked ? "14px" : "13px",
          borderRadius: clicked ? ["50%", "15%", "25%"] : ["25%", "15%", "50%"],
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
}
