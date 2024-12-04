import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';


const SearchBar = () => {
  return (
    <div className="relative w-full">
      <form className="flex items-center h-10">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-l-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="h-10 px-4 bg-blue-500 text-white rounded-r-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
