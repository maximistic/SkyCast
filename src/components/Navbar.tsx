"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { BiCurrentLocation } from "react-icons/bi";
import SearchBar from "./SearchBar";
import { toast } from "react-hot-toast"; // Make sure to install react-hot-toast

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<{ q: string }>>;
  setCurrentLocation: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ setQuery, setCurrentLocation }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      try {
        // Validate location before setting query
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          setQuery({ q: searchInput });
          setCurrentLocation(data[0].name);
        } else {
          toast.error("Invalid location. Please try again.");
        }
      } catch (error) {
        toast.error("Error validating location. Please try again.");
      }
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
            );
            const data = await response.json();
            const locationName = data[0]?.name || "Unknown Location";
  
            // Set both query and current location
            setCurrentLocation(locationName);
            setQuery({ q: `${latitude},${longitude}` });
          } catch (error) {
            console.error("Error fetching location details:", error);
            toast.error("Unable to fetch location details.");
          }
        },
        (error) => {
          // Handle geolocation errors
          const errorMessage = getGeolocationErrorMessage(error);
          console.error("Geolocation error:", errorMessage);
          toast.error(errorMessage);
        }
      );
    } catch (error) {
      console.error("Error accessing geolocation:", error);
      toast.error("Geolocation not supported by your browser.");
    }
  };
  const getGeolocationErrorMessage = (error: GeolocationPositionError | null | undefined) => {
    if (!error) return "An unknown error occurred while accessing your location.";
  
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Location access denied. Please enable location permissions.";
      case error.POSITION_UNAVAILABLE:
        return "Location unavailable. Please try again later.";
      case error.TIMEOUT:
        return "Location request timed out. Please try again.";
      default:
        return "An unknown error occurred while accessing your location.";
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
          </div>
        </div>
      )}
    </nav>
  );
}