<script lang="ts">
  import CloudRain from 'lucide-svelte/icons/cloud-rain';

  let { class:className = '' } = $props();
</script>

<CloudRain class={className} />