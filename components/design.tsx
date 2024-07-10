'use client'

import React from 'react'

import { VmotionVsTime } from './sim-chart'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DesignView({
  design,
}: {
  design: Design
}): React.JSX.Element {
  const configurations: Configuration[] = design.supports ?? []

  return (
    <Tabs
      defaultValue={configurations[0]?.name ?? ''}
      className="mx-auto flex h-full flex-col"
    >
      <h3 className="text-2xl font-semibold">Simulatuions</h3>
      <TabsList className="flex h-auto w-full flex-wrap justify-start">
        {configurations?.map(config => (
          <TabsTrigger
            key={config.name}
            value={config.name}
          >
            {config.usesMotor?.[0]?.commonName}
          </TabsTrigger>
        ))}
      </TabsList>
      {configurations?.map(config => (
        <TabsContent
          key={config.name}
          value={config.name}
        >
          <VmotionVsTime rocketConfig={config} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
