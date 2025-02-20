"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        if (window.scrollY > 0) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const isLandingPage = pathname === "/"

  return (
    <nav
      className={`fixed left-0 right-0 z-20 h-20 transition-colors duration-300 ${isLandingPage && isScrolled ? "bg-black" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center space-x-2">
          <div className="absolute left-10 top-2">
            <Image src="/tk25-logo.svg" alt="Icon" width={35} height={35} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          <Link href="/" className="text-white hover:text-gray-300 text-lg font-lexend">
            Home
          </Link>
          <Link href="Events" className="text-white hover:text-gray-300 text-lg font-lexend">
            Events
          </Link>
          <Link href="Cart" className="text-white hover:text-gray-300 text-lg font-lexend">
            Cart
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 p-5" data-hoverable>
          <Link
            href="/"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            href="Events"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={toggleMobileMenu}
          >
            Events
          </Link>
          <Link
            href="Cart"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={toggleMobileMenu}
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  )
}

