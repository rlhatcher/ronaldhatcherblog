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
      <ul
        role='list'
        className='divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl'
      >
        {steps.map((step, index) => (
          <StepCard key={index} step={step} build={build} />
        ))}
      </ul>
  )
}
