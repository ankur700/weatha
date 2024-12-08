<script lang="ts">
  import WindArrowDown from 'lucide-svelte/icons/wind-arrow-down';

  let { class:className = '' } = $props();
</script>

<WindArrowDown class={className} />