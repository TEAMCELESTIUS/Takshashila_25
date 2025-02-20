'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (shouldClose = true) => {
    if (shouldClose) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <nav className="fixed left-0 right-0 z-[100] bg-opacity-60 h-20 bg-black">
      <div className="max-w-7xl mx-auto px-5 py-5  flex items-center  justify-between ">
        {/* Left Logo */}
        <div className="flex items-center space-x-2">
          <div className="absolute left-10 top-3">
                    <Image
                      src="/tk25-logo.svg"
                      alt="Icon"
                      width={40}
                      height={40}
                    />
                  </div>
          
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 ">
          
          <Link href="/" className="text-white hover:text-gray-300 text-lg font-lexend">
            Home
          </Link>
          <Link href="Events" className="text-white hover:text-gray-300 text-lg font-lexend">
            Events
          </Link>
          <Link href="/Proshows" className="text-white hover:text-gray-300 text-lg font-lexend">
            Proshows
          </Link>
          <Link href="Cart" className="text-white hover:text-gray-300 text-lg font-lexend">
            Cart
          </Link>
          
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => toggleMobileMenu(false)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 p-5 z-[100]" data-hoverable>
          <Link
            href="/"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={() => toggleMobileMenu()}
            scroll={false}
          >
            Home
          </Link>
          <Link
            href="Events"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={() => toggleMobileMenu()}
            scroll={false}
          >
            Events
          </Link>
          <Link
            href="Proshows"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={() => toggleMobileMenu()}
          >
            Proshows
          </Link>
          <Link
            href="Cart"
            className="block text-white text-lg font-lexend py-2 hover:text-gray-300"
            onClick={() => toggleMobileMenu()}
            scroll={false}
          >
            Cart
          </Link>
          
        </div>
      )}
    </nav>
  );
}
