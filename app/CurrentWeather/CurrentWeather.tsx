import React from 'react'
import { Table } from '../Table/Table'
import { Card } from '../Card/Card'
import { Current } from 'types/Weather'
import * as styles from './CurrentWeather.m.css'
import * as convert from '../utils/convert'
import * as format from '../utils/format'

type Props = {
  currentWeather: Current,
  sunrise: number,
  sunset: number,
}

enum DayPeriod {
  day,
  night,
}

function dayOrNight (
  sunrise: number,
  sunset: number,
  current: number
): DayPeriod {
  // for some reason, sunrise/sunset are specified with more precision from the
  // openweathermap api than the currnet time
  const convertedCurrent = current / 1000
  if (convertedCurrent < sunrise || convertedCurrent > sunset) {
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
    tableValues['Last Update'] = format.date(currentWeather.time)

    Object.keys(currentWeather).forEach(
      (k: keyof Current) => {
        if (excludes.includes(k)) { return }

        tableValues[convert.apiToFriendlyKeys(k)] = currentWeather[k]
      }
    )

    const {
      windSpeed,
      windDirectionHuman,
      windGust,
      visibility,
      pressure,
    } = currentWeather

    tableValues.Wind = format.windData(
      windSpeed,
      windDirectionHuman,
      windGust
    )
    tableValues.Humidity += '%'
    tableValues.Visibility = visibility === 10000
      ? 'Unlimited'
      : convert.metersToMiles(visibility) + 'miles'
    tableValues['Atmospheric Pressure'] = Math.round(convert.hPaToinHg(pressure)) + ' in'
  }

  const description = format.capitalizeEveryWord(currentWeather?.description)

  // Determine whether to use 'day' or 'night' iconography
  const period = dayOrNight(sunrise, sunset, Date.now())
  const suffix = period === DayPeriod.night ? '-n' : '-d'
  const weatherIconClass =
    convert.conditionCodeToIconClass(currentWeather?.condition)
  const weatherIcon = `owf owf-5x ${weatherIconClass}${suffix}`

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
