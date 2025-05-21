'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';

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
      
      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-white bg-blue-1 hover:bg-blue-1/80 px-4 py-2 rounded-lg">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-white bg-blue-1 hover:bg-blue-1/80 px-4 py-2 rounded-lg">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;