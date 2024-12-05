"use client";
import Navbar from "@/components/Navbar";
import { WeatherForecastResponse } from "@/types/weather";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import Container from "@/components/Container";
import Forecast from "@/components/Forecast";
import formattedData from "@/utils/weatherData";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState({q:'helsinki'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const { isLoading: forecastLoading, error: forecastError, data: forecastData } = useQuery<WeatherForecastResponse>('forecastData', async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
    );
    return data;
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await formattedData({...query, units});
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [query, units]);

  if (forecastLoading) return <Loading />;
  if (forecastError) return 'An error occurred while fetching the forecast data. Please try again.';

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />

      <main className="w-full px-3 max-w-7xl mx-auto flex flex-col gap-9 pb-10 pt-4">
        {weather && (
          <>
            <Container weather = {weather}/>
            <Forecast title = 'step forecast' data={weather.hourly}/>
            <Forecast title = 'step forecast' data={weather.daily}/>
          </>
        )}
      </main>
    </div>
  );
}