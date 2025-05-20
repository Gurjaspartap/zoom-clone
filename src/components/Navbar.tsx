'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
//import { SignedIn, UserButton } from '@clerk/nextjs';

//import MobileNav from './MobileNav';

const Navbar = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarRef.current && !(avatarRef.current as any).contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="flex items-center justify-between z-30 w-full bg-dark-2 px-6 py-3 bg-[#1C1F2E]">
      {/* Left: Logo and App Name */}
      <div className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Video Call
        </p>
      </div>
      {/* Right: Avatar */}
      <div className="relative" ref={avatarRef}>
        <button onClick={() => setDropdownOpen((open) => !open)}>
          <Image
            src="/images/avatar-1.jpeg"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
            <Link href="/profile">
              <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Profile</span>
            </Link>
            <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;