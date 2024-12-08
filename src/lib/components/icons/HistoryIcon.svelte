<script lang="ts">
  import History from 'lucide-svelte/icons/history';

  let { class:className = '' } = $props();
</script>

<History class={className} />