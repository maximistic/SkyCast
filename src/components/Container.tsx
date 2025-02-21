import React, { useState } from 'react';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FaThermometerEmpty } from 'react-icons/fa';
import { FiWind } from 'react-icons/fi';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from 'react-icons/fa6';
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from 'react-icons/tb';
import Image from 'next/image';

const getBackgroundColor = (iconUrl) => {
  const match = iconUrl.match(/\/(\d{2}[dn])@/);
  const icon = match ? match[1] : '01d';
  
  const isDay = icon.includes('d');
  const baseColors = {
    '01': isDay ? 'bg-orange-300' : 'bg-blue-200',
    '02': isDay ? 'bg-yellow-400' : 'bg-gray-700',
    '03': 'bg-gray-500',
    '04': 'bg-gray-600',
    '09': 'bg-blue-500',
    '10': 'bg-blue-400',
    '11': 'bg-purple-600',
    '13': 'bg-white',
    '50': 'bg-gray-300',
  };
  const code = icon.slice(0, 2);
  return baseColors[code] || 'bg-blue-100';
};

const getTextColor = (backgroundColor) => {
  const lightBgColors = ['bg-white', 'bg-gray-300', 'bg-orange-300', 'bg-yellow-400','bg-gray-500', 'bg-blue-200' ];
  return lightBgColors.includes(backgroundColor) ? 'text-gray-800' : 'text-white';
};

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
  const [isCelsius, setIsCelsius] = useState(true);
  const backgroundColor = getBackgroundColor(icon);
  const textColor = getTextColor(backgroundColor);

  const convertTemperature = (temp) => {
    return isCelsius 
      ? temp 
      : (temp * 9/5) + 32;
  };

  const formatTemperature = (temp) => {
    const convertedTemp = convertTemperature(temp);
    return convertedTemp.toFixed();
  };

  const detailedInfo = [
    { id: 1, Icon: FaThermometerEmpty, Title: 'Feels like', value: `${formatTemperature(feels_like)}${isCelsius ? '°C' : '°F'}` },
    { id: 2, Icon: BiSolidDropletHalf, Title: 'Humidity', value: `${humidity.toFixed()}%` },
    { id: 3, Icon: FiWind, Title: 'Wind Speed', value: `${speed} km/h` },
  ];

  const otherInfo = [
    { id: 1, Icon: GiSunrise, Title: 'Sunrise', value: sunrise },
    { id: 2, Icon: GiSunset, Title: 'Sunset', value: sunset },
    { id: 3, Icon: FaTemperatureArrowUp, Title: 'Highest', value: `${formatTemperature(temp_max)}${isCelsius ? '°C' : '°F'}` },
    { id: 4, Icon: FaTemperatureArrowDown, Title: 'Lowest', value: `${formatTemperature(temp_min)}${isCelsius ? '°C' : '°F'}` },
  ];

  return (
    <div className={`${backgroundColor} ${textColor} w-full md:w-1/2 p-6 rounded-lg shadow-lg transition duration-300`}>
      {/* Temperature Toggle */}
      <div className="flex flex-row w-full items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TbTemperatureCelsius
            size={35}
            className={`${isCelsius ? 'text-blue-500' : 'text-gray-400'} transition-transform hover:scale-125 cursor-pointer`}
            onClick={() => setIsCelsius(true)}
          />
          <TbTemperatureFahrenheit
            size={35}
            className={`${!isCelsius ? 'text-blue-500' : 'text-gray-400'} transition-transform hover:scale-125 cursor-pointer`}
            onClick={() => setIsCelsius(false)}
          />
        </div>
      </div>

      {/* Location and Time */}
      <div className="mb-4">
        <p className={`text-sm font-light`}>{formattedLocalTime}</p>
        <p className="text-3xl font-semibold mt-1">{name}, {country}</p>
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
        <div className="flex items-center">
          <p className="text-6xl font-bold mr-2">{formatTemperature(temp)}</p>
          <div className="flex flex-col">
            <span className="text-lg">{isCelsius ? '°C' : '°F'}</span>
          </div>
        </div>
        {/* Weather Description */}
        <p className="text-xl font-light">{details}</p>
      </div>

      {/* Detailed Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {detailedInfo.map(({ id, Icon, Title, value }) => (
          <div key={id} className={`flex items-center ${textColor} text-sm font-light`}>
            <Icon size={20} className="mr-2 opacity-70" />
            {Title}:
            <span className="font-medium ml-1">{value}</span>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {otherInfo.map(({ id, Icon, Title, value }) => (
          <div key={id} className="flex items-center gap-2">
            <Icon size={24} className="opacity-70" />
            <p>
              {Title}: 
              <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}