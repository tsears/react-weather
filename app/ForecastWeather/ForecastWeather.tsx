import React from 'react'
import * as styles from './ForecastWeather.m.css'
import { Daily } from 'types/Weather'
import { ForecastCard } from '../ForecastCard/ForecastCard'

type Props = {
  forecastWeather: Daily[],
}

export const ForecastWeather: React.FC<Props> =
({ forecastWeather }: Props): React.ReactElement => {
  const cards = forecastWeather?.map(f => (
    <ForecastCard forecast={f} key={f.time}></ForecastCard>
  ))

  return (
    <div>
      <h2>Forecast</h2>
      <div className={styles.forecastContainer}>
        { cards }
      </div>
    </div>
  )
}
