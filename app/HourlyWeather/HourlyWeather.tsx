import React from 'react'
import * as styles from './HourlyWeather.m.css'
import { HourlyForecast } from 'types/Weather'
import * as format from '../utils/format'
import * as convert from '../utils/convert'

type Props = {
  hourlyWeather: HourlyForecast[]
}

export const HourlyWeather: React.FC<Props> =
({ hourlyWeather }: Props): React.ReactElement => {
  const hourlyWeatherData = (): React.ReactElement[] =>
    hourlyWeather.slice(0, 12).map(w => (
      <div className={styles.hourlyForecastItem} key={w.time}>
        <div className={styles.hourlyTickMark} />
        <div>{format.time(w.time)}</div>
        <div>
          <i className={'owf owf-2x ' + convert.conditionCodeToIconClass(w.condition.toString())} />
        </div>
        <div>{Math.round(w.temp) + '\u00b0'}</div>
        <div>{format.capitalizeEveryWord(w.description)}</div>
      </div>
    ))

  return (
    <div>
      <h2>Hourly Forecast</h2>
      <div className={styles.hourlyForecast}>
        { hourlyWeatherData() }
      </div>
    </div>
  )
}
