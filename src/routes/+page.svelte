<script lang="ts">
	import {
		getCoordinatesFromCity,
		getReverseGeocode,
		getWeatherDataFromCoordinates
	} from '$lib/api/weather';
	import DailyForecast from '$lib/components/DailyForecast.svelte';
	import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';
	import HourlyForecast from '$lib/components/HourlyForecast.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import WeatherDisplay from '$lib/components/WeatherDisplay.svelte';
	import { weatherStore } from '$lib/stores/weatherStore';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { MapPin } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	const popupFocusBlur: PopupSettings = {
		event: 'focus-blur',
		target: 'popupFocusBlur',
		placement: 'top'
	};

	let cityName: string = $state('');
	let error: string | null = $state(null);
	let loading = $state(false);
	let coordinates: geolocationType | null = $state(null);

	let address: string = $state('');
	let currentHour: number = $state(new Date().getHours());
	async function locateMe() {
		loading = true;
		try {
			const geoLocation = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});

			coordinates = {
				lat: geoLocation.coords.latitude,
				lon: geoLocation.coords.longitude
			};

			const geoCodingData = await getReverseGeocode(
				geoLocation.coords.latitude,
				geoLocation.coords.longitude
			);
			const city = geoCodingData.results[0];
			address = city.formatted_address;

			const weatherData = await getWeatherDataFromCoordinates(coordinates.lat, coordinates.lon);
			weatherStore.set(weatherData);
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	async function getLocation(cityName: string) {
		loading = true;
		try {
			const result = await getCoordinatesFromCity(cityName);
			coordinates = { lat: result?.results[0].latitude, lon: result?.results[0].longitude };
			const geoCodingData = await getReverseGeocode(coordinates.lat, coordinates.lon);
			const city = geoCodingData.results[0];
			address = city.formatted_address;
			const weatherData = await getWeatherDataFromCoordinates(coordinates.lat, coordinates.lon);
			weatherStore.set(weatherData);
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}
</script>

<div
	in:fly={{ y: 200, duration: 2000 }}
	out:fade={{ duration: 1000 }}
	class="card variant-glass-surface mx-auto w-full space-y-4 p-4"
>
	<header class="card-header">
		<div class="flex items-start justify-center gap-4">
			<input
				type="text"
				id="location"
				name="location"
				bind:value={cityName}
				placeholder="London"
				class="input variant-glass-surface rounded-3xl"
				use:popup={popupFocusBlur}
				onkeydown={(e) => {
					if (e.code === 'Enter') getLocation(cityName);
				}}
			/>
			<div class="variant-glass-surface rounded-md p-2" data-popup="popupFocusBlur">
				<p class="text-xs">type city name & press enter.</p>
				<div class="variant-glass-surface arrow"></div>
			</div>
			<button
				type="button"
				class="variant-glass-surface btn btn-icon [&>*]:pointer-events-none"
				use:popup={popupHover}
				onclick={locateMe}><MapPin /></button
			>
			<div class="variant-glass-surface rounded-md p-2" data-popup="popupHover">
				<p class="text-xs">Locate Me</p>
				<div class="variant-glass-surface arrow"></div>
			</div>
		</div>
	</header>
	<section class="p-2 mb-2">
		{#if loading}
			<LoadingSpinner />
		{:else if error}
			<ErrorDisplay {error} />
		{:else}
			<div in:fade={{ duration: 2000 }}>
				<WeatherDisplay {address} />
				<HourlyForecast {currentHour} />
				<DailyForecast />
			</div>
		{/if}
	</section>
	<p class="text-xs text-center">Weather data provided by <a class="anchor" href="https://open-meteo.com">Open-Meteo</a></p>
</div>
