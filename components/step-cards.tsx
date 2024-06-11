import Link from 'next/link'
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
  build,
  steps,
}: {
  build: string
  steps: Step[]
}): Promise<React.JSX.Element | never[]> {
  if (steps == null) return []

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="mx-auto w-full max-w-sm bg-accent"
    >
      <CarouselContent>
        {steps.map(step => (
          <CarouselItem
            key={step.meta.slug}
            className="lg:1/6 sm:basis-1/2 md:basis-1/3"
          >
            <div className="p-1">
              <Card className="relative aspect-square">
                <CardContent className="relative z-10 flex flex-col items-center justify-center p-1">
                  <Link href={`/builds/${build}/${step.meta.slug}`}>
                    <CloudImage
                      src={step.meta.image}
                      alt={step.meta.description}
                      width={'748'}
                      height={'748'}
                      crop={'fill'}
                      className={'m-0'}
                    />
                    <span className="text-md font-semibold">
                      {step.meta.title}
                    </span>
                  </Link>
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
