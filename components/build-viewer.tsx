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
        <h2 className="m-0 p-2 text-center text-3xl font-semibold">
          {steps[current].meta.title}
        </h2>
        <p className="m-0 p-2 text-center">{steps[current].meta.description}</p>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
          }}
          className="mx-auto w-full max-w-xl bg-accent"
        >
          <CarouselContent>
            {steps.map((step, index) => (
              <CarouselItem
                key={step.meta.slug}
                className="lg:1/13 md:basis-1/7 cursor-pointer sm:basis-1/5"
                onClick={() => {
                  handleCardClick(index)
                }}
              >
                <div className="p-1">
                  <Card className="relative aspect-square">
                    <CardContent className="relative z-10 flex flex-col items-center justify-center p-1">
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
                    </CardContent>
                  </Card>
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

export default BuildViewer
