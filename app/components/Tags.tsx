'use client'

import React from 'react'
import { type ColorOptions, TagCloud } from 'react-tagcloud'
import { useRouter } from 'next/navigation'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export default function Tags ({
  tags
}: {
  tags: TagObject[]
}): React.JSX.Element {
  const router: AppRouterInstance = useRouter()
  const options: ColorOptions = {
    luminosity: 'dark',
    hue: 'monochrome'
  }

  return (
    <div className='mx-auto bg-gray-300  w-1/2 rounded-xl p-2'>
    <TagCloud
      minSize={20}
      maxSize={50}
      tags={tags}
      colorOptions={options}
      onClick={(tag: TagObject) => {
        router.push(`/tags/${tag.value}`)
      }}
      className='cursor-pointer font-mono'
    />
    </div>
  )
}
