import React from 'react'
import * as styles from './Body.m.css'
import { PanelContainer } from '../Panel/PanelContainer'
import { Panel } from '../Panel/Panel'
import { CurrentWeather } from '../CurrentWeather/CurrentWeather'
import { TodayWeather } from '../TodayWeather/TodayWeather'
import { ForecastWeather } from '../ForecastWeather/ForecastWeather'
import { Weather } from 'types/Weather'
import { Location } from 'types/Location'

type BodyProps = {
  weatherData: Weather,
  locationData: Location,
}

export const Body: React.FC<BodyProps> =
({ weatherData, locationData }: BodyProps): React.ReactElement => {
  const haveData = weatherData?.current && locationData

  return (
    <div className={styles.body}>
      <PanelContainer>
        { haveData && (
          <Panel>
            <CurrentWeather currentWeather={weatherData.current}
              location={locationData}
              sunrise={weatherData.today?.sunrise}
              sunset={weatherData.today?.sunset}
            />
          </Panel>
        )}
        { haveData && (
          <Panel>
            <TodayWeather
              todayWeather={weatherData.today}
              hourlyWeather={weatherData.hourly}
            ></TodayWeather>
          </Panel>
        )}
        { haveData && (
          <Panel>
            <ForecastWeather
              forecastWeather={weatherData?.daily?.slice(1)}
            ></ForecastWeather>
          </Panel>
        )}
      </PanelContainer>
    </div>
  )
}
