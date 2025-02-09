"use client";

import { useEffect, useState } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

import EventCard from "@/components/eventCard";
import InteractiveCursor from "@/components/interactiveCursor";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  description: string;
  registrationLink: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Codeathon",
    date: "March 15-17, 2024",
    location: "Tech Arena",
    image: "/3.png",
    description: "Showcase your technical skills through coding competitions, hackathons, and robotics challenges.",
    registrationLink: "#",
    category: "Technical"
  },
  {
    id: 2,
    title: "Treasure Hunt",
    date: "March 16-18, 2024",
    location: "Cultural Center",
    image: "/2.png",
    description: "Express yourself through art, music, dance, and various cultural competitions.",
    registrationLink: "#",
    category: "Non-Technical"
  },
  {
    id: 3,
    title: "UI/UX",
    date: "March 15-18, 2024",
    location: "Learning Hub",
    image: "/1.png",
    description: "Learn from industry experts in hands-on workshops covering cutting-edge technologies.",
    registrationLink: "#",
    category: "Workshops"
  }
];

export default function Events() {
  // const [selectedImage, setSelectedImage] = useState<number>(0);
  const [scrolled, setScrolled] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  

  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = (filter: string) => {
    if (filter === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === filter));
    }
    setActiveFilter(filter);
  };

  return (
    <div className="cursor-none">
      <InteractiveCursor />
      <div data-scroll-container className="relative min-h-screen overflow-x-hidden">
          {/* Background with blur effect */}
          <div 
            className={`fixed inset-0 bg-[url('/TKback2.png')] bg-cover bg-center transition-all duration-700 ${
              scrolled ? 'backdrop-blur-md' : ''
            }`}
          />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-[#050505] bg-opacity-70 z-10"></div>

        <NavBar />

        {/* Event Filter Section */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-screen">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"></h1>
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
  <button
className={`px-6 py-2 rounded-full border border-white transition-all duration-300 ease-in-out ${
    activeFilter === "all"
      ? "bg-white text-black font-semibold"
      : "text-white hover:bg-white hover:text-black"
  }`}    onClick={() => handleFilterChange("all")}
  >
    All
  </button>
  <button
    className={`px-6 py-2 rounded-full border border-white transition-all duration-300 ease-in-out ${
      activeFilter === "Technical"
        ? "bg-white text-black font-semibold"
        : "text-white hover:bg-white hover:text-black"
    }`}
    onClick={() => handleFilterChange("Technical")}
  >
    Technical
  </button>
  <button
    className={`px-6 py-2 rounded-full border border-white transition-all duration-300 ease-in-out ${
      activeFilter === "Non-Technical"
        ? "bg-white text-black font-semibold"
        : "text-white hover:bg-white hover:text-black"
    }`}
    onClick={() => handleFilterChange("Non-Technical")}
  >
    Non-Technical
  </button>
  <button
    className={`px-6 py-2 rounded-full border border-white transition-all duration-300 ease-in-out ${
      activeFilter === "Workshops"
        ? "bg-white text-black font-semibold"
        : "text-white hover:bg-white hover:text-black"
    }`}
    onClick={() => handleFilterChange("Workshops")}
  >
    Workshops
  </button>
</div>

{/* Event Cards */}
<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                image={event.image}
                description={event.description}
                registrationLink={event.registrationLink}
                category={event.category}
              />
        ))}
      </div>
    </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

