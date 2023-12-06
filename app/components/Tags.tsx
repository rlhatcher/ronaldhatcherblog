'use client'

import React from 'react'
import { TagCloud } from 'react-tagcloud'

export default function Tags ({
  tags
}: {
  tags: TagObject[]
}): React.JSX.Element {
  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={tags}
      onClick={(tag: TagObject) => {
        alert(`'${tag.value}' was selected!`)
      }}
    />
  )
}
