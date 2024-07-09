'use client'
import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  verticalVelocity: {
    label: 'Velocity',
    color: '#2563eb',
  },
  altitude: {
    label: 'Altitude',
    color: '#60a5fa',
  },
  verticalAcceleration: {
    label: 'Acceleration',
    color: '#93c5fd',
  },
} satisfies ChartConfig

export const VmotionVsTime = ({
  rocketConfig,
}: {
  rocketConfig: Configuration
}): JSX.Element => {
  const simulation = rocketConfig.validatedBy?.[0]
  const simulationData = simulation?.simulationData
  if (simulation == null) {
    return <p>No simulation data available for this configuration.</p>
  }

  const altitude: number[] = simulationData?.Altitude ?? []
  const acceleration: number[] = simulationData?.VerticalAcceleration ?? []
  const velocity: number[] = simulationData?.VerticalVelocity ?? []
  const time: number[] = simulationData?.Time ?? []

  const chartData = time.map((t, index) => ({
    time: t,
    altitude: altitude[index],
    verticalVelocity: velocity[index],
    verticalAcceleration: acceleration[index],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{rocketConfig.name}</CardTitle>
        <CardDescription>
          {simulation.maxaltitude} m - {simulation.maxvelocity} m/s
        </CardDescription>
      </CardHeader>
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="altitude"
              type="monotone"
              // stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="verticalVelocity"
              type="monotone"
              // stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Optimum Delay {simulation.optimumdelay}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
