// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface ImportMetaEnv {
			readonly VITE_WEATHER_API_KEY: string;
		}

		interface ImportMeta {
			readonly env: ImportMetaEnv;
		}
	}

	interface geolocationType {
		lat: number;
		lon: number;
	}

	interface StoredEntry {
		cityName: string;
	}

	type Theme = 'light' | 'dark';

	interface WeatherData {
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
}

export { };

