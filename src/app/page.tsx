"use client";
import Navbar from "@/components/Navbar";
import { WeatherForecastResponse } from "@/types/weather";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import Container from "@/components/Container";
import Forecast from "@/components/Forecast";
import formattedData from "@/utils/weatherData";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [query, setQuery] = useState({ q: "helsinki" });
  const [currentLocation, setCurrentLocation] = useState("Helsinki");
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState<any>(null);

  const { isLoading: forecastLoading, error: forecastError } = useQuery<WeatherForecastResponse>(
    ["forecastData", query.q],
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query.q}&units=${units}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    },
    { enabled: !!query.q }
  );

  const fetchWeather = async () => {
    try {
      const data = await formattedData({ ...query, units });
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // React to query or units change to fetch weather
  useEffect(() => {
    fetchWeather();
  }, [query, units]);

  // Loading and error handling
  if (forecastLoading) return <Loading />;
  if (forecastError) return "An error occurred while fetching the forecast data. Please try again.";

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      {/* Navbar with dynamic location */}
      <Navbar setQuery={setQuery} setUnits={setUnits} setCurrentLocation={setCurrentLocation} />
      <Toaster position="top-right" />

      <main className="w-full px-3 max-w-7xl mx-auto flex flex-col gap-9 pb-10 pt-4">
        {weather && (
          <>
            <main className="w-full px-3 max-w-7xl mx-auto flex flex-col md:flex-row gap-9 pb-10 pt-4">
              {/* Container for current weather */}
              <Container weather={{ ...weather, name: currentLocation }} />

              {/* Hourly forecast graph */}
              <div className="w-full md:w-1/2">
                <Forecast title="Hourly Forecast" data={weather.hourly} />
              </div>
            </main>

            {/* Daily forecast graph */}
            <Forecast title="Daily Forecast" data={weather.daily} />
          </>
        )}
      </main>
    </div>
  );
}
