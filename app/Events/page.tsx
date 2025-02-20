"use client";

import { useEffect, useState } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

import InteractiveCursor from "@/components/interactiveCursor";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import Eventsdisc from "@/components/event_selector";
import MobileEventSelector from "@/components/MobileEventSelector";

interface CustomEvent {
  id: number;
  title: string;
  category: "Technical" | "Non-Technical" | "Workshops" | "All";
  date: string;
  location: string;
  image: string;
  description: string;
  registrationLink: string;
}

const eventlist: CustomEvent[] = [
  {
    id: 1,
    title: "Tech Quest",
    category: "Technical",
    date: "March 15, 2024",
    location: "Tech Arena",
    image: "/tech/TECHQUIZ.jpg",
    description: `Science and Technology revolutionize our lives, but memory, tradition and myth frame
our response. It's a perfect combination of smart and fun. You win or you learn- either
way it's win-win.`,
    registrationLink: "#"
  },
  {
    id: 2,
    title: "H2O Rocketry",
    category: "Technical",
    date: "March 16, 2024",
    location: "Innovation Hub",
    image: "/tech/H2OROCKETRY.png",
    description: `It all looked so easy when you did it with paper-where valves never froze, gyros never
drifted and rocked motors did not blow up in your face. Build your own rocket and bring
it on the floor that blast the sky`,
    registrationLink: "#"
  },
  {
    id: 3,
    title: "Paper Presentation",
    category: "Technical",
    date: "March 17, 2024",
    location: "Design Studio",
    image: "/tech/PAPERPRESENTATION.jpg",
    description: `Paper presentation is a two-member competition where each team is required to provide a
written representation of your idea in English, about a given theme and present it with a
presentation (PowerPoint) in front of the judges.`,
    registrationLink: "#"
  },
  {
    id: 4,
    title: "Brand Marketing",
    category: "Technical",
    date: "March 18, 2024",
    location: "Workshop Lab",
    image: "/tech/BRANDMARKET.png",
    description: `Business Marketing is an event similar to Shark Tank . Topics or Products will be given on the
spot and students should present the business talk on the given topic like providing quotations
and handling the business of the product given topics`,
    registrationLink: "#"
  },
  {
    id: 5,
    title: "Radio Wheels (RC Racing)",
    category: "Technical",
    date: "March 15, 2024",
    location: "Main Auditorium",
    image: "/tech/RADIOWHEELS.jpg",
    description: `Competition is what makes us work harder. Crash tests, pit stops and obstacle courses. Race to
the finish line while revving your engines. Creativity and strategy packs a punch in this RC race!`,
    registrationLink: "#"
  },
  {
    id: 6,
    title: "Sky Surge (Drone Racing)",
    category: "Technical",
    date: "March 16, 2024",
    location: "Seminar Hall",
    image: "/tech/RCRACING.jpg",
    description: `Are you looking for an exhilarating challenge? Then come join us and race your drone through
an insane first-person course! Compete with other daring pilots and soak in the thrilling
atmosphere as you fight for the top spot. Don't miss out, it's an enthralling event that does not
come by often.`,
    registrationLink: "#"
  },
  {
    id: 7,
    title: "Trial Tracks (Line Follower)",
    category: "Technical",
    date: "March 17, 2024",
    location: "Creative Space",
    image: "/tech/TRIAL TRACKS.png",
    description: `Where precision meets speed, steer your way to the end-line. Stay on track and you'll stay in the
game. Wander off track and you'll have to walk out. Gather your courage and components! Are
you up for this rip-roaring race where only the fast and furious finishes first?`,
    registrationLink: "#"
  },
  {
    id: 8,
    title: "Binary Symphony (Duo Code)",
    category: "Technical",
    date: "March 18, 2024",
    location: "Learning Center",
    image: "/tech/BINARYSYMPHONY.png",
    description: `Coding duos! Two participants are paired and are given a problem to solve.
The duo should take turns to code the solution. But the catch is, they can't be together at the
same time. As one person codes, the other person is isolated. Swaps occur at regular
intervals and the first duo to solve the problem wins.`,
    registrationLink: "#"
  },
  {
    id: 9,
    title: "Reverse Engineering Challenge",
    category: "Technical",
    date: "March 15, 2024",
    location: "Tech Arena",
    image: "/tech/REVERSEENGINEERING.jpg",
    description: `Reverse Engineering Challenge is a thrilling tech event where participants analyze software,
hardware, or encrypted files to decode and understand their functionality. The challenge involves
breaking down systems, uncovering hidden logic, and ethically modifying or recreating them. It
tests problem-solving, analytical thinking, and cybersecurity skills in a controlled environment.
Are you ready to unlock the secrets within the code?`,
    registrationLink: "#"
  },
  {
    id: 10,
    title: "Dark Web Treasure Hunt",
    category: "Technical",
    date: "March 16, 2024",
    location: "Innovation Hub",
    image: "/tech/DARKWEBTH.jpg",
    description: `Dark Web Treasure Hunt is a cybersecurity, ethical hacking, and OSINT challenge where
participants become cyber-detectives. They decode hidden messages, trace digital footprints, and
break encryptions to uncover clues. The event simulates the thrill of navigating the "Dark Web"
(without actual access) to solve mysteries. The ultimate goal is to reach the final treasure using
analytical thinking and cyber skills. Are you ready to crack the code?`,
    registrationLink: "#"
  },

  // Non-Technical Events
  {
    id: 11,
    title: "Solo Dance - Dance Till Dawn",
    category: "Non-Technical",
    date: "March 17, 2024",
    location: "Workshop Lab",
    image: "/nontech/solodance (2).png",
    description: `Do you have what it takes to put on a one-man show? On the dance floor, you are in control of
the rhythm. Set yourself loose and let the music move you. Swing and sway to steal everyone's
hearts!.`,
    registrationLink: "#"
  },
  {
    id: 12,
    title: "Dual Dance - Dynamic Duo",
    category: "Non-Technical",
    date: "March 18, 2024",
    location: "Seminar Hall",
    image: "/nontech/DUODANCE.jpg",
    description: `Step up, show off, and electrify the stage with double the moves, double the grace and
double the excitement.`,
    registrationLink: "#"
  },
  {
    id: 13,
    title: "Behind the Yellow Tapes",
    category: "Non-Technical",
    date: "March 15, 2024",
    location: "Creative Space",
    image: "/nontech/BEHINDTHEYT.png",
    description: `Do you have what it takes to solve the case and bring justice to the departed? Test your wits to
see if your detective skills are as good as Rust Cohle's. Dive into the case files and piece together
the clues to uncover the killer. Are you up for the challenge?`,
    registrationLink: "#"
  },
  {
    id: 14,
    title: "Cypher",
    category: "Non-Technical",
    date: "March 16, 2024",
    location: "Learning Center",
    image: "/nontech/CYPHER2.png",
    description: `Calling out all high-octane hip-hop dancers! Once you step in, there's no going back. Diss your
opponent, not with your words but with your dance. Steal the spotlight with your swings and rap
steps.`,
    registrationLink: "#"
  },
  {
    id: 15,
    title: "Fun Zone",
    category: "Non-Technical",
    date: "March 17, 2024",
    location: "Workshop Lab",
    image: "/nontech/FUNZONE.png",
    description: `Buckle up for an exhilarating escapade at our much-anticipated FunZone event – an
extraordinary carnival of boundless joy, unabated excitement, and a relentless onslaught of
non-stop entertainment! This is not just another run-of-the-mill gathering; it's a flamboyant
celebration meticulously crafted to awaken the dormant inner child in every attendee.`,
    registrationLink: "#"
  },
  {
    id: 16,
    title: "Graphite-ty",
    category: "Non-Technical",
    date: "March 18, 2024",
    location: "Seminar Hall",
    image: "/nontech/Graphitely.jpeg",
    description: `Where every stroke tells a story, unlock the creativity within and unleash your vision. Sketch
your way to glory 'cause the canvas is calling for a creative masterpiece`,
    registrationLink: "#"
  },
  {
    id: 17,
    title: "Load the Lyrics",
    category: "Non-Technical",
    date: "March 15, 2024",
    location: "Workshop Lab",
    image: "/nontech/LOADTHELYRICS.jpg",
    description: `Watch as the lyrics vanish whilst you warble. Fill in the missing tunes and fix the broken beat.
Will you be able to load the lyrics and launch it forward? Test how rusty your rhythm is, with
Load the Lyrics!`,
    registrationLink: "#"
  },
  {
    id: 18,
    title: "IPL Auction",
    category: "Non-Technical",
    date: "March 16, 2024",
    location: "Workshop Lab",
    image: "/nontech/IPLAUCTION.png",
    description: `What would you do if we said you could auction your way to assemble your dream team? Craft
the most capable cricket team that is a sure sixer squad. Bid, build and dominate the race to boast
a bombarding bonanza!`,
    registrationLink: "#"
  },
  {
    id: 19,
    title: "Kurum Padam",
    category: "Non-Technical",
    date: "March 17, 2024",
    location: "Workshop Lab",
    image: "/nontech/CONNECTIONMUSIC.jpg",
    description: `Show off your unique ideas and perspectives through the power of movies. Craft a captivating
short film that will enthrall the audience and leave them in awe of your creative artistry`,
    registrationLink: "#"
  },
  {
    id: 20,
    title: "Solo Singing - One Voice Magic",
    category: "Non-Technical",
    date: "March 18, 2024",
    location: "Seminar Hall",
    image: "/nontech/solo singing.jpg",
    description: `Music is felt rather than heard. With your beguiling voice, you can touch people's hearts and
enlighten their souls. After all, music is much more than just a tune.`,
    registrationLink: "#"
  },
  {
    id: 21,
    title: "Group Singing - Acapella",
    category: "Non-Technical",
    date: "March 15, 2024",
    location: "Workshop Lab",
    image: "/nontech/group singing.jpg",
    description: `Music is a part of our everyday lives. From the hammering of our hearts to the shrieking of the
cars, it's within us and around us. Amidst the many catastrophic sounds, will your group's
crooning be crowned the best?
Theme: open theme`,
    registrationLink: "#"
  },
  {
    id: 22,
    title: "TK TV",
    category: "Non-Technical",
    date: "March 16, 2024",
    location: "Workshop Lab",
    image: "/nontech/TK TV.jpg",
    description: `Do you have a dream of appearing on TV? Ever wished you could be the star of your own
programme? Are your acting and marketing abilities up to par? You have a platform to fulfill
your fantasies and steal the show, thanks to TK TV!`,
    registrationLink: "#"
  },
  {
    id: 23,
    title: "On-Air - RJ Hunt",
    category: "Non-Technical",
    date: "March 17, 2024",
    location: "Workshop Lab",
    image: "/nontech/ONAIR.jpg",
    description: `Radio affects most intimately, person to person, offering a world of unspoken communication
between the writer- speaker and listener.
Step into the spotlight, grab the microphone, take a moment, and be a part of the legacy.`,
    registrationLink: "#"
  },
  {
    id: 24,
    title: "Reel Making - Real to Reel",
    category: "Non-Technical",
    date: "March 18, 2024",
    location: "Workshop Lab",
    image: "/nontech/REELTOREAL.jpg",
    description: `Videograph your views on our college and capture clips to project your perspective. Summarize
the fervor and magnificence that are rife in our campus!`,
    registrationLink: "#"
  },
  {
    id: 25,
    title: "Stress Interview",
    category: "Non-Technical",
    date: "March 15, 2024",
    location: "Workshop Lab",
    image: "/nontech/stress interview (1).jpg",
    description: `Just like mentally strong people, we must be able to thrive regardless of any added tension. We
have to put our stress in perspective, replace negative thoughts with positive ones and be proud
of our achievements`,
    registrationLink: "#"
  },
  {
    id: 26,
    title: "Treasure Hunt",
    category: "Non-Technical",
    date: "March 16, 2024",
    location: "Workshop Lab",
    image: "/nontech/FREEFIRE.jpg",
    description:`No thief, however skillful, can rob one of knowledge, and that is why knowledge is the best and
desirable treasure to acquire. Treasure Hunt makes better stories when there's treasure at the end.`,
    registrationLink: "#"
  },
  {
    id: 27,
    title: "Surprise Event",
    category: "Non-Technical",
    date: "March 17, 2024",
    location: "Workshop Lab",
    image: "/nontech/suprise.png",
    description: `Whether you're an adventure seeker or just looking for a unique and exciting experience, our
surprise event is the perfect destination. With the element of surprise at every turn, our event
promises to be an experience like no other. We can't reveal too much just yet, but rest assured
that you'll be treated to a day of excitement!`,
    registrationLink: "#"
  },
  {
    id: 28,
    title: "Free Fire",
    category: "Non-Technical",
    date: "March 18, 2024",
    location: "Workshop Lab",
    image: "/nontech/FREEFIRE.jpg",
    description: `Is gaming your domain? Amateur or professional gaming sees no discrimination, only skills,
strategy and rules. So gear up for the battle, prepare and clash in the ultimate showdown`,
    registrationLink: "#"
  },
  {
    id: 29,
    title: "World of Weebs",
    category: "Non-Technical",
    date: "March 15, 2024",
    location: "Workshop Lab",
    image: "/nontech/world.jpg",
    description: `Prove your anime prowess in this epic anime quiz! From Naruto's hidden jutsus to the heroic
quirks of My Hero Academia, cover everything you need to prove yourself as a true anime fan.
Gather your nakama, channel your inner anime protagonist, and let's see who will emerge as the
victor in the World of Weebs! Dattebayo!`,
    registrationLink: "#"
  },
  {
    id: 30,
    title: "Talking Head",
    category: "Non-Technical",
    date: "March 16, 2024",
    location: "Workshop Lab",
    image: "/nontech/TALKINGHEAD.png",
    description: `Do you like to document day-to-day activities? Do you think you can handle a massive event like
Takshashila and document the happenings of this hustling event?`,
    registrationLink: "#"
  },
  {
    id: 31,
    title: "Rap Battle - Rap-a-thon",
    category: "Non-Technical",
    date: "March 17, 2024",
    location: "Workshop Lab",
    image: "/nontech/RAPATHON.png",
    description: `Just get on the mic and spit those rhymes and better go capture this moment and hope it doesn't
pass. Lose yourself in the music, the moment, You own it, you better never let it go. You only get
one shot, do not miss your chance to blow. Keep spilling these raps long till you collapse. Wake
the real slim shady in you.`,
    registrationLink: "#"
  },
  {
    id: 32,
    title: "Battlegrounds Mobile India",
    category: "Non-Technical",
    date: "March 18, 2024",
    location: "Workshop Lab",
    image: "/nontech/PUBG.png",
    description: `Navigate the battlegrounds of BGMI, where every pixel holds the weight of victory. Adapt,
conquer, and carve your legend in the pulse-pounding chaos of mobile warfare.`,
    registrationLink: "#"
  },
  {
    id: 33,
    title: "Aeromodelling",
    category: "Workshops",
    date: "March 15, 2024",
    location: "Workshop Lab",
    image: "/events/workshops/1.png",
    description: "Aeromodelling is an exciting and dynamic field that offers a unique opportunity for students to develop a diverse range of skills across multiple disciplines. Through interactive sessions, this workshop provides a comprehensive understanding of the principles of aerodynamics, electrical engineering, and control systems. Students will learn how to design and build a fully functioning radio-controlled aircraft, gaining valuable experience in problem-solving and critical thinking. It's an exciting and rewarding experience that can inspire the next generation of engineers, designers, and innovators.",
    registrationLink: "#"
  },
  {
    id: 34,
    title: "IoT and Embedded Systems",
    category: "Workshops",
    date: "March 16, 2024",
    location: "Workshop Lab",
    image: "/events/workshops/2.png",
    description: "In this workshop, you will learn about designing and applying IoT systems. You will work on real-world projects and gain hands-on experience in industries like healthcare, agriculture, and transportation. By the end of the workshop, you will have gained valuable knowledge and skills that can be applied to your own projects and career development. Join us to explore the world of IoT and its endless possibilities!",
    registrationLink: "#"
  },
  {
    id: 35,
    title: "Cybersecurity",
    category: "Workshops",
    date: "March 17, 2024",
    location: "Workshop Lab",
    image: "/events/workshops/3.png",
    description: "In today's interconnected digital world, the need for robust cybersecurity measures has never been greater. Whether you're an individual seeking to protect your personal information or a business professional responsible for safeguarding sensitive data, understanding cybersecurity fundamentals is paramount. Join us for an engaging and informative workshop designed to equi participants with the knowledge and skills necessary to navigate the cyber landscape securely.",
    registrationLink: "#"
  },
  {
    id: 36,
    title: "Drone Technology",
    category: "Workshops",
    date: "March 18, 2024",
    location: "Workshop Lab",
    image: "/tech/RCRACING.jpg",
    description: `Have you ever thought about building and controlling your own miniature aircraft? If so, this
drone technology workshop is perfect for you! You'll learn the basic science behind drones and
design a fully functional drone that you can fly one day. Drones have a wide range of potential
applications, from package delivery to the defense industry. This interactive event allows
participants to engage and gain practical knowledge about drone technology.`,
    registrationLink: "#"
  },
  {
    id: 37,
    title: "Full Stack Web Development",
    category: "Workshops",
    date: "March 15, 2024",
    location: "Workshop Lab",
    image: "/tech/BRANDMARKET.png",
    description: `A website and a server designed by a single person, is that even possible? Well, if you know
about full-stack development, it is! In this workshop learn how to program a website and also
gain knowledge on creating exclusive databases and servers for the website that you designed.
The workshop will also focus on best practices for software development, such as version
control, testing, and debugging. By the end of the workshop, participants will have a solid
understanding of full-stack development and be able to build their own web applications from
scratch.`,
    registrationLink: "#"
  },
  {
    id: 38,
    title: "CITIL - Idea to Impact",
    category: "Workshops",
    date: "March 16, 2024",
    location: "Workshop Lab",
    image: "/tech/BINARYSYMPHONY.png",
    description: `In this dynamic workshop, we invite you to unlock the doors to innovation, where creative
thinking is not just encouraged but celebrated. Through hands-on activities, interactive sessions,
and real-world case studies, we aim to ignite the spark of ingenuity within you, empowering you
to think outside conventional boundaries and explore the uncharted territories of entrepreneurial
possibility. Join us in this Entrepreneurship Workshop, where the ordinary transforms into the
extraordinary, and where your entrepreneurial journey takes flight. Together, let's unlock the
doors to a future where innovation knows no bounds, creativity is boundless, and business
success is not just a destination but a continuous and exhilarating journey.`,
    registrationLink: "#"
  },
  {
    id: 39,
    title: "World of Open Source with GitHub",
    category: "Workshops",
    date: "March 17, 2024",
    location: "Workshop Lab",
    image: "/tech/DARKWEBTH.jpg",
    description: `This insightful workshop aims to provide students with practical knowledge of open-source
collaboration, version control using Git and GitHub, and hands-on experience in building
full-stack applications. By fostering a culture of open-source development and introducing
DevOps principles, this workshop will prepare participants for real-world challenges and
industry-relevant practices.`,
    registrationLink: "#"
  },
  {
    id: 40,
    title: "Networking with Linux",
    category: "Workshops",
    date: "March 18, 2024",
    location: "Workshop Lab",
    image: "/tech/H2OROCKETRY.png",
    description: `This Workshop offers participants a thorough understanding of Linux operating systems, basic
command-line usage, networking essentials encompassing TCP/IP, subnetting, and routing, as
well as practical networking commands. Participants engage with live booting, virtualization
using VMware, and gain exposure to Wireshark for network traffic analysis. The workshop also
introduces Nmap for network scanning. Overall, attendees emerge equipped with fundamental
knowledge of Linux, networking concepts, and essential cybersecurity tools, priming them for
further exploration in these domains.`,
    registrationLink: "#"
  }
];

export default function Events() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div 
      className="cursor-none min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #004225 0%, #013220 50%, #002616 100%)',
      }}
    >
      {!isMobile && <InteractiveCursor />}
      
      <div className="relative z-10">
        <NavBar />
        <div className={`relative ${isMobile ? 'pt-16' : ''}`}>
          {isMobile ? (
            <MobileEventSelector events={eventlist} />
          ) : (
            <Eventsdisc events={eventlist} />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
