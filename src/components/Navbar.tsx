'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
//import { SignedIn, UserButton } from '@clerk/nextjs';

//import MobileNav from './MobileNav';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex-between fixed top-0 z-30 w-full bg-dark-2 px-6 py-3">
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

      <div className="flex items-center gap-5">
        <Link
          href="/profile"
          className="flex items-center gap-2"
        >
          <Image
            src="/icons/profile.svg"
            alt="profile"
            width={24}
            height={24}
          />
          <p className="text-white max-sm:hidden">Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;