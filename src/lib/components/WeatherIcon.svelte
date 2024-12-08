<script lang="ts">
  import {
  	Cloud,
  	CloudFog,
  	CloudLightning,
  	CloudRain,
  	CloudSnow,
  	CloudSun,
  	Sun,
  } from '$lib/components/icons';

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
        return Sun;
      case 1:
      case 2:
        return CloudSun;
      case 3:
        return Cloud;
      case 45:
      case 48:
        return CloudFog;
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
        return CloudRain;
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return CloudSnow;
      case 95:
      case 96:
      case 99:
        return CloudLightning;
      default:
        return Cloud;
    }
  }

  let Icon = $derived(getWeatherIcon(code));
</script>

<Icon class={sizeClasses[size]} />