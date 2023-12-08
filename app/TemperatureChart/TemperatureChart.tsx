import React, { useEffect } from 'react'
import * as styles from './TemperatureChart.m.css'
import { HourlyForecast } from 'types/Weather'
// attempt to keep bundle size under control, chartjs is huge and we're only
// using line chart
import {
  Chart,
  Colors,
  LineController,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  ChartType,
} from 'chart.js'

Chart.register(
  Colors,
  LineController,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

type Props = {
  hourlyWeather: HourlyForecast[],
}

type BgOptions = {
  startPercentage: number,
  widthPercentage: number,
  color: string,
}

declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    customCanvasBackgroundPlugin?: {
      color: string,
      startPercentage: number,
      widthPercentage: number,
    }
  }
}

const isDaysInFuture = (time: number, days: number) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + days)

  return tomorrow.toDateString() === new Date(time * 1000).toDateString()
}

const isTomorrow = (time: number) => isDaysInFuture(time, 1)
const isDayAfterTomorrow = (time: number) => isDaysInFuture(time, 2)

const small = window.matchMedia('(max-width: 767px)').matches

const plugin = {
  id: 'customCanvasBackgroundPlugin',
  beforeDraw: (
    chart: Chart,
    _: { cancelable: true },
    options: BgOptions
  ) => {
    const { ctx } = chart
    const startPercent = options.startPercentage
    const widthPercent = options.widthPercentage

    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = options.color || 'rgba(0,0,0,0)'

    ctx.fillRect(
      chart.chartArea.width * startPercent,
      chart.scales.y.top,
      chart.scales.x.right * widthPercent,
      chart.scales.y.bottom - chart.scales.y.paddingBottom
    )

    ctx.restore()
  },
}

export const TemperatureChart: React.FC<Props> =
({ hourlyWeather }: Props): React.ReactElement => {
  useEffect(() => {
    if (!hourlyWeather) {
      return
    }

    const container = document.getElementById('chartContainer')
    const data: number[] = []
    const labels: number[] = []

    if (small) {
      hourlyWeather.forEach((current, index) => {
        if (index % 5 === 0) {
          data.push(Math.round(current.temp))
          labels.push(current.time)
        }
      })
    } else {
      hourlyWeather.forEach((current) => {
        data.push(Math.round(current.temp))
        labels.push(current.time)
      })
    }

    const tomorrowIndex = labels.findIndex(isTomorrow) + 1
    const dayAfterTomorrowIndex = labels.findIndex(isDayAfterTomorrow) + 1
    const backgroundStartPercentageOffset =
      tomorrowIndex / labels.length
    const backgroundSizePercentage =
      (dayAfterTomorrowIndex - tomorrowIndex) / labels.length

    // I don't make the apis....
    // eslint-disable-next-line no-new
    const chart = new Chart(
      container as HTMLCanvasElement,
      {
        type: 'line',
        data: {
          labels: labels.map(
            label => new Date(label * 1000).toLocaleString('en-us', { timeStyle: 'short' }).split(', ')
          ),
          datasets: [
            {
              label: 'Temperature',
              data,
            },
          ],
        },
        plugins: [plugin],
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            customCanvasBackgroundPlugin: {
              startPercentage: backgroundStartPercentageOffset,
              widthPercentage: backgroundSizePercentage,
              color: 'rgba(0,0,0,0.3)',
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
