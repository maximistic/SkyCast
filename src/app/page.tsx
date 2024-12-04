"use client";
import Navbar from "@/components/Navbar";
import { WeatherForecastResponse } from "@/types/weather";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import Weather from "@/components/Weather";
import Forecast from "@/components/Forecast";

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherForecastResponse>('repoData', async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
    );
    return data;
  });

  const currData = data?.list[0];

  if (isLoading) return <Loading />;
  if (error) return 'An error occurred while fetching the data. Please try again.';

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />

      <main className="w-full px-3 max-w-7xl mx-auto flex flex-col gap-9 pb-10 pt-4">
        {/* Pass both currData and data */}
        <Weather currData={currData} data={data} />
        <Forecast data={data} />
      </main>
    </div>
  );
}
