'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import ConfigurationDetails from './config-details'
import ConfigSelector from './config-selector'

export default function DesignView({
  design,
}: {
  design: Design
}): React.JSX.Element {
  const [selectedConfigId, setSelectedConfigId] = useState<string | undefined>(
    undefined
  )
  // Select the first configuration as default when the component mounts or design changes
  useEffect(() => {
    if (
      design.supports != null &&
      design.supports.length > 0 &&
      selectedConfigId == null
    ) {
      setSelectedConfigId(design.supports[0].id)
    }
  }, [design, selectedConfigId])

  const selectedConfig =
    design.supports?.find(config => config.id === selectedConfigId) ?? null

  return (
    <div>
      <div>
        <dl className="grid flex-1 grid-cols-2 gap-4 lg:mr-8">
          <div className="flex items-center justify-between">
            <dt className="text-sm font-semibold">Length</dt>
            <dd className="mt-0 text-sm leading-3">{design.totalLength} m</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm font-semibold">Max Diameter</dt>
            <dd className="mt-0 text-sm leading-3">{design.maxDiameter} m</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm font-semibold">Weight</dt>
            <dd className="mt-0 text-sm leading-3">{design.massEmpty} g</dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-col border-t md:flex-row">
        <div className="flex-1 px-1">
          <ConfigSelector
            configurations={design.supports}
            onSelect={(id: React.SetStateAction<string | undefined>) => {
              setSelectedConfigId(id)
            }}
          />
        </div>
        <dl className="flex-1 divide-y px-1">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Motors used</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {selectedConfig?.usesMotor?.map(motor => (
                <Link
                  href={`/dashboard/motors/${motor.motorId}`}
                  key={motor.motorId}
                  className="rounded-md border-l-8 p-2 font-mono shadow-sm"
                >
                  {motor.madeBy.id} {motor.commonName} {motor.designation}
                </Link>
              ))}
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <ConfigurationDetails
          selectedConfigId={selectedConfigId ?? ''}
          configurations={design.supports ?? []}
        />
      </div>
    </div>
  )
}
