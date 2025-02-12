"use client";

import Team from "@/components/team";
import InteractiveCursor from "@/components/interactiveCursor";
import LocomotiveScrollProvider from "@/components/locomotiveScroll";
import Footer from "@/components/footer";
import Navbar from "@/components/navBar";

export default function TeamPage() {
  return (
    <LocomotiveScrollProvider>
      <InteractiveCursor />
      <Navbar />
      <Team />
      <Footer />
    </LocomotiveScrollProvider>
  );
} 