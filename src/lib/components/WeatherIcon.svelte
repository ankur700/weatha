<script lang="ts">
  import {
  	CloudFogIcon,
  	CloudIcon,
  	CloudLightningIcon,
  	CloudRainIcon,
  	CloudSnowIcon,
  	CloudSunIcon,
  	SunIcon
  } from 'lucide-svelte';

  // export let code: WeatherCode;
  let { code, size }: { code: number, size: keyof typeof sizeClasses } = $props();
  const sizeClasses = {
      xs: 'w-4 h-4',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16'
  };

  function getWeatherIcon(code: number ) {
    switch (code) {
      case 0:
        return SunIcon;
      case 1:
      case 2:
        return CloudSunIcon;
      case 3:
        return CloudIcon;
      case 45:
      case 48:
        return CloudFogIcon;
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
        return CloudRainIcon;
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return CloudSnowIcon;
      case 95:
      case 96:
      case 99:
        return CloudLightningIcon;
      default:
        return CloudIcon;
    }
  }

  let Icon = $derived(getWeatherIcon(code));
</script>

  <Icon class={sizeClasses[size]} />