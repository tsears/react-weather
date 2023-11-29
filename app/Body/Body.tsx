import React, { useState, useCallback } from 'react'
import * as styles from './Body.m.css'
import { PanelContainer } from '../Panel/PanelContainer'
import { Panel } from '../Panel/Panel'
import { SearchBar } from '../SearchBar/SearchBar'
import { CurrentWeather } from '../CurrentWeather/CurrentWeather'
import { TodayWeather } from '../TodayWeather/TodayWeather'
import { ForecastWeather } from '../ForecastWeather/ForecastWeather'
import { Weather } from 'types/Weather'
import { Location } from 'types/Location'

type BodyState = {
  weatherData: Weather,
  locationData: Location,
}

async function fetchWeatherData (lat: number, lon: number): Promise<Weather> {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
  if (!response.ok) {
    throw new Error('HTTP error, status = ' + response.status)
  }

  return await response.json() as Weather
}

async function fetchGeoData (query: string): Promise<Location> {
  const response = await fetch(`/api/geo?q=${query}`)
  if (!response.ok) {
    throw new Error('HTTP error, status = ' + response.status)
  }

  return await response.json() as Location
}

async function getWeatherForLocation (
  setState: (bodyState: BodyState) => void,
  location: string
): Promise<void> {
  const locationData = await fetchGeoData(location)
  const weatherData = await fetchWeatherData(locationData.lat, locationData.lon)

  setState({ weatherData, locationData })
}

export const Body: React.FunctionComponent<{}> = (): React.ReactElement => {
  const [state, setState] = useState({
    weatherData: {
      current: null,
      today: null,
      hourly: null,
      daily: null,
    },
    locationData: null,
  })

  const updateCallback = useCallback((query: string): Promise<void> => {
    return getWeatherForLocation(setState, query)
  }, [])


  return (
    <div className={styles.body}>
      <PanelContainer>
        <Panel>
          <SearchBar callback={updateCallback}/>
        </Panel>
        <Panel>
          <CurrentWeather currentWeather={state.weatherData.current}
            location={state.locationData}
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
        <Panel>
          <ForecastWeather
            forecastWeather={state.weatherData?.daily?.slice(1)}
          ></ForecastWeather>
        </Panel>
      </PanelContainer>
    </div>
  )
}
