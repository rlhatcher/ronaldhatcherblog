import React from 'react'

export default function Tag ({ label }: { label: string }): React.JSX.Element {
  return (
    <div className='text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-200 text-gray-700 rounded-full'>
      {label}
    </div>
  )
}
