// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface ImportMetaEnv {
			readonly VITE_WEATHER_API_KEY: string
		}

		interface ImportMeta {
			readonly env: ImportMetaEnv
		}
	}

	interface geolocationType {
		lat: number;
		lon: number;
	}
}

export { };

