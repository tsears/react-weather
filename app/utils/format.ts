export function date (timestamp: number): string {
  return new Date(timestamp * 1000)
    .toLocaleString(
      'en-us',
      {
        dateStyle: 'short',
        timeStyle: 'short',
      }
    )
}

export function time (timestamp: number): string {
  return new Date(timestamp * 1000)
    .toLocaleString(
      'en-us',
      {
        timeStyle: 'short',
      }
    )
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
  if (windSpeed === 0) {
    return 'No Wind'
  }
  let wind = `${Math.round(windSpeed)} mph ${windDirection}`
  if (windGust) {
    wind += `, gusting to ${Math.round(windGust)} mph`
  }
  return wind
}
