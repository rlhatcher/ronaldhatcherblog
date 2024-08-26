'use client'
// import { useMediaQuery } from '@react-hook/media-query'
import React from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { type ThrustSample } from '@/schemas/Motors'
const chartConfig = {
  desktop: {
    label: 'thrust',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export const MotorChart = ({
  samples,
}: {
  samples: ThrustSample[]
}): JSX.Element => {
  const avgThrust =
    samples.reduce((acc, sample) => acc + sample.thrust, 0) / samples.length

  const chartData = samples.map(sample => ({
    time: sample.time,
    thrust: sample.thrust,
    avgThrust,
  }))
  // const isSmallScreen = useMediaQuery('(max-width: 640px)')

  return (
    <div>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="time"
            tickLine={true}
            axisLine={true}
            tickMargin={5}
            label={{
              value: 'Duration (s)',
              angle: 0,
              position: 'bottom',
            }}
            tickFormatter={value => value.toFixed(2)}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            label={{
              value: 'Thrust (N)',
              angle: 90,
              position: 'left',
            }}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <ReferenceLine
            y={avgThrust}
            yAxisId={'left'}
            stroke="hsl(var(--chart-3))"
          />
          <Line
            dataKey="thrust"
            type="natural"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
            yAxisId="left"
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
