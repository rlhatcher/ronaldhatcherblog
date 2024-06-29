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
      color: 'white',
      text: 'Motor Thrust over Time',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        color: 'white',
        text: 'Time (seconds)',
      },
      type: 'linear',
      position: 'bottom',
    },
    y: {
      title: {
        display: true,
        color: 'white',
        text: 'Thrust (Newtons)',
      },
    },
  },
}

export const SamplesChart = ({
  samples,
}: {
  samples: ThrustSample[]
}): JSX.Element => {
  const avgThrust =
    samples.reduce((acc, sample) => acc + sample.thrust, 0) / samples.length

  const data = {
    datasets: [
      {
        label: 'Thrust',
        data: samples.map(sample => ({ x: sample.time, y: sample.thrust })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
        tension: 0.5,
        fill: false,
      },
      {
        label: 'Average Thrust',
        data: samples.map(sample => ({ x: sample.time, y: avgThrust })),
        borderColor: 'rgb(54, 162, 235)',
        borderDash: [5, 10],
        pointRadius: 0,
        fill: false,
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
