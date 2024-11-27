<script lang="ts">
	import { getDayFromISOTimestamp } from '$lib/utils';
	import { weatherStore } from '$lib/weatherStore';
	import { ArrowDown, ArrowUp, CloudRain, Wind } from 'lucide-svelte';
	import WeatherIcon from './WeatherIcon.svelte';

	let weather = $weatherStore;
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
										<ArrowDown class="h-4 w-4" />
										{Math.round(weather.daily.temperature2mMin[i])}°
									</div>
								</td>
								<td class="table-cell-fit">
									<div class="flex items-center gap-1">
										<ArrowUp class="h-4 w-4" />
										{Math.round(weather.daily.temperature2mMax[i])}°
									</div>
								</td>
								<td class="table-cell-fit">
									<div class="flex items-center gap-1">
										<Wind class="h-4 w-4" />
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
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	</div>
{/if}
