import {DateTime} from 'luxon';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${infoType}`);
    url.search = new URLSearchParams({
      ...searchParams, 
      appid: process.env.NEXT_PUBLIC_WEATHER_KEY || ''
    }).toString();

    return fetch(url).then((res) => res.json());
};

const iconURL = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => 
    DateTime.fromSeconds(secs + offset, {zone: 'utc'}).toFormat(format);

const formatCurr = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity, grnd_level, sea_level},
        visibility, 
        wind: {speed, deg}, 
        clouds: {all}, 
        sys: {sunrise, sunset, country},
        name, 
        dt, 
        timezone,
        weather
    } = data;

    const {main: details, icon} = weather[0];
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
        timezone
    }
}

const formatForecastWeather = (currentSecs, offset, list) => {
    // Ensure `list` is an array
    if (!Array.isArray(list)) {
      console.error("Forecast data is not an array");
      return { hourly: [], daily: [] };
    }
  
    // Process hourly data: Filter and format
    const hourly = list
      .filter((entry) => entry.dt > currentSecs) // Ensure it's in the future
      .map((entry) => ({
        temp: entry.main.temp,
        title: formatToLocalTime(entry.dt, offset, "hh:mm a"),
        icon: iconURL(entry.weather[0]?.icon || "01d"), // Default icon fallback
        date: entry.dt_txt,
      }))
      .slice(0, 5); // Limit to 5 items
  
    const daily = list
      .filter((entry) => entry.dt_txt.endsWith("00:00:00")) // At midnight
      .map((entry) => ({
        temp: entry.main.temp,
        title: formatToLocalTime(entry.dt, offset, "ccc"), // Day abbreviation
        icon: iconURL(entry.weather[0]?.icon || "10d"), // Default icon fallback
        date: entry.dt_txt,
      }));
  
    return { hourly, daily };
  };
  

  const formattedData = async (searchParams) => {
    const currWeather = await getWeatherData("weather", searchParams).then(formatCurr);
  
    const { dt, lat, lon, timezone } = currWeather;
  
    const formattedForecastWeather = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    })
      .then((response) =>
        formatForecastWeather(dt, timezone, response.list)
      )
      .catch((error) => {
        console.error("Error processing forecast weather:", error);
        return { hourly: [], daily: [] }; 
      });
  
    return { ...currWeather, ...formattedForecastWeather };
  };
  

export default formattedData