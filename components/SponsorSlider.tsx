// "use client";

// import Image from "next/image";

// interface Sponsor {
//   name: string;
//   image: string;
// }

// const sponsors: Sponsor[] = [
//   { name: "Sponsor 1", image: "/1.png" },
//   { name: "Sponsor 2", image: "/2.png" },
//   { name: "Sponsor 3", image: "/3.png" },
//   { name: "Sponsor 4", image: "/1.png" },
//   { name: "Sponsor 5", image: "/2.png" },
// ];

// interface SponsorSliderProps {
//   speed?: number; // Animation duration in seconds
// }

// export default function SponsorSlider({ speed = 20 }: SponsorSliderProps) {
//   return (
//     <section  className="z-10 backdrop-blur-sm flex flex-col items-center justify-center py-16 px-4" data-scroll-section>
//     <div className="w-full relative overflow-hidden">
//       <div
//         className="flex animate-scroll"
//         style={{ animationDuration: `${speed}s` }}
//       >
//         {/* Double the sponsors array to create seamless loop */}
//         {[...sponsors, ...sponsors].map((sponsor, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[400px] mx-4 bg-white/10 backdrop-blur-sm 
//                       rounded-lg p-6 hover:scale-110 hover:bg-white/20 
//                       transition-transform duration-300"
//           >
//             <Image
//               src={sponsor.image}
//               alt={sponsor.name}
//               width={500}
//               height={400}
//               className="w-full h-auto object-contain"
//             />
//             <p className="text-white text-sm font-medium text-center mt-2">
              
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Sponsor {
  name: string;
  image: string;
}

const sponsors: Sponsor[] = [
  { name: "Sponsor 1", image: "/1.png" },
  { name: "Sponsor 2", image: "/2.png" },
  { name: "Sponsor 3", image: "/3.png" },
  { name: "Sponsor 1", image: "/1.png" },
  { name: "Sponsor 2", image: "/2.png" },
  { name: "Sponsor 3", image: "/3.png" },
  { name: "Sponsor 1", image: "/1.png" },
  { name: "Sponsor 2", image: "/2.png" },
  { name: "Sponsor 3", image: "/3.png" },  
];

interface SponsorSliderProps {
  speed?: number; // Animation duration in seconds
}

export default function SponsorSlider({ speed = 20 }: SponsorSliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const totalSlides = sponsors.length * 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (totalSlides * 400));
    }, speed * 50);
    return () => clearInterval(interval);
  }, [speed, totalSlides]);

  const getSlideClass = (index: number) => {
    // Calculate the position of the slide in the visible frame
    const centerIndex = Math.floor(scrollPosition / 400) % sponsors.length;
    return centerIndex === index ? "scale-110 z-10" : "scale-130 z-10";
  };

  return (
    <section className="z-10 backdrop-blur-sm flex flex-col items-center justify-center py-16 px-4" data-scroll-section>
      <div className="w-full relative overflow-hidden">
        <div
          className="flex animate-scroll"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {/* Double the sponsors array to create seamless loop */}
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[400px] mx-4 bg-white/10 backdrop-blur-sm 
                      rounded-lg p-6 transition-transform duration-300 ${getSlideClass(index)}`}
            >
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                width={500}
                height={400}
                className="w-full h-auto object-contain"
              />
              <p className="text-white text-sm font-medium text-center mt-2">
                {sponsor.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
