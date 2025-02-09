git
"use client";

import Image from "next/image";

interface Sponsor {
  name: string;
  image: string;
}

const sponsors: Sponsor[] = [
  { name: "Sponsor 1", image: "/1.png" },
  { name: "Sponsor 2", image: "/2.png" },
  { name: "Sponsor 3", image: "/3.png" },
  { name: "Sponsor 4", image: "/1.png" },
  { name: "Sponsor 5", image: "/2.png" },
];

interface SponsorSliderProps {
  speed?: number; // Animation duration in seconds
}

export default function SponsorSlider({ speed = 100 }: SponsorSliderProps) {
  return (
    <div className="w-full relative overflow-hidden">
      <div
        className="flex animate-scroll"
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Double the sponsors array to create seamless loop */}
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[200px] mx-4 bg-white/10 backdrop-blur-sm 
                      rounded-lg p-6 hover:scale-110 hover:bg-white/20 
                      transition-transform duration-300"
          >
            <Image
              src={sponsor.image}
              alt={sponsor.name}
              width={200}
              height={200}
              className="w-full h-auto object-contain"
            />
            <p className="text-white text-sm font-medium text-center mt-2">
              {sponsor.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
