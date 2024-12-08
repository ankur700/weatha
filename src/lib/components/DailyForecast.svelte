<script lang="ts">
	import { CloudRain, WindIcon } from '$lib/components/icons';
	import { weatherStore } from '$lib/stores/weatherStore';
	import { getDayFromISOTimestamp } from '$lib/utils';
	import WeatherIcon from './WeatherIcon.svelte';

	let weather = $weatherStore;
	let lowest: number = $state(0);
	let highest: number = $state(0);
	let tempRange: number = $state(0);

	$effect(() => {
		if(!weather) return;
		lowest = Math.round(Math.min(...weather.daily.temperature2mMin));
		highest = Math.round(Math.max(...weather.daily.temperature2mMax));
		tempRange = highest - lowest;
	})

</script>



{#if weather}
	<div class="mx-auto w-full">
		<section
			class="hide-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth"
		>
			<div class="table-container">
				<table class="table table-hover">
					<tbody>
						{#each weather.daily.time as day, i}
							<tr>
								<td class="table-cell-fit " >{getDayFromISOTimestamp(day.toDateString())}</td>
								<td class="table-cell-fit"><WeatherIcon code={weather.daily.weatherCode[i]} size="xs" /></td>
								<td class="table-cell-fit">
									<div class="flex items-center gap-1">
										<WindIcon class="h-4 w-4" />
										{Math.round(weather.daily.windSpeed10mMax[i])}
										<span class="text-xs">mph</span>
									</div>
								</td>
								<td class="table-cell-fit">
									<div class="flex items-center gap-1">
										<CloudRain class="h-4 w-4" />
										{Math.round(weather.daily.precipitationHours[i])}
										<span class="text-xs">hr</span>
									</div>
								</td>
								<td>
									<div class="flex items-center gap-1">
										<span>{Math.round(weather.daily.temperature2mMin[i])}°</span>
										<div class="relative rounded-md w-full h-2 bg-surface-300 dark:bg-surface-700">
											<div class="absolute rounded-md h-full bg-surface-500 dark:bg-surface-300" style="left: {((Math.round(weather.daily.temperature2mMin[i]) - lowest) / tempRange) * 100}%; width: {((Math.round(weather.daily.temperature2mMax[i]) - Math.round(weather.daily.temperature2mMin[i])) / tempRange) * 100}%"></div>
										</div>
										<span>{Math.round(weather.daily.temperature2mMax[i])}°</span>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	</div>
{/if}
