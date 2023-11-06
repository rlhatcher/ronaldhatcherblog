import React from 'react'
import FeatureItem from './FeatureItem'

export default function FeatureSection ({
  features
}: {
  features: Feature[]
}): React.JSX.Element {
  return (
    <div className='overflow-hidden bg-gray-100 shadow sm:rounded-lg'>
      <div className='px-4 py-5 sm:p-6'>
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
