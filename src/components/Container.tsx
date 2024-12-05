import React from 'react';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FaThermometerEmpty } from 'react-icons/fa';
import { FiWind } from 'react-icons/fi';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from 'react-icons/fa6';
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from 'react-icons/tb';
import Image from 'next/image';

// Helper function to determine background color based on weather condition and time
const getBackgroundColor = (iconUrl) => {
  console.log("Icon:", iconUrl);
  
  // Extract the icon code using regex
  const match = iconUrl.match(/\/(\d{2}[dn])@/);
  const icon = match ? match[1] : '01d'; // Default to '01d' if no match
  
  const isDay = icon.includes('d');
  const baseColors = {
    '01': isDay ? 'bg-orange-300' : 'bg-dark-blue-800',
    '02': isDay ? 'bg-yellow-400' : 'bg-gray-700',
    '03': 'bg-gray-500',
    '04': 'bg-gray-600',
    '09': 'bg-blue-500',
    '10': 'bg-blue-400',
    '11': 'bg-purple-600',
    '13': 'bg-white',
    '50': 'bg-gray-300',
  };
  const code = icon.slice(0, 2); // Extract the first two characters
  console.log("Code:", code, "Background:", baseColors[code]);
  return baseColors[code] || 'bg-blue-100'; // Default fallback
};


// Utility function to format temperature
const formatTemperature = (temp) => `${temp.toFixed()}°`;

// Utility function to format wind speed
const formatWindSpeed = (speed) => `${speed} km/h`;

export default function WeatherCard({
  weather: {
    formattedLocalTime,
    name,
    country,
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
}) {
  // Data for detailed and additional information
  const detailedInfo = [
    { id: 1, Icon: FaThermometerEmpty, Title: 'Feels like', value: formatTemperature(feels_like) },
    { id: 2, Icon: BiSolidDropletHalf, Title: 'Humidity', value: `${humidity.toFixed()}%` },
    { id: 3, Icon: FiWind, Title: 'Wind Speed', value: formatWindSpeed(speed) },
  ];

  const otherInfo = [
    { id: 1, Icon: GiSunrise, Title: 'Sunrise', value: sunrise },
    { id: 2, Icon: GiSunset, Title: 'Sunset', value: sunset },
    { id: 3, Icon: FaTemperatureArrowUp, Title: 'Highest', value: formatTemperature(temp_max) },
    { id: 4, Icon: FaTemperatureArrowDown, Title: 'Lowest', value: formatTemperature(temp_min) },
  ];

  return (
    <div className={`${getBackgroundColor(icon)} w-1/2 p-6 rounded-lg shadow-lg transition duration-300`}>
      {/* Temperature Toggle */}
      <div className="flex flex-row w-full items-center justify-start gap-3 mb-4">
        <TbTemperatureCelsius
          size={35}
          className="text-blue-500 transition-transform hover:scale-125 cursor-pointer"
        />
        <p className="text-2xl font-medium text-blue-500">|</p>
        <TbTemperatureFahrenheit
          size={35}
          className="text-blue-500 transition-transform hover:scale-125 cursor-pointer"
        />
      </div>

      {/* Location and Time */}
      <div className="mb-6">
        <p className="text-sm font-light text-gray-700">{formattedLocalTime}</p>
        <p className="text-3xl font-semibold mt-1">{`${name}, ${country}`}</p>
      </div>

      {/* Weather Details */}
      <div className="flex items-center justify-between mb-4">
        {/* Weather Icon */}
        <Image
          src={icon}
          alt="weather icon"
          width={96}
          height={96}
          className="w-24 h-24"
        />
        {/* Temperature */}
        <p className="text-6xl font-bold">{formatTemperature(temp)}</p>
        {/* Weather Description */}
        <p className="text-xl font-light text-gray-600">{details}</p>
      </div>

      {/* Detailed Info */}
      <div className="flex flex-col space-y-3">
        {detailedInfo.map(({ id, Icon, Title, value }) => (
          <div key={id} className="flex items-center text-gray-800 text-sm font-light">
            <Icon size={20} className="mr-2 text-gray-600" />
            {`${Title}:`}
            <span className="font-medium ml-1">{value}</span>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 flex flex-wrap gap-6 text-gray-800 text-sm">
        {otherInfo.map(({ id, Icon, Title, value }) => (
          <div key={id} className="flex items-center gap-2">
            <Icon size={24} className="text-gray-600" />
            <p>
              {`${Title}: `}
              <span className="font-medium">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
