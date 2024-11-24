<script lang="ts">
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let { children } = $props();
</script>

{@render children()}
