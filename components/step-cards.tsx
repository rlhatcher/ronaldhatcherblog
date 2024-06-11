import React from 'react'

import { CloudImage } from './cloud-image'
import { Card, CardContent } from './ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default async function StepCards({
  steps,
}: {
  steps: Step[]
}): Promise<React.JSX.Element | never[]> {
  if (steps == null) return []

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="mx-auto w-full max-w-sm"
    >
      <CarouselContent>
        {steps.map(step => (
          <CarouselItem
            key={step.meta.slug}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <Card className="relative aspect-square">
                <CloudImage
                  src={step.meta.image}
                  alt={step.meta.description}
                  width={'128'}
                  height={'128'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <CardContent className="relative z-10 flex flex-col items-center justify-center bg-white bg-opacity-75 p-6">
                  <span className="text-xl font-semibold">
                    {step.meta.title}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
