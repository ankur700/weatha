<script lang="ts">
  import CloudFogIcon from 'lucide-svelte/icons/cloud-fog';

  let { class:className = '' } = $props();
</script>

<CloudFogIcon class={className} />