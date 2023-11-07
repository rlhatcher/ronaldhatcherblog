import React from 'react'

export default function Tag ({ label }: { label: string }): React.JSX.Element {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-900/100">
      {label}
    </span>
  )
}
