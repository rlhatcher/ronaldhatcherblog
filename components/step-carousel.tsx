'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { CloudImage } from './cloud-image'
import { Card, CardContent } from './ui/card'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

import { cn } from '@/lib/utils'

interface StepCarouselProps {
  build: string
  selected: number
  steps: Step[]
}

const StepCarousel = ({
  build,
  selected,
  steps,
}: StepCarouselProps): React.JSX.Element => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(selected)

  const router = useRouter()

  React.useEffect(() => {
    if (api == null) {
      return
    }
    api.scrollTo(selected, false)
    api.on('select', () => {
      api.selectedScrollSnap()
      setCurrent(api.selectedScrollSnap())
    })
  }, [api, selected])

  const handleCardClick = (index: number): void => {
    if (api != null) {
      setCurrent(index)
      router.push(`/builds/${build}/${steps[index].meta.slug}`)
    }
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'center',
      }}
      className="mx-auto w-full max-w-xl bg-accent"
    >
      <CarouselContent className="-ml-2">
        {steps.map((step, index) => (
          <CarouselItem
            key={step.meta.slug}
            className="lg:basis-1/13 md:basis-1/7 basis-1/3 cursor-pointer pl-1 sm:basis-1/5"
            onClick={() => {
              handleCardClick(index)
            }}
          >
            <div className="p-1">
              <BuildThumbCard
                src={step.meta.image}
                alt={step.meta.title}
                isCurrent={index === current}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

const BuildThumbCard = ({
  src,
  alt,
  isCurrent,
}: {
  src: string
  alt: string
  isCurrent: boolean
}): React.JSX.Element => {
  return (
    <Card
      className={cn('relative aspect-square bg-card hover:scale-105', {
        'border-4 border-primary': isCurrent,
      })}
    >
      <CardContent className="relative z-10 flex aspect-square flex-col items-center justify-center p-0">
        <CloudImage
          src={src}
          alt={alt}
          width={'748'}
          height={'748'}
          crop={'fill'}
          className={'m-0 bg-popover'}
        />
        <span className="text-md font-semibold">{alt}</span>
      </CardContent>
    </Card>
  )
}

export default StepCarousel
