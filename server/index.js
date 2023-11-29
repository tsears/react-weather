import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { transformWeather } from './transform.js'

dotenv.config()
const port = process.env.PORT || 8081

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const app = express()

app.use(express.static('server/static', {
  index: false,
}))

app.get('/geo', async (req, res) => {
  const { q } = req.query
  const [city, state, country] = q.trim().split(',').map(p => p.trim())

  if (!q || !city || !state) {
    res.status(400).send('Missing query data')
    return
  }

  const normalizedState = state.toUpperCase()
  const normalizedCountry = country?.toUpperCase() || 'US'

  console.log(`Geo query: ${q}`)

  const queryParams = {
    appId: WEATHER_API_KEY,
    q: `${city},${normalizedState},${normalizedCountry}`,
    limit: 1,
  }

  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?${new URLSearchParams(queryParams)}`)
  const locationData = await response.json()

  if (locationData.length > 0) {
    const { name, state, country, lat, lon } = locationData[0]
    res.json({
      city: name,
      state,
      country,
      lat,
      lon,
    })
  } else {
    res.status(400).send(`Location "${q}" not found.`)
  }
})

app.get('/geo/reverse', async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    res.status(400).send('Missing query data')
    return
  }

  const queryParams = {
    lat,
    lon,
    appId: WEATHER_API_KEY,
  }

  const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?${new URLSearchParams(queryParams)}`)
  const locationData = await response.json()

  if (locationData.length > 0) {
    res.json({
      city: locationData[0].name,
      state: locationData[0]?.state || '',
      country: locationData[0].country,
    })
  } else {
    res.status(400).send('No location found')
  }
})

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    res.send(400).send('Missing query data')
    return
  }

  const queryParams = {
    lat,
    lon,
    appid: WEATHER_API_KEY,
    units: 'imperial',
    exclude: 'minutely',
  }

  console.log(`Weather query for ${lat},${lon}`)

  const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?${new URLSearchParams(queryParams)}`)
  const weatherData = await response.json()

  res.json(transformWeather(weatherData))
})

app.get('*', (req, res) => {
  console.log('REQUEST FROM: %s FOR RESOURCE: %s', req.hostname, req.originalUrl)
  res.json({})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
