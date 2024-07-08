import React from 'react'

import { VmotionVsTime } from './sim-chart'
import SimTable from './sim-table'

interface ConfigurationDetailsProps {
  selectedConfigId: string
  configurations: Configuration[]
}

const ConfigurationDetails: React.FC<ConfigurationDetailsProps> = ({
  selectedConfigId,
  configurations,
}) => {
  const selectedConfig = configurations?.find(
    config => config.id === selectedConfigId
  )

  return (
    <div>
      {selectedConfig != null ? (
        <>
          <div className="mt-6">
            {selectedConfig.validatedBy != null && (
              <>
                <SimTable
                  sim={selectedConfig.validatedBy[0]}
                  excludedKeys={['id', 'validates', 'simulationData']}
                />
                <VmotionVsTime
                  altitude={
                    selectedConfig.validatedBy[0].simulationData?.Altitude ?? []
                  }
                  verticalAcceleration={
                    selectedConfig.validatedBy[0].simulationData
                      ?.VerticalAcceleration ?? []
                  }
                  verticalVelocity={
                    selectedConfig.validatedBy[0].simulationData
                      ?.VerticalVelocity ?? []
                  }
                  time={
                    selectedConfig.validatedBy[0].simulationData?.Time ?? []
                  }
                />
              </>
            )}
          </div>
        </>
      ) : (
        <p>Select a configuration to see its details.</p>
      )}
    </div>
  )
}

export default ConfigurationDetails
