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
  condition: string,
  chancePrecip: number,
  rainAmount: number,
  uvi: number,
  windSpeed: number,
  windDirectionHuman: string,
  windGust: number,
}

export type Daily = {
  time: number,
  description: string,
  high: number,
  low: number,
  condition: string,
}

export type HourlyForecast = {
  time: number,
  temp: number,
  description: string,
  condition: number,
}

export type Weather = {
  current: Current,
  today: Today,
  hourly: HourlyForecast[],
  daily: Daily[],
}
