<script lang="ts">
	import { WindArrowDownIcon, WindIcon } from '$lib/components/icons';
	import { weatherStore } from '$lib/stores/weatherStore';
	import { formatPressure, getWeatherDescription } from '$lib/utils';
	import WeatherIcon from './WeatherIcon.svelte';

	let { address } = $props();
	let weather: WeatherData | null = $state(null);

	$effect(() => {
		weather = $weatherStore;
	});
</script>

{#if weather}
	<div class="flex flex-col items-center gap-4">
		<!-- Location -->
		<div class="flex w-full justify-between">
			<div class="flex items-start justify-start">
				<div>
					<p class="font-semibold">{address}</p>
					<div class="flex items-baseline">
						<p class="text-8xl">{Math.round(weather.current.temperature2m)}°</p>
						<p class="text-sm">Feels like {Math.round(weather.current.apparentTemperature)}°</p>
					</div>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<div class="flex flex-col items-end gap-1">
					<div class="mb-1 flex justify-end">
						<WeatherIcon code={weather.current.weatherCode} size="sm" />
					</div>
					<p class="text-right text-sm capitalize">
						{getWeatherDescription(weather.current.weatherCode)}
					</p>

					<div class=" flex space-x-2">
						<span class="text-sm">H: {Math.round(weather.daily.temperature2mMax[0])}°</span>
						<span class="text-sm">L: {Math.round(weather.daily.temperature2mMin[0])}°</span>
					</div>
					<div class="flex gap-2">
						<div class="flex space-x-1">
							<WindArrowDownIcon class="h-4 w-4" />
							<span class="text-sm"
								>{formatPressure(Math.floor(weather.current.pressureMsl), 'hpa')}</span
							>
						</div>
						<div class="flex space-x-1">
							<WindIcon class="h-4 w-4" />
							<span class="text-sm">{Math.round(weather.current.windSpeed10m)} km/h</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
