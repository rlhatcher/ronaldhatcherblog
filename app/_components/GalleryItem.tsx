'use client'

import React from 'react'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'

export default function GalleryItem ({
  publicid
}: {
  publicid: string
}): React.JSX.Element {
  return (
    <Link
      href={`/builds/${publicid}`}
      className='group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80'
    >
      <CldImage
        width='600'
        height='600'
        sizes='(max-width: 480px) 100vw, 50vw'
        crop='thumb'
        src={publicid}
        alt='Description of my image'
        gravity='faces:auto'
        className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
      />
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50'></div>
      <span className='relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg'>
        VR
      </span>
    </Link>
  )
}
