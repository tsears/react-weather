import React from 'react'
import { Table } from '../Table/Table'
import { Card } from '../Card/Card'
import { Current } from 'types/Weather'
import * as styles from './CurrentWeather.m.css'
import * as convert from '../utils/conversion'

type Props = {
  currentWeather: Current,
  sunrise: number,
  sunset: number,
}

enum DayPeriod {
  day,
  night,
}

function apiToFriendlyKeys (key: string): string {
  const mappings: {[key: string]: string} = {
    description: 'Current Weather',
    temp: 'Temperature',
    humidity: 'Humidity',
    forecast: 'Forecast for Today',
    uvi: 'UV Index',
    visibility: 'Visibility',
    windSpeed: 'Wind Speed',
    pressure: 'Atmospheric Pressure',
  }

  return mappings[key] || key
}

function dayOrNight (
  sunrise: number,
  sunset: number,
  current: number
): DayPeriod {
  if (current < sunrise || current > sunset) {
    return DayPeriod.night
  }

  return DayPeriod.day
}

export const CurrentWeather: React.FC<Props> =
({ currentWeather, sunrise, sunset }: Props): React.ReactElement => {
  const tableValues: {[key: string]: string | number} = {}
  const excludes = [
    'description',
    'condition',
    'temp',
    'windDirection',
    'windDirectionHuman',
    'windGust',
    'windSpeed',
    'time',
  ]

  if (currentWeather) {
    tableValues['Last Update'] = new Date(currentWeather.time * 1000).toLocaleString()

    Object.keys(currentWeather).forEach(
      (k: keyof Current) => {
        if (excludes.includes(k)) { return }

        tableValues[apiToFriendlyKeys(k)] = currentWeather[k]
      }
    )

    const {
      windSpeed,
      windDirectionHuman,
      windGust,
      visibility,
      pressure,
    } = currentWeather

    tableValues.Wind = `${windSpeed} mph ${windDirectionHuman}`
    if (windGust) {
      tableValues.Wind += `, gusting to ${windGust} mph`
    }

    tableValues.Humidity += '%'
    tableValues.Visibility = visibility === 10000
      ? 'Unlimited'
      : convert.metersToMiles(visibility) + 'miles'
    tableValues['Atmospheric Pressure'] = Math.round(convert.hPaToinHg(pressure)) + ' in'
  }

  const period = dayOrNight(sunrise, sunset, Date.now())
  const suffix = period === DayPeriod.night ? '-n' : '-d'
  const description = currentWeather?.description
    .split(' ')
    .map(x => `${x[0].toLocaleUpperCase()}${x.substr(1)}`)
    .join(' ')
  const weatherIcon = `owf owf-5x owf-${currentWeather?.condition}${suffix}`

  return (
    <div>
      <h2>Current Weather</h2>
      <div className={styles.currentWeatherDataContainer}>
        <Card>
          <i className={weatherIcon}></i>
          <div>{description}</div>
          <div>{currentWeather?.temp}°</div>
        </Card>
        <Table tableData={tableValues} />
      </div>
    </div>
  )
}
