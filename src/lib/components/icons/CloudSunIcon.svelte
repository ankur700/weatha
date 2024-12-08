<script lang="ts">
  import CloudSun from 'lucide-svelte/icons/cloud-sun';

  let { class:className = '' } = $props();
</script>

<CloudSun class={className} />