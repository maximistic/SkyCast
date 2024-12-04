// src/types/weather.ts

export interface WeatherForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: CityInfo;
  }
  
  export interface ForecastItem {
    dt: number;
    main: MainWeatherInfo;
    weather: WeatherDetails[];
    clouds: CloudInfo;
    wind: WindInfo;
    visibility: number;
    pop: number;
    sys: SysInfo;
    dt_txt: string;
  }
  
  export interface MainWeatherInfo {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  export interface WeatherDetails {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface CloudInfo {
    all: number;
  }
  
  export interface WindInfo {
    speed: number;
    deg: number;
    gust: number;
  }
  
  export interface SysInfo {
    pod: string;
  }
  
  export interface CityInfo {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  export interface Coordinates {
    lat: number;
    lon: number;
  }  