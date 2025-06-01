"use client";

import Link from "next/link";
import { Home, Users, BookOpen, XIcon, CreditCard } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Companions",
    href: "/companions",
    icon: Users,
  },
  {
    label: "My Journey",
    href: "/my-journey",
    icon: BookOpen,
  },
  {
    label: "Subscription",
    href: "/subscription",
    icon: CreditCard,
  },
];

interface INavItemsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItems = ({ isOpen, setIsOpen }: INavItemsProps) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  //! UseEffect to close sidebar when clicking outside:
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    //! Add event listener to the document:
    document.addEventListener("mousedown", handleClickOutSide);

    //! Cleanup event listener:
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4">
        {NAV_ITEMS.map((item, Idx) => {
          const Icon = item.icon;
          const Label = item.label;
          const Href = item.href;
          const isActive = pathname === Href;
          return (
            <Link
              href={Href}
              key={Label + Idx}
              className={`flex items-center gap-2 ${cn(
                isActive && "text-primary font-semibold"
              )}`}
            >
              <Icon className="size-5" />
              <p>{Label}</p>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-gray-100 to-gray-200 border-l border-gray-300 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex mt-20 flex-col items-center justify-center">
          <button
            className="absolute cursor-pointer top-4 right-4 text-red-700 hover:text-red-900 hover:bg-red-200 rounded-md p-2 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            <XIcon className="size-6" />
          </button>
          <ul className="w-full px-4 space-y-2">
            {NAV_ITEMS.map((item, Idx) => {
              const Icon = item.icon;
              const Label = item.label;
              const Href = item.href;
              const isActive = pathname === Href;
              return (
                <li key={Label + Idx} className="w-full">
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={Href}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-red-200 text-red-900 font-semibold"
                        : "hover:bg-red-100/50"
                    )}
                  >
                    <div className="w-6 flex justify-center">
                      <Icon className="size-5" />
                    </div>
                    <span>{Label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavItems;
