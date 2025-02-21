"use client"

import { useEffect, ReactNode, useState } from "react"
import "locomotive-scroll/dist/locomotive-scroll.css"

interface LocomotiveScrollProps {
  children: ReactNode
  options?: {
    smooth?: boolean
    multiplier?: number
    lerp?: number
  }
}

interface ScrollInstance {
  destroy: () => void;
  scrollTo: (target: HTMLElement, options: { offset: number; duration: number }) => void;
  update: () => void;
} 

export default function LocomotiveScrollProvider({ 
  children, 
  options = { 
    smooth: true,
    multiplier: 1,
    lerp: 0.1
  } 
}: LocomotiveScrollProps) {
  const [locomotiveInstance, setLocomotiveInstance] = useState<ScrollInstance | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let instance: ScrollInstance | null = null;

    const initLocomotiveScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default
        const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement

        if (!scrollContainer) {
          console.warn("Scroll container not found");
          return;
        }

        // Cleanup any existing instance
        if (locomotiveInstance) {
          locomotiveInstance.destroy();
        }

        // Initialize with device-specific options
        instance = new LocomotiveScroll({
          el: scrollContainer,
          ...options,
          smooth: window.innerWidth > 768 ? options.smooth : false,
          smartphone: {
            smooth: false,
            breakpoint: 767
          },
          tablet: {
            smooth: false,
            breakpoint: 1024
          }
        }) as ScrollInstance;

        setLocomotiveInstance(instance);

        // Handle anchor links
        const handleAnchorClick = (event: MouseEvent) => {
          event.preventDefault()
          const target = event.currentTarget as HTMLAnchorElement
          const targetId = target.getAttribute("href")?.substring(1)
          const targetElement = document.getElementById(targetId || "")

          if (targetElement && instance) {
            instance.scrollTo(targetElement, {
              offset: 0,
              duration: 1000,
            })
          }
        }

        const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
        anchorLinks.forEach(link => {
          link.addEventListener("click", handleAnchorClick)
        })

        // Force multiple updates after initialization
        setTimeout(() => {
          instance?.update();
        }, 500);

        setTimeout(() => {
          instance?.update();
        }, 1000);
      } catch (error) {
        console.error("Error initializing Locomotive Scroll:", error);
      }
    }

    // Add a small delay before initialization
    const timer = setTimeout(() => {
      initLocomotiveScroll();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (instance) {
        instance.destroy();
      }
    }
  }, [options, isClient]);

  return (
    <div data-scroll-container className="relative">
      {children}
    </div>
  );
} 