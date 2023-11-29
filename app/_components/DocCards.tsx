import React from 'react'
import Link from 'next/link'
import { getBucketFiles } from '@/lib/documents'

export default async function DocCards ({
  limit
}: {
  limit?: number
}): Promise<React.JSX.Element | never[]> {
  const files = await getBucketFiles()
  if (files == null) return []

  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {files.map((file) => {
        return (
          <Link href={`/documents/${file.objectKey}`} key={file.objectKey}>
            {file.objectKey}
          </Link>
        )
      })}
    </div>
  )
}
