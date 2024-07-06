'use client'
import Link from 'next/link'
import * as React from 'react'

import { BlogImage, CloudImage } from './cloud-image'
import { Card, CardContent } from './ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

interface StepCardsProps {
  build: string
  steps: Step[]
  selectedStep: number | null
  onStepSelect: (index: number) => void
  onCountChange: (count: number) => void
}

const StepCards = ({
  build,
  steps,
  selectedStep,
  onStepSelect,
  onCountChange,
}: StepCardsProps): React.JSX.Element => {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (api == null) {
      return
    }

    const count = api.scrollSnapList().length
    onCountChange(count)

    api.on('select', () => {
      const selected = api.selectedScrollSnap()
      onStepSelect(selected)
    })
  }, [api, onStepSelect, onCountChange])

  if (steps == null) return <></>

  return (
    <>
      <BlogImage
        src={steps[0].meta.image}
        alt={steps[0].meta.description}
        width={'748'}
        height={'748'}
        crop={'fill'}
        className={'m-0'}
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
        }}
        className="mx-auto w-full max-w-xl bg-accent"
      >
        <CarouselContent>
          {steps.map(step => (
            <CarouselItem
              key={step.meta.slug}
              className="lg:1/13 md:basis-1/7 sm:basis-1/5"
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
    </>
  )
}

export default StepCards
