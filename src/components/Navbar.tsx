"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

type Props = {};

export default function Navbar({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* App Name */}
        <div className="text-lg font-bold">SkyCast</div>

        {/* Desktop Items */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Current Location */}
          <div className="flex items-center">
            <span className="text-xl mr-2">📍</span>
            <span>Your Location</span>
          </div>
        </div>

        {/* Burger Menu for Mobile */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-2 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Current Location */}
          <div className="flex items-center text-white">
            <span className="text-xl mr-2">📍</span>
            <span>Your Location</span>
          </div>
        </div>
      )}
    </nav>
  );
}
