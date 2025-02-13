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

export default function LocomotiveScrollProvider({ 
  children, 
  options = { 
    smooth: true,
    multiplier: 1,
    lerp: 0.1
  } 
}: LocomotiveScrollProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let locoScroll: any = null;

    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement

      if (!scrollContainer) return;

      // Cleanup any existing instance
      if (locoScroll) {
        locoScroll.destroy();
      }

      locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        ...options,
        smartphone: { smooth: false }
      });

      // Handle anchor links
      const handleAnchorClick = (event: MouseEvent) => {
        event.preventDefault()
        const target = event.currentTarget as HTMLAnchorElement
        const targetId = target.getAttribute("href")?.substring(1)
        const targetElement = document.getElementById(targetId || "")

        if (targetElement) {
          locoScroll.scrollTo(targetElement, {
            offset: 0,
            duration: 1000,
          })
        }
      }

      const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
      anchorLinks.forEach(link => {
        link.addEventListener("click", handleAnchorClick)
      })

      // Force a refresh after initialization
      setTimeout(() => {
        locoScroll.update();
      }, 500);
    }

    initLocomotiveScroll();

    return () => {
      if (locoScroll) {
        locoScroll.destroy();
      }
    }
  }, [options, isClient]);

  return (
    <div data-scroll-container>
      {children}
    </div>
  );
} 