// export type WeatherCode = 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 56 | 57 | 61 | 63 | 65 | 66 | 67 | 71 | 73 | 75 | 77 | 80 | 81 | 82 | 85 | 86 | 95 | 96 | 99;

export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with light hail',
    99: 'Thunderstorm with heavy hail'
  };

  return weatherCodes[code] || 'Unknown weather condition';
}

export function formatTime(timestamp: number, use24Hour = true) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24Hour
  });
}

export function formatNiceDate(date: Date): string {
  // Define arrays for day and month names
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Get components of the date
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  // Format time in 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // handle midnight (0 hours)

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  // Combine all parts
  return `${dayName}, ${monthName} ${dayOfMonth} at ${formattedTime}`;
}

export function formatPressure(pressure: number, unit = 'hPa') {
  switch (unit.toLowerCase()) {
    case 'hpa':
      return `${pressure} hPa`;
    case 'mbar':
      return `${pressure} mbar`; // Same as hPa
    case 'inhg':
      // Convert to inches of mercury (inHg)
      const inHg = (pressure * 0.02953).toFixed(2);
      return `${inHg} inHg`;
    case 'mmhg':
      // Convert to millimeters of mercury (mmHg)
      const mmHg = Math.round(pressure * 0.75006);
      return `${mmHg} mmHg`;
    case 'kpa':
      // Convert to kilopascals (kPa)
      const kPa = (pressure * 0.1).toFixed(1);
      return `${kPa} kPa`;
    case 'atm':
      // Convert to atmospheres
      const atm = (pressure / 1013.25).toFixed(3);
      return `${atm} atm`;
    default:
      return `${pressure} hPa`;
  }
}

export function getPressureDescription(pressure: number) {
  // Standard sea level pressure is 1013.25 hPa
  if (pressure >= 1030) {
    return 'High pressure - typically clear, stable weather';
  } else if (pressure >= 1020) {
    return 'Above normal pressure - generally fair weather';
  } else if (pressure >= 1010) {
    return 'Normal pressure - stable conditions';
  } else if (pressure >= 1000) {
    return 'Below normal pressure - weather may deteriorate';
  } else {
    return 'Low pressure - unsettled or stormy weather likely';
  }
}

export function getDayFromISOTimestamp(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}