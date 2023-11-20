export type Current = {
  time: number,
  description: string,
  temp: number,
  humidity: number,
  condition: string,
  uvi: number,
  visibility: number,
  windSpeed: number,
  windDirection: number,
  windDirectionHuman: string,
  windGust: number,
  pressure: number,
}

export type Today = {
  forecast: string,
  high: number,
  low: number,
  sunrise: number,
  sunset: number,
}

export type Weather = {
  current: Current,
  today: Today,
}
