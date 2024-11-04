"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Session } from "next-auth";
import Link from "next/link";
// import { auth } from "../_lib/auth";
import { useState } from "react";
import Logo from "./Logo";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type NavigationProps = {
  session: Session | null;
};

export default function Navigation({ session }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="text-xl">
      {/* BURGER MENU */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <div className="flex gap-4">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <XMarkIcon className="h-8 pb-1 text-white" />
            ) : (
              <Bars3Icon className="h-8 pb-1 text-white" />
            )}
          </button>
        </div>
        {/* <Logo /> */}

        {session?.user ? (
          <Link
            href="/account"
            className="flex items-center gap-3 transition-colors hover:text-accent-400"
          >
            {session?.user?.image ? (
              <img
                src={session.user.image}
                className="h-8 rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="">
                <UserCircleIcon className="h-8" />
              </div>
            )}
            <span>Guest area</span>
          </Link>
        ) : (
          <Link
            href="/account?noAcc"
            className="transition-colors hover:text-accent-400"
          >
            Guest area
          </Link>
        )}
      </div>

      {/* FULL SIZE NAVBAR */}
      <ul className="hidden items-center gap-16 md:flex">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="flex items-center gap-3 transition-colors hover:text-accent-400"
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  className="h-8 rounded-full"
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="rounded-full">
                  <UserCircleIcon className="h-8" />
                </div>
              )}
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>

      {/* MOBILE NAVBAR */}
      <div
        className={`${
          isOpen ? "max-h-96" : "max-h-0"
        } overflow-hidden transition-all duration-300`}
      >
        <ul
          className={`mb-6 ml-1 flex items-center gap-8 overflow-x-auto whitespace-nowrap text-xl`}
        >
          <li>
            <Link
              href="/"
              className="block transition-colors hover:text-accent-400"
              onClick={() => setIsOpen(false)} // Close menu when link clicked
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/cabins"
              className="block transition-colors hover:text-accent-400"
              onClick={() => setIsOpen(false)} // Close menu when link clicked
            >
              Cabins
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="block transition-colors hover:text-accent-400"
              onClick={() => setIsOpen(false)} // Close menu when link clicked
            >
              About
            </Link>
          </li>

          {/* <li>
            <Link
              href="/account"
              className="block transition-colors hover:text-accent-400"
              onClick={() => setIsOpen(false)} // Close menu when link clicked
            >
              Guest area
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
