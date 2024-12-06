"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { BiCurrentLocation } from "react-icons/bi";
import SearchBar from "./SearchBar";

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<{ q: string }>>;
};

export default function Navbar({ setQuery }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("Your Location");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setQuery({ q: searchInput });
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords;
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const data = await response.json();
        const locationName = data[0]?.name || "Unknown Location";
        setCurrentLocation(locationName);
        setQuery({ q: `${latitude},${longitude}` });
      });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="text-lg font-bold">SkyCast</div>
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative flex items-center">
            <SearchBar
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onSubmit={handleSearchSubmit}
            />
          </div>
          <div className="flex items-center space-x-2">
            <BiCurrentLocation
              onClick={handleGetCurrentLocation}
              className="text-gray-200 cursor-pointer hover:text-white hover:scale-110 transition-colors h-6 w-6"
            />
            <MapPinIcon className="h-6 w-6" />
            <span className="font-medium">{currentLocation}</span>
          </div>
        </div>
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-2 space-y-4">
          <div className="relative flex items-center">
            <SearchBar
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onSubmit={handleSearchSubmit}
            />
          </div>
          <div className="flex items-center space-x-2 text-white">
            <BiCurrentLocation
              onClick={handleGetCurrentLocation}
              className="text-gray-200 cursor-pointer hover:text-white hover:scale-110 transition-colors h-6 w-6"
            />
            <MapPinIcon className="h-6 w-6" />
            <span className="font-medium">{currentLocation}</span>
          </div>
        </div>
      )}
    </nav>
  );
}