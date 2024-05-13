import React from 'react'

import StepList from './StepList'

import { getStepsMeta } from '@/lib/github/steps'

export default async function StepCards({
  build,
}: {
  build: string
}): Promise<React.JSX.Element | never[]> {
  const steps: Step[] | undefined = await getStepsMeta(build)
  if (steps == null) return []

  return (
    <StepList
      steps={steps}
      build={build}
    />
  )
}
