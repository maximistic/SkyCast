"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon, MapPinIcon } from "@heroicons/react/24/solid";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="text-lg font-bold">SkyCast</div>
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <SearchBar />
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-6 w-6 mr-2" />
            <span>Your Location</span>
          </div>
        </div>
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

      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-2 space-y-4">
          <div className="relative">
            <SearchBar />
          </div>
          <div className="flex items-center text-white">
            <MapPinIcon className="h-6 w-6 mr-2" />
            <span>Your Location</span>
          </div>
        </div>
      )}

    </nav>
  );
}
