<script lang="ts">
	import { CircleAlert } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	let { error } = $props();
</script>

<aside transition:fade={{ duration: 200 }} class="alert variant-glass-error">
	<CircleAlert class="w-5 h-5"/>
	<div class="alert-message">
		<h3 class="h3">Error:</h3>
		<p>{error}</p>
	</div>
</aside>
