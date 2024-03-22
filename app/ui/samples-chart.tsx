'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'
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
  Filler
} from 'chart.js'

// Register the components to be used
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
      position: 'top' // Position the legend at the top
    },
    title: {
      display: true,
      text: 'Motor Thrust over Time' // Chart title
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Time (seconds)' // X-axis label
      },
      type: 'linear', // Ensure linear scale for time
      position: 'bottom'
    },
    y: {
      title: {
        display: true,
        text: 'Thrust (Newtons)' // Y-axis label
      }
    }
  }
}

export const SamplesChart = ({ samples }: { samples: ThrustSample[] }): JSX.Element => {
  // Calculate average thrust
  const avgThrust = samples.reduce((acc, sample) => acc + sample.thrust, 0) / samples.length

  // Prepare the data for Chart.js
  const data = {
    datasets: [
      {
        label: 'Thrust',
        data: samples.map(sample => ({ x: sample.time, y: sample.thrust })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Average Thrust',
        data: samples.map(sample => ({ x: sample.time, y: avgThrust })),
        borderColor: 'rgb(54, 162, 235)',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false
      }
    ]
  }

  return <Line options={options} data={data} />
}
