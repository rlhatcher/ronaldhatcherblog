import React from 'react'
import { getStepsMeta } from '@/lib/steps'
import StepList from './StepList'

export default async function StepCards ({
  build
}: {
  build: string
}): Promise<React.JSX.Element | never[]> {
  const steps: Step[] | undefined = await getStepsMeta(build)
  if (steps == null) return []

  return (
    <StepList steps={steps} />
  )
}
