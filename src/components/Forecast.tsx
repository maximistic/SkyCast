import React, { useState } from 'react';
import Image from 'next/image';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function Forecast({ title, data }) {
  const [showChart, setShowChart] = useState(false);

  // Prepare chart data
  const chartData = {
    labels: data.map((d) => d.title),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map((d) => d.temp),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const currentData = data[index];
            return `Temp: ${currentData.temp}°C, Humidity: ${currentData.humidity}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Disable gridlines for X-axis
      },
      y: {
        grid: { display: false }, // Disable gridlines for Y-axis
      },
    },
  };
  

  return (
    <div>
      <div className="flex items-center justify-between mt-6">
        <p className="font-medium uppercase">{title}</p>
        <button
          onClick={() => setShowChart((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showChart ? 'View Normal' : 'View Chart'}
        </button>
      </div>

      <hr className="my-1" />

      {showChart ? (
        <div className="w-full h-64 mt-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          {data.map((d, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <p className="font-light text-sm">{d.title}</p>
              <Image
                src={d.icon}
                alt="Weather icon"
                width={96}
                height={96}
                className="w-12 my-1"
              />
              <p className="font-medium">{d.temp.toFixed()}°</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
