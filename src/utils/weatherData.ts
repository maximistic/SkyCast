import { DateTime } from "luxon";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${infoType}`);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: process.env.NEXT_PUBLIC_WEATHER_KEY || "",
  }).toString();

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${infoType}: ${response.statusText}`);
  }
  return response.json();
};

const iconURL = (icon) =>
  `http://openweathermap.org/img/wn/${icon || "01d"}@2x.png`;

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => {
  try {
    return DateTime.fromSeconds(secs, { zone: "utc" })
      .plus({ seconds: offset })
      .toFormat(format);
  } catch (error) {
    console.error("Error formatting local time:", error);
    return "Invalid Time";
  }
};

const formatCurr = (data) => {
  const {
    coord: { lat, lon } = {},
    main: {
      temp = 0,
      feels_like = 0,
      temp_min = 0,
      temp_max = 0,
      pressure,
      humidity = 0,
      grnd_level,
      sea_level,
    } = {},
    visibility = 0,
    wind: { speed = 0, deg } = {},
    clouds: { all } = {},
    sys: { sunrise = 0, sunset = 0, country = "Unknown" } = {},
    name = "Unknown",
    dt = 0,
    timezone = 0,
    weather = [],
  } = data;

  const { main: details = "Unknown", icon = "01d" } = weather?.[0] || {};
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    visibility,
    humidity,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    country,
    name,
    speed,
    details,
    icon: iconURL(icon),
    formattedLocalTime,
    dt,
    timezone,
  };
};

const formatForecastWeather = (currentSecs, offset, list = []) => {
  if (!Array.isArray(list) || list.length === 0) {
    console.warn("Forecast data is empty or invalid");
    return { hourly: [], daily: [] };
  }

  const hourly = list
    .filter((entry) => entry.dt > currentSecs)
    .map((entry) => ({
      temp: entry?.main?.temp || 0,
      title: formatToLocalTime(entry.dt, offset, "hh:mm a"),
      icon: iconURL(entry.weather?.[0]?.icon || "01d"),
      date: entry.dt_txt || "Unknown Date",
    }))
    .slice(0, 5);

  const daily = list
    .filter((entry) => entry.dt_txt?.endsWith("00:00:00"))
    .map((entry) => ({
      temp: entry?.main?.temp || 0,
      title: formatToLocalTime(entry.dt, offset, "ccc"),
      icon: iconURL(entry.weather?.[0]?.icon || "10d"),
      date: entry.dt_txt || "Unknown Date",
    }));

  return { hourly, daily };
};

const formattedData = async (searchParams) => {
  try {
    const currWeather = await getWeatherData("weather", searchParams).then((response) => {
      const formatted = formatCurr(response);

      return {
        ...formatted,
        humidity: response.main?.humidity,
        windSpeed: response.wind?.speed,
        pressure: response.main?.pressure,
        visibility: response.visibility,
      };
    });

    const { dt, lat, lon, timezone } = currWeather;

    const formattedForecastWeather = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    }).then((response) =>
      formatForecastWeather(dt, timezone, response.list || [])
    );

    return { ...currWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error fetching or formatting weather data:", error);

    return {
      hourly: [],
      daily: [],
      error: "Could not fetch weather data. Please try again.",
    };
  }
};


export default formattedData;
