export function metersToMiles (meters: number): number {
  return meters * 0.0006213712
}

export function mmToIn (mm: number): number {
  return mm * 0.03937008
}

export function hPaToinHg (hpa: number): number {
  return hpa * 0.02953
}

export function apiToFriendlyKeys (key: string): string {
  const mappings: {[key: string]: string} = {
    description: 'Current Weather',
    temp: 'Temperature',
    humidity: 'Humidity',
    forecast: 'Forecast for Today',
    uvi: 'UV Index',
    visibility: 'Visibility',
    windSpeed: 'Wind Speed',
    pressure: 'Atmospheric Pressure',
    high: 'High Temp',
    low: 'Low Temp',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    chancePrecip: 'Chance of Precipitation',
    rainAmount: 'Rain Amount',
  }

  return mappings[key] || key
}

export function conditionCodeToIconClass (conditionCode: string): string {
  return `owf-${conditionCode}`
}
