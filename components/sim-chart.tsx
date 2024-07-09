'use client'
import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  verticalVelocity: {
    label: 'Velocity',
    color: 'hsl(var(--chart-1))',
  },
  altitude: {
    label: 'Altitude',
    color: 'hsl(var(--chart-2))',
  },
  verticalAcceleration: {
    label: 'Acceleration',
    color: 'hsl(var(--chart-3))',
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
          Max Altitude {simulation.maxaltitude} m - Max Velocity
          {simulation.maxvelocity} m/s
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
            />
            <YAxis
              yAxisId="left"
              label={{
                value: 'Velocity (m/s)',
                angle: 90,
                position: 'left',
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: 'Altitude (m)',
                angle: 90,
                position: 'right',
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="time" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="altitude"
              type="monotone"
              stroke="var(--color-altitude)"
              strokeWidth={2}
              dot={false}
              yAxisId="right"
            />
            <Line
              dataKey="verticalVelocity"
              type="monotone"
              stroke="var(--color-verticalVelocity)"
              strokeWidth={2}
              dot={false}
              yAxisId="left"
            />
            {/* <Line
              dataKey="verticalAcceleration"
              type="monotone"
              stroke="var(--color-verticalAcceleration)"
              strokeWidth={2}
              dot={false}
            /> */}
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
