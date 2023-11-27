import * as React from 'react'
import * as styles from './ForecastCard.m.css'
import { Daily } from 'types/Weather'
import { Card } from '../Card/Card'
import * as convert from '../utils/convert'
import * as format from '../utils/format'

type Props = {
  forecast: Daily,
}

export const ForecastCard: React.FC<Props> =
({ forecast }: Props): React.ReactElement => {
  const weatherIconClass =
    convert.conditionCodeToIconClass(forecast?.condition)
  const weatherIcon = `owf owf-5x ${weatherIconClass} ${styles.icon}`
  return (
    <Card>
      <div className={styles.dayAndIconContainer}>
        <div className={styles.day}>{format.dayOfWeek(forecast.time)}</div>
        <i className={weatherIcon}></i>
      </div>
      <div className={styles.description}>
        {forecast.description}
      </div>
      <div className={styles.tempContainer}>
        <div className={styles.low}>{Math.round(forecast.low)}°</div>
        <div className={styles.high}>{Math.round(forecast.high)}°</div>
      </div>
    </Card>
  )
}
