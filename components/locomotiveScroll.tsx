"use client"

import { useEffect, ReactNode } from "react"
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
  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window === "undefined") return

    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement

      if (!scrollContainer) return

      const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        ...options,
        
        smartphone: { smooth: false }
      })

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

      // Cleanup
      return () => {
        anchorLinks.forEach(link => {
          link.removeEventListener("click", handleAnchorClick)
        })
        locoScroll.destroy()
      }
    }

    initLocomotiveScroll()
  }, [options])

  return (
    <div data-scroll-container>
      {children}
    </div>
  )
} 