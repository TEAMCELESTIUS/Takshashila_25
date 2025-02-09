'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-5 left-0 right-0 z-20 bg-opacity-70">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between ">
        {/* Left Logo */}
        <div className="flex items-center space-x-2">
          <div className="absolute left-10 top-0">
                    <Image
                      src="/tk-logo.svg"
                      alt="Icon"
                      width={48}
                      height={48}
                    />
                  </div>
          
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 ">
          <Link href="#explore" className="text-white hover:text-gray-300 text-lg font-lexend">
            Explore
          </Link>
          <Link href="#proshows" className="text-white hover:text-gray-300 text-lg font-lexend">
            Pro Shows
          </Link>
          <Link href="#about" className="text-white hover:text-gray-300 text-lg font-lexend">
            About
          </Link>
          <Link href="#contact" className="text-white hover:text-gray-300 text-lg font-lexend">
            Contact
          </Link>
          <Link href="#events" className="text-white hover:text-gray-300 text-lg font-lexend">
            Events
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 p-5">
          <Link
            href="#explore"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={toggleMobileMenu}
          >
            Explore
          </Link>
          <Link
            href="#proshows"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={toggleMobileMenu}
          >
            Pro Shows
          </Link>
          <Link
            href="#about"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            href="#contact"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
