function windDirectionDegreesToHuman (degrees) {
  if (isNaN(parseFloat(degrees))) {
    throw new Error('Invalid Argument. Must be a number')
  }

  if (degrees < 0 || degrees > 365) {
    throw new Error('Invalid Argument. Must be between 0 and 360')
  }

  if (degrees > 0 && degrees <= 11.25) {
    return 'N'
  } else if (degrees > 11.25 && degrees <= 33.75) {
    return 'NNE'
  } else if (degrees > 33.75 && degrees <= 56.25) {
    return 'NE'
  } else if (degrees > 56.25 && degrees <= 78.75) {
    return 'ENE'
  } else if (degrees > 78.75 && degrees <= 101.25) {
    return 'E'
  } else if (degrees > 101.25 && degrees <= 123.75) {
    return 'ESE'
  } else if (degrees > 123.75 && degrees <= 146.25) {
    return 'SE'
  } else if (degrees > 146.25 && degrees <= 168.75) {
    return 'SSE'
  } else if (degrees > 168.75 && degrees <= 191.25) {
    return 'S'
  } else if (degrees > 191.25 && degrees <= 213.75) {
    return 'SSW'
  } else if (degrees > 213.75 && degrees <= 236.25) {
    return 'SW'
  } else if (degrees > 236.25 && degrees <= 258.75) {
    return 'WSW'
  } else if (degrees > 258.75 && degrees <= 281.25) {
    return 'W'
  } else if (degrees > 281.25 && degrees <= 303.75) {
    return 'WNW'
  } else if (degrees > 303.75 && degrees <= 326.25) {
    return 'NW'
  } else if (degrees > 326.25 && degrees <= 348.75) {
    return 'NNW'
  } else if (degrees > 348.75 && degrees <= 360) {
    return 'N'
  } else {
    return '-'
  }
}

function transformWeather (data) {
  const hourlyForecast = data.hourly.map(h => ({ time: h.dt, temp: h.temp }))
  const dailyForecast = data.daily.map(d => {
    return {
      time: d.dt,
      description: d.summary,
      high: d.temp.max,
      low: d.temp.min,
      condition: d.weather[0].id,
    }
  })

  return {
    current: {
      time: data.current.dt,
      description: data.current.weather[0].description,
      temp: Math.round(data.current.temp),
      humidity: data.current.humidity,
      condition: data.current.weather[0].id,
      uvi: data.current.uvi,
      visibility: data.current.visibility,
      windSpeed: Math.round(data.current.wind_speed),
      windDirection: data.current.wind_deg,
      windDirectionHuman: windDirectionDegreesToHuman(data.current.wind_deg),
      windGust: data.current.wind_gust,
      pressure: data.current.pressure,
    },
    today: {
      forecast: data.daily[0].summary,
      high: Math.round(data.daily[0].temp.max),
      low: Math.round(data.daily[0].temp.min),
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
      condition: data.daily[0].weather[0].id,
      chancePrecip: data.daily[0].pop,
      rainAmount: data.daily[0].rain,
      uvi: data.daily[0].uvi,
      windSpeed: data.daily[0].wind_speed,
      windDirectionHuman: windDirectionDegreesToHuman(data.daily[0].wind_deg),
      windGust: data.daily[0].wind_gust,
    },
    hourly: hourlyForecast,
    daily: dailyForecast,
  }
}

export {
  transformWeather,
}
