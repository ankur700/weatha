<script lang="ts">
	import { StorageManager } from '$lib/chromeStorage';
	import DailyForecast from '$lib/components/DailyForecast.svelte';
	import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';
	import HourlyForecast from '$lib/components/HourlyForecast.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import WeatherDisplay from '$lib/components/WeatherDisplay.svelte';
	import { ClearAllPopup, LocateMePopup, popupCombobox, popupFocusBlur } from '$lib/utils';
	import {
		getCoordinatesFromCity,
		getReverseGeocode,
		getWeatherDataFromCoordinates
	} from '$lib/weather';
	import { weatherStore } from '$lib/weatherStore';
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { CircleX, History, MapPin } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let cityName: string = $state('');
	let error: string | null = $state(null);
	let loading = $state(false);
	let coordinates: geolocationType | null = $state(null);
	let address: string = $state('');
	let currentHour: number = $state(new Date().getHours());
	let comboboxValue: string | null = $state(null);

	let lastFiveQueries: StoredEntry[] = $state([]);

	$effect(() => {
		init();
	});

	async function init() {
		// Try to retrieve a value
		lastFiveQueries = await StorageManager.getAllEntries();
	}

	async function saveInLocalStorage(cityName: string) {
		// Check extension context first
		try {
			// Save weather data for New York
			await StorageManager.saveData(cityName);

			// Get all stored entries
			lastFiveQueries = await StorageManager.getAllEntries();
		} catch (error) {
			console.error('Storage error:', error);
		}
	}

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

			const geoCodingData = await getReverseGeocode(coordinates.lat, coordinates.lon);

			if (!geoCodingData.results[0]) throw new Error('City not found');

			const city = geoCodingData.results[0];
			address = city.formatted_address;

			const weatherData = await getWeatherDataFromCoordinates(coordinates.lat, coordinates.lon);
			weatherStore.set(weatherData);
			saveInLocalStorage(address);
		} catch (e) {
			error =
				e instanceof Error ? e.message : 'An error occurred while locating you, please try again.';
		} finally {
			loading = false;
		}
	}

	async function getLocation(cityName: string, e?: Event) {
		e?.preventDefault();
		loading = true;
		try {
			const result = await getCoordinatesFromCity(cityName);

			if (!result.results[0]) throw new Error('Could not find the coordinates for this city.');

			coordinates = { lat: result?.results[0].latitude, lon: result?.results[0].longitude };
			const geoCodingData = await getReverseGeocode(coordinates.lat, coordinates.lon);

			if (!geoCodingData.results[0]) throw new Error('Could not find the city.');

			const city = geoCodingData.results[0];
			address = city.formatted_address;
			const weatherData = await getWeatherDataFromCoordinates(coordinates.lat, coordinates.lon);

			weatherStore.set(weatherData);
			saveInLocalStorage(address);
		} catch (e) {
			error =
				e instanceof Error ? e.message : 'An error occurred while locating you, please try again.';
		} finally {
			loading = false;
		}
	}

	function handleSelect() {
		if (comboboxValue === null) return;
		let city = comboboxValue.split(',')[0];
		city = city.split(' ')[0];
		cityName = city;
		getLocation(city.toLowerCase());
	}

	function clearAll() {
		StorageManager.clearHistory();
		lastFiveQueries = [];
	}
</script>

<div
	in:fade={{ duration: 1500 }}
	class="card variant-glass-surface mx-auto w-full space-y-4 rounded-2xl p-4"
>
	<header class="card-header">
		<div class="flex items-center justify-center gap-4">
			<form class="w-full" onsubmit={(e) => getLocation(cityName, e)}>
				<input
					type="text"
					id="location"
					name="location"
					bind:value={cityName}
					placeholder="London"
					class="input variant-glass-surface rounded-3xl"
					use:popup={popupFocusBlur}
				/>
				<div class="variant-glass-surface rounded-md p-2" data-popup="popupFocusBlur">
					<p class="text-xs">type city name & press enter.</p>
					<div class="variant-glass-surface arrow"></div>
				</div>
			</form>
			<button
				type="button"
				class="variant-filled-primary btn btn-icon [&>*]:pointer-events-none"
				use:popup={LocateMePopup}
				onclick={locateMe}><MapPin class="h-4 w-4" /></button
			>
			<div class="variant-glass-primary rounded-md p-2" data-popup="locateMePopup">
				<p class="text-xs">Locate Me</p>
				<div class="variant-glass-surface arrow"></div>
			</div>
			<button
				class="variant-filled-surface btn btn-sm justify-center rounded-md"
				use:popup={popupCombobox}
				disabled={lastFiveQueries.length === 0}
			>
				<span class="text-xs capitalize">{comboboxValue ?? 'History'}</span>
				<History class="h-3 w-3" />
			</button>
				<div
					in:fade={{ duration: 1000 }}
					class="card variant-filled-surface w-48 py-2 shadow-xl"
					data-popup="popupCombobox"
				>
					<ListBox class="variant-filled-surface" rounded="rounded-none">
						{#each lastFiveQueries as query}
							<ListBoxItem
								bind:group={comboboxValue}
								on:change={handleSelect}
								name="medium"
								class="text-xs"
								value={query.cityName}>{query.cityName}</ListBoxItem
							>
						{/each}
					</ListBox>
					<div class="variant-glass-surface arrow"></div>
				</div>
			<button
				type="button"
				class="variant-filled-surface btn btn-icon [&>*]:pointer-events-none"
				use:popup={ClearAllPopup}
				onclick={clearAll}
				disabled={lastFiveQueries.length === 0}
			>
				<CircleX class="h-4 w-4" />
			</button>
			<div class="variant-glass-surface rounded-md p-2" data-popup="clearAllPopup">
				<p class="text-xs">Clear History</p>
				<div class="variant-glass-surface arrow"></div>
			</div>
		</div>
	</header>
	<section class="mb-2 p-2">
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
	<p class="text-center text-xs">
		Weather data provided by <a class="anchor" href="https://open-meteo.com">Open-Meteo</a> and
		icons by
		<a
			class="anchor"
			href="https://www.flaticon.com/free-icons/clouds-and-sun"
			title="clouds-and-sun icons">Freepik - Flaticon</a
		>
	</p>
</div>
