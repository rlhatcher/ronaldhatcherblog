import Link from 'next/link'
import React from 'react'

import { BlogImage, CloudImage } from './cloud-image'
import { Card, CardContent } from './ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

interface StepViewerProps {
  build: string
  steps: Step[]
  selectedStep: number | null
  onStepSelect: (index: number) => void
  onCountChange: (count: number) => void
}

const StepViewer = ({
  build,
  steps,
  selectedStep,
  onStepSelect,
  onCountChange,
}: StepViewerProps): React.JSX.Element => {
  return (
    <article>
      <div className="bg-muted">
        <h3 className="p-1 text-lg font-semibold leading-6">Build Steps</h3>
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
      </div>
      <div className="m:p-10 prose relative top-0 mx-auto p-5 dark:prose-invert prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
        {content}
      </div>
    </article>
  )
}

export default StepViewer
