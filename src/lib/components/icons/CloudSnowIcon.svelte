<script lang="ts">
  import CloudSnow from 'lucide-svelte/icons/cloud-snow';

  let { class:className = '' } = $props();
</script>

<CloudSnow class={className} />