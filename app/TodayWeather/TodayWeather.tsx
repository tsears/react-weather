import React from 'react'
import * as styles from './TodayWeather.m.css'
import { Card } from '../Card/Card'
import { Table } from '../Table/Table'
import { TemperatureChart } from '../TemperatureChart/TemperatureChart'
import { HourlyWeather } from '../HourlyWeather/HourlyWeather'
import { HourlyForecast, Today } from 'types/Weather'
import * as convert from '../utils/convert'
import * as format from '../utils/format'

type Props = {
  todayWeather: Today,
  hourlyWeather: HourlyForecast[],
}

export const TodayWeather: React.FC<Props> =
({ todayWeather, hourlyWeather }: Props): React.ReactElement => {
  const excludes: string[] = [
    'condition',
    'forecast',
    'windSpeed',
    'windDirectionHuman',
    'windGust',
  ]
  const tableValues: {[key: string]: string | number} = {}

  if (todayWeather) {
    Object.keys(todayWeather).forEach(
      (k: keyof Today) => {
        if (excludes.includes(k)) { return }
        let value

        switch (k) {
        case 'high':
        case 'low':
          value = todayWeather[k] + '\u00b0'
          break
        case 'sunrise':
        case 'sunset':
          value = format.time(todayWeather[k])
          break
        case 'chancePrecip':
          value = format.asPercentage(todayWeather[k])
          break
        case 'rainAmount': {
          // shenanigans with the + sign are to force a coercion back to number
          const rainAmount = +convert.mmToIn(todayWeather[k]).toFixed(2)
          if (rainAmount < 0.1 && rainAmount > 0) {
            value = 'trace amounts expected'
          } else if (rainAmount === 0) {
            value = 'none'
          } else {
            value = `${rainAmount} in`
          }
          break
        }
        default:
          value = todayWeather[k]
        }

        tableValues[convert.apiToFriendlyKeys(k)] = value
      }
    )

    const { windSpeed, windDirectionHuman, windGust } = todayWeather
    tableValues.Wind = format.windData(windSpeed, windDirectionHuman, windGust)
  }

  const weatherIconClass =
    convert.conditionCodeToIconClass(todayWeather?.condition)
  const weatherIcon = `owf owf-5x ${weatherIconClass}`

  return (
    <div>
      <h2>Today's Weather</h2>
      <div className={styles.todayWeatherDataContainer}>
        <Card>
          <i className={weatherIcon}></i>
          <div>{todayWeather?.forecast}</div>
        </Card>
        <Table tableData={tableValues} />
      </div>
      <div>
        <TemperatureChart hourlyWeather={hourlyWeather} />
      </div>
      <div>
        <HourlyWeather hourlyWeather={hourlyWeather} />
      </div>
    </div>
  )
}
