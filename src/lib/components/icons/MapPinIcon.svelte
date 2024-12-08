<script lang="ts">
  import MapPin from 'lucide-svelte/icons/map-pin';

  let { class:className = '' } = $props();
</script>

<MapPin class={className} />