"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex h-full flex-col text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`flex items-center gap-3 px-5 py-5 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 md:gap-4 md:py-3 ${
                pathname === link.href
                  ? "bg-primary-800 hover:!bg-primary-800"
                  : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden md:inline-block">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="md:mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
