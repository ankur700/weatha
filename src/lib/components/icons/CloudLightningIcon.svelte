<script lang="ts">
  import CloudLightning from 'lucide-svelte/icons/cloud-lightning';

  let { class:className = '' } = $props();
</script>

<CloudLightning class={className} />