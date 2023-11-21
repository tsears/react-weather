export function date (timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${hour % 12}:${minute < 10 ? '0' + minute : minute} ${hour < 12 ? 'AM' : 'PM'}`
}

export function asPercentage (value: number): string {
  return `${value * 100}%`
}

export function capitalizeEveryWord (input: string): string {
  if (!input || input.length === 0) {
    return
  }

  return input.split(' ')
    .map(x => `${x[0].toLocaleUpperCase()}${x.substr(1)}`)
    .join(' ')
}

export function windData (
  windSpeed: number,
  windDirection: string,
  windGust: number): string {
  let wind = `${Math.round(windSpeed)} mph ${windDirection}`
  if (windGust) {
    wind += `, gusting to ${Math.round(windGust)} mph`
  }
  return wind
}
