import { skeleton } from '@skeletonlabs/tw-plugin';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { join } from 'path';
import type { Config } from 'tailwindcss';
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		typography,
		forms,
		containerQueries,
		aspectRatio,
		skeleton({
			themes: {
				preset: [{ name: 'vintage', enhancements: true }]
			}
		})
	]
} satisfies Config;
