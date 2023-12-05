import 'css/index.scss'
import 'types/csshelper'
import * as styles from './app.m.css'

import { Header } from './Header/Header'
import { Body } from './Body/Body'
import { Footer } from './Footer/Footer'

import React, { useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'

import { Weather } from 'types/Weather'
import { Location } from 'types/Location'

type State = {
  weatherData: Weather,
  locationData: Location,
}

const DEFAULT_STATE: State = {
  weatherData: {
    current: null,
    today: null,
    hourly: null,
    daily: null,
  },
  locationData: null,
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
  setState: (bodyState: State) => void,
  location: string
): Promise<void> {
  const locationData = await fetchGeoData(location)
  const weatherData = await fetchWeatherData(locationData.lat, locationData.lon)

  setState({ weatherData, locationData })
}
export const App: React.FunctionComponent<{}> = (): React.ReactElement => {
  const [state, setState] = useState(DEFAULT_STATE)

  const updateCallback = useCallback((query: string): Promise<void> => {
    setState(DEFAULT_STATE)
    return getWeatherForLocation(setState, query)
  }, [])

  return (
    <div className={styles.app}>
      <Header updateCallback={updateCallback} />
      <Body weatherData={state.weatherData} locationData={state.locationData} />
      <Footer />
    </div>
  )
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
