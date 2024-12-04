import React from 'react';
import { format, addHours } from 'date-fns';
import { WeatherForecastResponse } from '@/types/weather';
import { kelvinToCelcius } from '@/utils/kelvinToCelcius';
import { Line } from 'react-chartjs-2';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type WeatherProps = {
  currData: WeatherForecastResponse['list'][0];
  data: WeatherForecastResponse;
};

const Weather = ({ currData, data }: WeatherProps) => {
  if (!currData || !data) {
    return <p>No data available.</p>;
  }

  // Get the 48-hour hourly forecast data
  const hourlyData = data.list;

  // Generate labels for 48 hours starting from the current hour in AM/PM format
  const now = new Date();
  const hourlyLabels = Array.from({ length: 48 }, (_, index) =>
    format(addHours(now, index), 'h a') // Format to 12-hour AM/PM format
  );

  // Extract temperature data for each hour
  const temperatureData = hourlyData.map((forecast) => kelvinToCelcius(forecast.main.temp));

  const chartData = {
    labels: hourlyLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData,
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.3)',
        fill: true,
        spanGaps: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        max: 60,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            const forecast = hourlyData[index];
            return [
              `Temperature: ${kelvinToCelcius(forecast.main.temp)}°C`,
              `Feels Like: ${kelvinToCelcius(forecast.main.feels_like)}°C`,
              `Cloudiness: ${forecast.clouds.all}%`,
              `Wind Speed: ${forecast.wind.speed} m/s`,
            ];
          },
        },
      },
    },
  };

  return (
        <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Left side container */}
        <div
    className={`w-full md:w-1/3 shadow-lg rounded-lg p-6 ${
        currData?.weather[0]?.main === 'Rain'
        ? 'bg-gradient-to-br from-blue-50 to-blue-200'
        : currData?.weather[0]?.main === 'Clear'
        ? 'bg-gradient-to-br from-yellow-50 to-yellow-200'
        : currData?.weather[0]?.main === 'Clouds'
        ? 'bg-gradient-to-br from-gray-50 to-gray-200'
        : 'bg-gradient-to-br from-green-50 to-green-200' 
    }`}
    >
    <div className="flex flex-col items-center gap-6">
        {/* Temperature Display */}
        <div className="text-center">
        <span className="text-6xl font-bold text-blue-900">
            {kelvinToCelcius(currData?.main.temp ?? 0)}°C
        </span>
        <p className="text-sm text-gray-600 mt-1">Feels Like: 
            <span className="font-medium"> {kelvinToCelcius(currData?.main.feels_like ?? 0)}°C</span>
        </p>
        </div>

        {/* Min/Max Temperature */}
        <div className="flex justify-center items-center gap-4">
        <p className="text-sm text-gray-600">
            <span className="font-medium">Min:</span> {kelvinToCelcius(currData?.main.temp_min ?? 0)}°C
        </p>
        <p className="text-sm text-gray-600">
            <span className="font-medium">Max:</span> {kelvinToCelcius(currData?.main.temp_max ?? 0)}°C
        </p>
        </div>

        {/* Weather Description */}
        <div className="flex items-center justify-center gap-2 text-blue-800">
            <span className="text-lg capitalize font-medium">
                {currData?.weather[0].description}
            </span>
            <Image
                src={`http://openweathermap.org/img/wn/${currData?.weather[0]?.icon}@2x.png`}
                alt={currData?.weather[0]?.description}
                width={50}
                height={50}
                priority
            />
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
            <span className="font-medium">Humidity:</span>
            <span>{currData?.main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="font-medium">Wind:</span>
            <span>{currData?.wind.speed} m/s</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="font-medium">Pressure:</span>
            <span>{currData?.main.pressure} hPa</span>
        </div>
        </div>
    </div>
    </div>



      {/* Right side chart */}
      <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-4">
        <div className="w-full h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Weather;