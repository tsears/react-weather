import 'css/index.scss'
import 'types/csshelper'
import * as styles from './app.m.css'

import { Header } from './Header/Header'
import { Body } from './Body/Body'
import { Footer } from './Footer/Footer'
import { Toaster, ToastRef } from './Toaster/Toaster'
import { SearchBar } from './SearchBar/SearchBar'

import React, { useState, useCallback, useRef, Ref } from 'react'
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
  const data = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
  return await data.json()
}

async function fetchGeoData (query: string): Promise<Location> {
  const response = await fetch(`/api/geo?q=${query}`)
  if (!response.ok) {
    throw new Error(await response.text())
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
  const toaster: Ref<ToastRef> = useRef()

  const updateCallback = useCallback(async (query: string): Promise<void> => {
    setState(DEFAULT_STATE)

    try {
      return await getWeatherForLocation(setState, query)
    } catch (e) {
      toaster.current.toast(e.message)
    }
  }, [])

  return (
    <div className={styles.app}>
      <Header>
        <SearchBar callback={updateCallback}/>
      </Header>
      <Body weatherData={state.weatherData}
        locationData={state.locationData}
      />
      <Footer />
      <Toaster ref={toaster} />
    </div>
  )
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
