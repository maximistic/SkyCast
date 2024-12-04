"use client";
import Navbar from "@/components/Navbar";
import { WeatherForecastResponse } from "@/types/weather";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherForecastResponse>('repoData', async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
    );
    return data;
  });

  console.log('data', data?.city.name);

  if (isLoading) return <Loading />;
  if (error) return 'An error occurred while fetching the data. Please try again.';

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
    </div>
  );
}
