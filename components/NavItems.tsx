"use client";

import Link from "next/link";
import { Home, Users, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
];

const NavItems = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4">
      {NAV_ITEMS.map((item, Idx) => {
        const Icon = item.icon;
        const Label = item.label;
        const Href = item.href;
        const isActive = pathname === Href;
        return (
          <Link
            href={Href}
            key={Label + Idx}
            className={`flex items-center gap-2 ${cn(isActive && "text-primary font-semibold")}`}
          >
            <Icon className="size-5" />
            <p>{Label}</p>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
