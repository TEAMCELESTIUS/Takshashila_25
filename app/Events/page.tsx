"use client"; // Add this if using Next.js App Router (app directory)

import React from "react"; // Ensure React is imported
import EventCard from "@/components/eventCard"; // Ensure correct import path

const events = [
  {
    id: 1,
    title: "Codeathon",
    date: "March 15-17, 2024",
    location: "Tech Arena",
    image: "/3.png",
    description:
      "Showcase your technical skills through coding competitions, hackathons, and robotics challenges.",
    registrationLink: "#",
    category: "Technical",
  },
  {
    id: 2,
    title: "Treasure Hunt",
    date: "March 16-18, 2024",
    location: "Cultural Center",
    image: "/2.png",
    description:
      "Express yourself through art, music, dance, and various cultural competitions.",
    registrationLink: "#",
    category: "Non-Technical",
  },
  {
    id: 3,
    title: "UI/UX",
    date: "March 15-18, 2024",
    location: "Learning Hub",
    image: "/1.png",
    description:
      "Learn from industry experts in hands-on workshops covering cutting-edge technologies.",
    registrationLink: "#",
    category: "Workshops",
  },
];

export default function EventsPage() {
  return (
    <div 
            className={` bg-[url('/TKback2.png')] bg-cover bg-center absolute inset-0 bg-black opacity-40" `}>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
    </div>
  );
}
