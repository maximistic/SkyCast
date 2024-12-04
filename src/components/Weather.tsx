import React from 'react';
import { format, addHours } from 'date-fns';
import { WeatherForecastResponse } from '@/types/weather';
import { kelvinToCelcius } from '@/utils/kelvinToCelcius';
import { Line } from 'react-chartjs-2';
import Container from './Container';
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
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-4">
        <Container className="gap-10 px-6 items-center">
          <div className="flex flex-col px-4">
            <span className="text-5xl">
              {kelvinToCelcius(currData?.main.temp ?? 0)}°C
            </span>
            <p className="text-xs space-x-1 whitespace-nowrap">
              <span>Feels Like</span>
              <span>{kelvinToCelcius(currData?.main.feels_like ?? 0)}°C</span>
            </p>
            <p className="text-xs space-x-2">
              <span>
                Min - {kelvinToCelcius(currData?.main.temp_min ?? 0)}°C{' '}
              </span>
              <span>
                Max - {kelvinToCelcius(currData?.main.temp_max ?? 0)}°C{' '}
              </span>
            </p>
          </div>
        </Container>
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
