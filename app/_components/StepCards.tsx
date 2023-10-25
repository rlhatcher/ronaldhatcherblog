import React from 'react'
import StepCard from './StepCard'
import { getStepsMeta } from '@/lib/steps'

export default async function StepCards ({
  build
}: {
  build: string
}): Promise<React.JSX.Element | never[]> {
  const steps = await getStepsMeta(build)
  if (steps == null) return []

  return (
    <div className='mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
      {steps.map((step) => (
        <StepCard step={step} key={step.meta.slug} />
      ))}
    </div>
  )
}
