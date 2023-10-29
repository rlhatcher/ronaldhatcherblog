'use client'

import React from 'react'
import { CldImage } from 'next-cloudinary'

export default function GalleryItem ({
  publicid
}: {
  publicid: string
}): React.JSX.Element {
  return (
    <div
      key={publicid}
      className='group relative border-b border-r border-gray-200'
    >
      <div className='overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75'>
        <CldImage
          width='960'
          height='600'
          src={publicid}
          sizes='100vw'
          alt='Description of my image'
        />
      </div>
    </div>
  )
}
