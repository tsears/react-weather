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

    const small = window.matchMedia('(max-width: 767px)').matches

    const container = document.getElementById('chartContainer')

    let data: number[]
    let labels: number[]

    if (small) {
      data = hourlyWeather.reduce((acc, current, index): number[] => {
        if (index % 5 === 0) {
          acc.push(Math.round(current.temp))
        }
        return acc
      }, [])

      labels = hourlyWeather.reduce((acc, current, index): string[] => {
        if (index % 5 === 0) {
          acc.push(current.time)
        }

        return acc
      }, [])
    } else {
      data = hourlyWeather.map(h => Math.round(h.temp))
      labels = hourlyWeather.map(h => h.time)
    }

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
          elements: {
            line: {
              tension: 0.4,
            },
          },
          scales: {
            x: {
              ticks: {
                align: small ? 'start' : 'center',
                maxTicksLimit: small ? 2 : 20,
                color: '#eee',
                maxRotation: 0,
                font: {
                  size: small ? 8 : 16,
                },
              },
              grid: {
                color: '#aaa',
              },
            },
            y: {
              ticks: {
                maxTicksLimit: 10,
                color: '#eee',
                font: {
                  size: small ? 8 : 16,
                },
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
