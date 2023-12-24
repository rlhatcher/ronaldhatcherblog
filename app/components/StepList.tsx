'use client'

import React from 'react'
import Link from 'next/link'

export default function StepList ({
  steps
}: {
  steps: Step[]
}): React.JSX.Element {
  return (
    <ul role='list'>
      {steps.map((step) => {
        return (
          <Link href={`/builds/${step.meta.slug}`} key={step.meta.slug}>
            <li key={step.meta.slug}>{step.meta.title}</li>
          </Link>
        )
      })}
    </ul>
  )
}
