import { writable } from 'svelte/store';

// interface WeatherData {
//   name: string,
//   main: {
//     temp: number,
//     feels_like: number,
//     temp_max: number,
//     temp_min: number,
//     humidity: number,
//     pressure: number,
//   },
//   weather: Array<{
//     main: string,
//     description: string,
//     icon: string,
//   }>,
//   sys: {
//     type: number,
//     country: string,
//     sunrise: number,
//     sunset: number
//   },
//   wind: {
//     speed: number,
//   };
// }

export interface WeatherData {
  current: {
    time: Date;
    temperature2m: number;
    relativeHumidity2m: number;
    apparentTemperature: number;
    isDay: number;
    weatherCode: number;
    pressureMsl: number;
    windSpeed10m: number;
  };
  hourly: {
    time: Date[];
    temperature2m: Float32Array;
    weatherCode: Float32Array;
  };
  daily: {
    time: Date[];
    weatherCode: Float32Array;
    temperature2mMax: Float32Array;
    temperature2mMin: Float32Array;
    apparentTemperatureMax: Float32Array;
    apparentTemperatureMin: Float32Array;
    sunrise: Float32Array;
    sunset: Float32Array;
    precipitationSum: Float32Array;
    precipitationHours: Float32Array;
    precipitationProbabilityMax: Float32Array;
    windSpeed10mMax: Float32Array;
  };
}

export const weatherStore = writable<WeatherData | null>(null);