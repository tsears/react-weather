import React, { useState, useEffect } from 'react'
import * as styles from './Body.m.css'
import { PanelContainer } from '../Panel/PanelContainer'
import { Panel } from '../Panel/Panel'
import { CurrentWeather } from '../CurrentWeather/CurrentWeather'
import { TodayWeather } from '../TodayWeather/TodayWeather'
import { Weather } from 'types/Weather'

type BodyState = {
  weatherData: Weather,
}

async function fetchData (
  setState: (bodyState: BodyState) => void
): Promise<void> {
  const response = await fetch('/api/weather')
  if (!response.ok) {
    throw new Error('HTTP error, status = ' + response.status)
  }

  const data = await response.json() as Weather

  setState({ weatherData: data })
}

export const Body: React.FunctionComponent<{}> = (): React.ReactElement => {
  const [state, setState] = useState({
    weatherData: {
      current: null,
      today: null,
      hourly: null,
    },
  })

  useEffect(() => {
    fetchData(setState)
  }, [])

  return (
    <div className={styles.body}>
      <PanelContainer>
        <Panel>
          <CurrentWeather currentWeather={state.weatherData.current}
            sunrise={state.weatherData.today?.sunrise}
            sunset={state.weatherData.today?.sunset}
          />
        </Panel>
        <Panel>
          <TodayWeather
            todayWeather={state.weatherData.today}
            hourlyWeather={state.weatherData.hourly}
          ></TodayWeather>
        </Panel>
      </PanelContainer>
    </div>
  )
}
