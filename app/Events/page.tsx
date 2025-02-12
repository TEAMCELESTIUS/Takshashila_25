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

// Helper function to get random date between March 15-18, 2024
const getRandomDate = () => {
  const dates = ["March 15", "March 16", "March 17", "March 18"];
  return `${dates[Math.floor(Math.random() * dates.length)]}, 2024`;
};

// Helper function to get random location
const getRandomLocation = () => {
  const locations = [
    "Tech Arena",
    "Innovation Hub",
    "Design Studio",
    "Workshop Lab",
    "Main Auditorium",
    "Seminar Hall",
    "Creative Space",
    "Learning Center"
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

// Helper function to get random image
const getRandomImage = () => {
  const images = ["/1.png", "/2.png", "/3.png"];
  return images[Math.floor(Math.random() * images.length)];
};

const eventlist: CustomEvent[] = [
  // Original events
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
  },
  // Additional events
  ...Array.from({ length: 57 }, (_, index) => {
    const categories: ("Technical" | "Non-Technical" | "Workshops")[] = ["Technical", "Non-Technical", "Workshops"];
    const eventTypes = {
      Technical: [
        "Hackathon", "Coding Challenge", "Robotics Competition", "AI Workshop", "Cybersecurity CTF",
        "Data Science Sprint", "IoT Challenge", "Mobile App Dev", "Web Development", "Cloud Computing"
      ],
      "Non-Technical": [
        "Art Exhibition", "Music Festival", "Dance Competition", "Photography Contest", "Literary Quiz",
        "Debate Championship", "Fashion Show", "Cultural Performance", "Gaming Tournament", "Talent Show"
      ],
      Workshops: [
        "Design Thinking", "Digital Marketing", "Project Management", "Public Speaking", "Leadership Skills",
        "Content Creation", "Business Analytics", "Entrepreneurship", "Creative Writing", "Product Design"
      ]
    };

    const category = categories[Math.floor(Math.random() * categories.length)];
    const eventType = eventTypes[category][Math.floor(Math.random() * eventTypes[category].length)];
    
    return {
      id: index + 4,
      title: `${eventType} ${Math.floor(Math.random() * 100 + 1)}`,
      category: category,
      date: getRandomDate(),
      location: getRandomLocation(),
      image: getRandomImage(),
      description: `Join us for an exciting ${category.toLowerCase()} event focused on ${eventType.toLowerCase()}. This event promises to bring together enthusiasts and experts for an unforgettable experience.`,
      registrationLink: "#"
    };
  })
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
    <div className="curser-none">
      <NavBar />
      <InteractiveCursor />
      
      {/* Integrated Eventsdisc Component */}
      <Eventsdisc events={eventlist} />
      
      <Footer />
    </div>
  );
}
