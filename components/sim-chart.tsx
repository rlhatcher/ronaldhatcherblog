'use client'
import { useMediaQuery } from '@react-hook/media-query'
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
import { type Configuration } from '@/schemas/Design'

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

interface VmotionVsTimeProps {
  rocketConfig: Configuration
}

export const VmotionVsTime = ({
  rocketConfig,
}: VmotionVsTimeProps): JSX.Element => {
  const simulation = rocketConfig.validatedBy?.[0]
  const simulationData = simulation?.simulationData
  const isSmallScreen = useMediaQuery('(max-width: 640px)')

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
          {rocketConfig.usesMotor?.[0]?.madeBy?.name} -{' '}
          {rocketConfig.usesMotor?.[0]?.diameter}mm
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
              scale="time"
              type="number"
              interval="preserveStartEnd"
              domain={[0, 'dataMax']}
              label={{
                value: 'Duration (s)',
                angle: 0,
                position: 'bottom',
              }}
              tickFormatter={value => value.toFixed(2)}
            />
            {!isSmallScreen && (
              <>
                <YAxis
                  yAxisId="left"
                  orientation="left"
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
              </>
            )}{' '}
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
            <div className="flex flex-wrap items-center gap-2 font-medium leading-none">
              <div className="flex gap-1">
                <span>Max Altitude</span>
                <span>{simulation.maxaltitude}m</span>
              </div>
              <div className="flex gap-1">
                <span>Max Velocity</span>
                <span>{simulation.maxvelocity}m/s</span>
              </div>
              <div className="flex gap-1">
                <span>Rod Velocity</span>
                <span>{simulation.launchrodvelocity}m/s</span>
              </div>
              <div className="flex gap-1">
                <span>Optimum Delay</span>
                <span>{simulation.optimumdelay}s</span>
              </div>
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground"></div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
