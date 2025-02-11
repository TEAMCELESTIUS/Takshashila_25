"use client";

import { useEffect, useState } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

import InteractiveCursor from "@/components/interactiveCursor";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import Eventsdisc from "@/components/event_selector";

interface CustomEvent {
  id: number;
  title: string;
  category: "Technical" | "Non-Technical" | "Workshops" | "All"; // Match the expected category types
  date: string;
  location: string;
  image: string;
  description: string;
  registrationLink: string;
}

const eventlist: CustomEvent[] = [
  {
    id: 1,
    title: "Codeathon",
    date: "March 15-17, 2024",
    location: "Tech Arena",
    image: "/3.png",
    description: "Showcase your technical skills through coding competitions, hackathons, and robotics challenges.",
    registrationLink: "#",
    category: "Technical" // Valid value
  },
  {
    id: 2,
    title: "Treasure Hunt",
    date: "March 16-18, 2024",
    location: "Cultural Center",
    image: "/2.png",
    description: "Express yourself through art, music, dance, and various cultural competitions.",
    registrationLink: "#",
    category: "Non-Technical" // Valid value
  },
  {
    id: 3,
    title: "UI/UX",
    date: "March 15-18, 2024",
    location: "Learning Hub",
    image: "/1.png",
    description: "Learn from industry experts in hands-on workshops covering cutting-edge technologies.",
    registrationLink: "#",
    category: "Workshops" // Valid value
  }
];


export default function Events() {
  const [, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <NavBar />
      <InteractiveCursor />
      
      {/* Integrated Eventsdisc Component */}
      <Eventsdisc events={eventlist} />
      
      <Footer />
    </div>
  );
}
