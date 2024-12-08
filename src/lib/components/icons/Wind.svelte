<script lang="ts">
  import Wind from 'lucide-svelte/icons/wind';

  let { class:className = '' } = $props();
</script>

<Wind class={className} />