<script lang="ts">
  import Sun from 'lucide-svelte/icons/sun';

  let { class:className = '' } = $props();
</script>

<Sun class={className} />