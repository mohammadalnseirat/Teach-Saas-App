"use client";

import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { MenuIcon, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { SignedIn, UserButton, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar sticky top-0 z-50 border-b border-b-gray-300 bg-gradient-to-r from-gray-50 to-gray-200 shadow-sm">
      <div className="container mx-auto px-4  flex items-center justify-between">
        <Link href={"/"}>
          <div className="flex items-center gap-2.5 border border-purple-600 rounded-md shadow-md">
            <Image
              src={"/images/logo.svg"}
              alt="logo"
              width={46}
              height={44}
              className="object-contain rounded-md"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 cursor-pointer bg-purple-800 border border-purple-600 rounded-md hover:bg-purple-700 transition-colors"
          >
            <MenuIcon className="size-6 text-purple-200" />
          </button>
          <NavItems isOpen={isOpen} setIsOpen={setIsOpen} />
          <SignedOut>
            <SignInButton>
              <button className="hover:text-red-700 cursor-pointer border border-gray-300 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-gray-700  transition-all duration-300 flex items-center gap-2">
                <LogIn className="size-5" />
                <p>Sign in</p>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
            <SignOutButton>
              <button className="hover:text-red-900 cursor-pointer border border-gray-300 px-3 py-2 bg-white/20 hover:bg-red-200 rounded-md text-gray-700  transition-all duration-300">
                <LogOut className="size-5" />
                
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
