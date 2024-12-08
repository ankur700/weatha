<script lang="ts">
  import Cloud from 'lucide-svelte/icons/cloud';

  let { class:className = '' } = $props();
</script>

<Cloud class={className} />