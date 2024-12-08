<script lang="ts">
  import Moon from 'lucide-svelte/icons/moon';

  let { class:className = '' } = $props();
</script>

<Moon class={className} />
