'use client'
import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
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

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="thrust"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
