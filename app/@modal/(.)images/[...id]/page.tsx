import React from 'react'

import { BlogImage } from '@/components/cloud-image'
import { Modal } from '@/components/modal'

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
    <div className="w-full">
      <Modal>
        <BlogImage
          src={publicId}
          width="800"
          height="600"
          alt="TBD"
          className="mx-auto w-full"
        />
      </Modal>
    </div>
  )
}
