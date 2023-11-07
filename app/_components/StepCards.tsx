import React from 'react'
import StepCard from '@/app/_components/StepCard'
import { getStepsMeta } from '@/lib/steps'

export default async function StepCards ({
  build
}: {
  build: string
}): Promise<React.JSX.Element | never[]> {
  const steps: Step[] | undefined = await getStepsMeta(build)
  if (steps == null) return []

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-md'>
      <ul
        role='list'
        className='divide-y divide-gray-200'
      >
        {steps.map((step, index) => (
          <StepCard key={index} step={step} build={build} />
        ))}
      </ul>
    </div>
  )
}
