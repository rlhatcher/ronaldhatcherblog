import React from 'react'
import FeatureList from './feature-list'
import { type Feature } from '../_types/types'

export default function FeatureSection ({
  features
}: {
  features: Feature[]
}): React.JSX.Element {
  return (
    <div className='bg-gray-100 rounded-2xl py-2 sm:pt-4'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl lg:mx-0 '>
          <h2 className='text-xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Welcome ...
          </h2>
        </div>
        <div className='mx-auto max-w-2xl sm:mt-4 mt-4 lg:max-w-none'>
          <FeatureList features={features} />
        </div>
      </div>
    </div>
  )
}
