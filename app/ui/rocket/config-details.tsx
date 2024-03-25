// ConfigurationDetails.tsx
import React from 'react'
import MotorList from '../motors/MotorList'
import SimList from './sim-list'

interface ConfigurationDetailsProps {
  selectedConfigId: string
  configurations: Configuration[] | undefined
}

const ConfigurationDetails: React.FC<ConfigurationDetailsProps> = ({
  selectedConfigId,
  configurations
}) => {
  const selectedConfig = configurations?.find(
    (config) => config.id === selectedConfigId
  )

  return (
    <div>
      {selectedConfig != null
        ? (
        <div className='mt-6 border-b border-gray-100'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Motors
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                <MotorList motors={selectedConfig.usesMotor} />
              </dd>
            </div>
          </dl>
          <SimList
            listItems={selectedConfig.validatedBy}
            label='Simulations'
            // rocketId={selectedConfig.appliesTo}
            designId={selectedConfig.appliesTo.id}
            configId={selectedConfig.id}
          />
        </div>
          )
        : (
        <p>Select a configuration to see its details.</p>
          )}
    </div>
  )
}

export default ConfigurationDetails
