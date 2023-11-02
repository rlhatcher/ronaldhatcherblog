import React from 'react'
import FeatureItem from './FeatureItem'

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
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map((feature) => (
              <FeatureItem feature={feature} key={feature.name} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
