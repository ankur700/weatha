import { writable } from 'svelte/store';


export const weatherStore = writable<WeatherData | null>(null);