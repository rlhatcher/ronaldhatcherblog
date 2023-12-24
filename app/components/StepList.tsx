'use client'

import React from 'react'
import Link from 'next/link'

export default function StepList ({
  steps,
  build
}: {
  steps: Step[]
  build: string
}): React.JSX.Element {
  return (
    <ul role='list'>
      {steps.map((step) => {
        return (
          <Link href={`/builds/${build}/${step.meta.slug}`} key={step.meta.slug}>
            <li key={step.meta.slug}>{step.meta.title}</li>
          </Link>
        )
      })}
    </ul>
  )
}
