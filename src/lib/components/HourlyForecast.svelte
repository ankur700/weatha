<script lang="ts">
	import { weatherStore } from '$lib/stores/weatherStore';
	import WeatherIcon from './WeatherIcon.svelte';

	let weather = $weatherStore;
  let { currentHour } = $props();
	let DayHours: Date[] = $state([]);

	$effect(() => {
		if (weather) {
      const currentHourIndex = weather.hourly.time.findIndex((time) => time.getHours() === currentHour);
      const lastNeededIndex = currentHourIndex + 24;
			DayHours = weather.hourly.time.slice(currentHourIndex, lastNeededIndex);
		}
	});
</script>

<section class="flex snap-x snap-mandatory cursor-ew-resize scroll-px-4 hide-scrollbar gap-4 overflow-x-auto scroll-smooth py-2">
	{#if DayHours && weather}
		{#each DayHours as time, index}
			<div class="bg-transparent shrink-0 snap-start p-2 text-center w-20">
				<div class="flex flex-col justify-center items-center gap-2">
          {#if index === 0}
          <p>Now</p>
          {:else}
          <p class=" text-sm">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
          {/if}
					<WeatherIcon code={weather.hourly.weatherCode[index]} size="sm" />
          <p class=" text-sm">
            {Math.round(weather.hourly.temperature2m[index])}°
          </p>
				</div>
			</div>
		{/each}
	{/if}
</section>
