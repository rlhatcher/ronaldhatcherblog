import Link from 'next/link'
import React from 'react'

interface MotorListProps {
  motors: Motor[]
}

const MotorList: React.FC<MotorListProps> = ({ motors }) => {
  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {motors.map((motor) => {
        return (
          <Link
            href={`/refdata/motors/${motor.motorId}`}
            key={motor.motorId}
            className='bg-slate-200 border-l-8 border-slate-400 shadow-sm font-mono rounded-md p-2'
          >
            <div className='flex justify-between'>
              <span>
                {motor.commonName} {motor.designation}
              </span>
              <Link href={`/refdata/manufacturers/${motor.mfgID}`} className='hove hover:underline'>
                {motor.mfgID}
              </Link>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default MotorList
