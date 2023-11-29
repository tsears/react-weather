import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'
import * as styles from './TemperatureChart.m.css'
import { HourlyForecast } from 'types/Weather'

type Props = {
  hourlyWeather: HourlyForecast[],
}

export const TemperatureChart: React.FC<Props> =
({ hourlyWeather }: Props): React.ReactElement => {
  useEffect(() => {
    if (!hourlyWeather) {
      return
    }

    const container = document.getElementById('chartContainer')

    const data = hourlyWeather.map(h => Math.round(h.temp))
    const labels = hourlyWeather.map(h => h.time)

    // I don't make the apis....
    // eslint-disable-next-line no-new
    const chart = new Chart(
      container as HTMLCanvasElement,
      {
        type: 'line',
        data: {
          labels: labels.map(
            label => new Date(label * 1000).toLocaleString('en-us', { dateStyle: 'short', timeStyle: 'short' })
          ),
          datasets: [
            {
              label: 'Temperature',
              data,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 20,
                color: '#eee',
                maxRotation: 0,
              },
              grid: {
                color: '#aaa',
              },
            },
            y: {
              ticks: {
                maxTicksLimit: 10,
                color: '#eee',
              },
              grid: {
                color: '#aaa',
              },

            },
          },
        },
      }
    )

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [hourlyWeather])

  return (
    <div className={styles.chartContainer}>
      <h3>Hourly Temperature</h3>
      <canvas id="chartContainer"></canvas>
    </div>
  )
}
