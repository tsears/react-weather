import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { transformWeather } from './transform.js'

dotenv.config()
const port = process.env.PORT || 8081
let weather = ''

const WEATHER_API_KEY = process.env.WEATHER_API_KEY

;(async function () {
  const queryParams = {
    lat: '45.5391889',
    lon: '-123.1297613',
    appid: WEATHER_API_KEY,
    units: 'imperial',
    exclude: 'minutely',
  }

  const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?${new URLSearchParams(queryParams)}`)
  const weatherData = await response.json()

  weather = transformWeather(weatherData)
})()

const app = express()

app.use(express.static('server/static', {
  index: false,
}))

app.get('/weather', (req, res) => {
  res.json(weather)
})

app.get('*', (req, res) => {
  console.log('REQUEST FROM: %s FOR RESOURCE: %s', req.hostname, req.originalUrl)
  res.json({})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
