'use client'

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

interface BuildViewerProps {
  build: Build
  steps: Step[]
}

const BuildViewer = ({ build, steps }: BuildViewerProps): React.JSX.Element => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (api == null) {
      return
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleCardClick = (index: number): void => {
    if (api != null) {
      setCurrent(index)
    }
  }

  return (
    <article>
      <div className="bg-muted">
        <div>
          <h2 className="m-0 p-2 text-center text-3xl font-semibold">
            {steps[current].meta.title}
          </h2>
          <p className="m-0 p-2 text-center">
            {steps[current].meta.description}
          </p>
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
          }}
          className="mx-auto w-full max-w-xl bg-accent"
        >
          <CarouselContent className="-ml-2">
            {steps.map((step, index) => (
              <CarouselItem
                key={step.meta.slug}
                className="lg:1/13 md:basis-1/7 cursor-pointer pl-1 sm:basis-1/5"
                onClick={() => {
                  handleCardClick(index)
                }}
              >
                <div className="p-1">
                  <BuildThumbCard
                    src={step.meta.image}
                    alt={step.meta.title}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="m:p-10 prose relative top-0 mx-auto p-5 dark:prose-invert prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
        {steps[current].content}
      </div>
    </article>
  )
}

const BuildThumbCard = ({
  src,
  alt,
}: {
  src: string
  alt: string
}): React.JSX.Element => {
  return (
    <Card className="relative aspect-square">
      <CardContent className="relative z-10 flex aspect-square flex-col items-center justify-center p-0">
        <CloudImage
          src={src}
          alt={alt}
          width={'748'}
          height={'748'}
          crop={'fill'}
          className={'m-0'}
        />
        <span className="text-md font-semibold">{alt}</span>
      </CardContent>
    </Card>
  )
}

export default BuildViewer
