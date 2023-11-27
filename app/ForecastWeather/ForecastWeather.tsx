import * as React from 'react'
import * as styles from './ForecastWeather.m.css'
import { Daily } from 'types/Weather'
import { ForecastCard } from '../ForecastCard/ForecastCard'

type Props = {
  forecastWeather: Daily[],
}

export const ForecastWeather: React.FC<Props> =
({ forecastWeather }: Props): React.ReactElement => {
  console.log('fw', forecastWeather)
  const cards = forecastWeather?.map(f => (
    <ForecastCard forecast={f} key={f.time}></ForecastCard>
  ))

  console.log(cards)

  return (
    <div>
      <h2>Forecast</h2>
      <div className={styles.forecastContainer}>
        { cards }
      </div>
    </div>
  )
}
