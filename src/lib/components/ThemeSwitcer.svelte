<script lang="ts">
	import { Moon, Sun } from './icons';

	let darkMode = true;

	function saveTheme(): Promise<void> {
		return new Promise((resolve, reject) => {
			chrome.storage.local.set({ theme: darkMode ? 'dark' : 'light' }, () => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
					return;
				}
				resolve();
			});
		});
	}

	async function handleSwitchDarkMode() {
		darkMode = !darkMode;

		saveTheme();
		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');

		const { theme } = await chrome.storage.local.get('theme');

		if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}
</script>

<button class="btn btn-sm" aria-label="Toggle dark mode" onclick={handleSwitchDarkMode}>
	{#if darkMode}
		<Moon class="h-4 w-4" />
	{:else}
		<Sun class="h-4 w-4" />
	{/if}
</button>

