'use client'
import React, { useState } from 'react'
import KitList from './KitList' // Replace with the actual path to KitList component
import MotorList from './MotorList' // Replace with the actual path to MotorList component

interface MfgCardProps {
  manufacturer: Manufacturer
}

const MfgCard: React.FC<MfgCardProps> = ({ manufacturer }) => {
  const [selectedTab, setSelectedTab] = useState<string>('Kits')

  const tabs = [
    { name: 'Kits', enabled: manufacturer.kits != null && manufacturer.kits.length > 0 },
    { name: 'Motors', enabled: manufacturer.motors != null && manufacturer.motors.length > 0 }
  ]

  return (
    <div className="m-4 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{manufacturer.name}</h2>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            tab.enabled && (
              <button
                key={tab.name}
                onClick={() => { setSelectedTab(tab.name) }}
                className={`whitespace-nowrap py-4 px-1 text-sm font-medium ${selectedTab === tab.name ? 'border-indigo-500 text-indigo-600 border-b-2' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
              >
                {tab.name}
              </button>
            )
          ))}
        </nav>
      </div>

      {/* Conditional rendering based on selected tab */}
      <div className={selectedTab === 'Kits' ? '' : 'hidden'}>
        {manufacturer.kits != null && <KitList kits={manufacturer.kits} />}
      </div>
      <div className={selectedTab === 'Motors' ? '' : 'hidden'}>
        {manufacturer.motors != null && <MotorList motors={manufacturer.motors} />}
      </div>
    </div>
  )
}

export default MfgCard
