'use client'

import {
  Chart as ChartJS,
  type ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxHeight: 1,
      },
    },
    title: {
      display: true,
      text: 'Vertical Motion vs Time',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Time (seconds)',
      },
      type: 'linear',
      position: 'bottom',
    },
    y: {
      title: {
        display: true,
        text: 'Thrust (Newtons)',
      },
    },
    y2: {
      type: 'linear',
      position: 'right',
      display: true,
      title: {
        text: 'Vertical Velocity (m/s)',
        display: true,
      },
    },
  },
}

export const VmotionVsTime = ({
  time,
  altitude,
  verticalVelocity,
  verticalAcceleration,
}: {
  time: number[]
  verticalVelocity: number[]
  altitude: number[]
  verticalAcceleration: number[]
}): JSX.Element => {
  const data = {
    datasets: [
      {
        label: 'Altitude',
        data: time.map((currentTime, index) => ({
          x: currentTime,
          y: altitude[index],
        })),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
        tension: 0.5,
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'Veretical Velocity',
        data: time.map((currentTime, index) => ({
          x: currentTime,
          y: verticalVelocity[index],
        })),
        borderColor: 'green',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
        tension: 0.5,
        fill: false,
        yAxisID: 'y2',
      },
      {
        label: 'Vertical Acceleration',
        data: time.map((currentTime, index) => ({
          x: currentTime,
          y: verticalAcceleration[index],
        })),
        borderColor: 'blue',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
        tension: 0.5,
        fill: false,
        yAxisID: 'y',
      },
    ],
  }

  return (
    <Line
      options={options}
      data={data}
    />
  )
}
