import React from 'react'

import { BlogImage } from '@/components/cloud-image'

export const revalidate = 10

interface Props {
  params: {
    id: string[]
  }
}

export default async function Image({
  params: { id },
}: Props): Promise<React.JSX.Element> {
  const publicId = id.join('/')

  return (
    <div className="container mx-auto sm:px-8 lg:px-10">
      <BlogImage
        src={publicId}
        width="800"
        height="600"
        alt="TBD"
      />
    </div>
  )
}
