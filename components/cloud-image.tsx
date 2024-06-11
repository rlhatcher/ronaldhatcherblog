'use client'
import Link from 'next/link'
import { CldImage as NextCldImage, type CldImageProps } from 'next-cloudinary'
import React from 'react'

export const CloudImage = (props: CldImageProps): React.JSX.Element => {
  return <NextCldImage {...props} />
}

export const BlogImage = ({
  src,
  ...restProps
}: CldImageProps): React.JSX.Element => {
  return (
    <Link href={`/images/${src}`}>
      <NextCldImage
        sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
        height={400}
        width={600}
        crop="thumb"
        src={src}
        {...restProps}
      />
    </Link>
  )
}

interface BlogGalleryProps {
  images: CldImageProps[]
}

export const BlogGallery = ({
  images,
}: BlogGalleryProps): React.JSX.Element => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((imageProps, index) => (
        <div
          key={index}
          className="flex-shrink-0 flex-grow basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
        >
          <BlogImage {...imageProps} />
        </div>
      ))}
    </div>
  )
}
