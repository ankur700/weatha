<script lang="ts">
  import CircleX from 'lucide-svelte/icons/circle-x';

  let { class:className = '' } = $props();
</script>

<CircleX class={className} />