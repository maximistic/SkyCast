import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { cn } from '@/utils/cn';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  placeholder?: string; 
};

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onSubmit,
  className,
  placeholder = "Search", 
}) => {
  return (
    <div className="relative w-full">
      <form 
        onSubmit={onSubmit}
        className={cn("flex items-center h-10", className)}
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-l-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="h-10 px-4 bg-blue-500 text-white rounded-r-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-250 ease-in-out"
        >
          <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer " />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
