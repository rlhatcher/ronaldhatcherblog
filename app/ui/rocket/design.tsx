'use client'

import React, { useState, useEffect } from 'react'
import ConfigSelector from './config-selector'
import ConfigurationDetails from './config-details'

export default function DesignView ({
  design
}: {
  design: Design
}): React.JSX.Element {
  const [selectedConfigId, setSelectedConfigId] = useState<string | undefined>(
    undefined
  )
  // Automatically select the first configuration as default when the component mounts or design changes
  useEffect(() => {
    if ((design.supports != null) && design.supports.length > 0 && (selectedConfigId == null)) {
      setSelectedConfigId(design.supports[0].id)
    }
  }, [design, selectedConfigId])

  return (
    <div>
      <div className='mt-6 border-t border-gray-100'>
        <dl className='divide-y divide-gray-100'>
          <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>ID</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {design.id}
            </dd>
          </div>
          <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Weights and Measures
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              weight {design.massEmpty} g length {design.totalLength} m diameter{' '}
              {design.maxDiameter} m
            </dd>
          </div>
          <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Stability
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {design.stabilityCal} cal
              {design.stabilityPct} %{design.cg} mm (cg)
              {design.cp} mm (cp)
            </dd>
          </div>
        </dl>
      </div>
      <div className='border-t border-gray-100'>
        <ConfigSelector
          configurations={design.supports}
          onSelect={(id) => {
            setSelectedConfigId(id)
          }}
        />
        {(selectedConfigId != null) && (
          <ConfigurationDetails
            selectedConfigId={selectedConfigId}
            configurations={design.supports ?? []}
          />
        )}
      </div>
    </div>
  )
}
