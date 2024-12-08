import { fetchWeatherApi } from 'openmeteo';

const GOOGLE_API_KEY: ImportMetaEnv = import.meta.env.VITE_GOOGLE_API_KEY;

export async function getReverseGeocode(lat: number, lon: number) {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=locality|country&key=${GOOGLE_API_KEY}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch location data');
	}

	return response.json();
}

export async function getCoordinatesFromCity(cityName: string) {
	const response = await fetch(
		`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch coordinates from the provided city name.');
	}

	return response.json();
}

export async function getWeatherDataFromCoordinates(lat: number, lon: number) {
	const params = {
		latitude: lat,
		longitude: lon,
		current: [
			'temperature_2m',
			'relative_humidity_2m',
			'apparent_temperature',
			'is_day',
			'weather_code',
			'pressure_msl',
			'wind_speed_10m'
		],
		hourly: ['temperature_2m', 'weather_code'],
		daily: [
			'weather_code',
			'temperature_2m_max',
			'temperature_2m_min',
			'apparent_temperature_max',
			'apparent_temperature_min',
			'sunrise',
			'sunset',
			'precipitation_sum',
			'precipitation_hours',
			'precipitation_probability_max',
			'wind_speed_10m_max'
		],
		models: ['best_match'],
		timezone: 'auto',
		timeformat: 'unixtime'
	};
	const url = 'https://api.open-meteo.com/v1/forecast';
	const responses = await fetchWeatherApi(url, params);

	// Helper function to form time ranges
	const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

	// Process first location. Add a for-loop for multiple locations or weather models
	const response = responses[0];

	// Attributes for timezone and location
	const utcOffsetSeconds = response.utcOffsetSeconds();
	const timezone = response.timezone();
	const timezoneAbbreviation = response.timezoneAbbreviation();
	const latitude = response.latitude();
	const longitude = response.longitude();

	const current = response.current()!;
	const hourly = response.hourly()!;
	const daily = response.daily()!;

	// Note: The order of weather variables in the URL query and the indices below need to match!

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      isDay: current.variables(3)!.value(),
      weatherCode: current.variables(4)!.value(),
      pressureMsl: current.variables(5)!.value(),
      windSpeed10m: current.variables(6)!.value(),
    },
    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      weatherCode: hourly.variables(1)!.valuesArray()!,
    },
    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
      apparentTemperatureMax: daily.variables(3)!.valuesArray()!,
      apparentTemperatureMin: daily.variables(4)!.valuesArray()!,
      sunrise: daily.variables(5)!.valuesArray()!,
      sunset: daily.variables(6)!.valuesArray()!,
      precipitationSum: daily.variables(7)!.valuesArray()!,
      precipitationHours: daily.variables(8)!.valuesArray()!,
      precipitationProbabilityMax: daily.variables(9)!.valuesArray()!,
      windSpeed10mMax: daily.variables(10)!.valuesArray()!,
    },

  };

	return weatherData;
}
