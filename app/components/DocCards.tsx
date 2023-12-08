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
          <Link href={`/data/documents/${file.objectKey}`} key={file.objectKey} className='bg-gray-300 shadow-sm font-mono rounded-md p-2'>
            {file.objectKey
              .replace(/-/g, ' ')
              .replace(
                /\w\S*/g,
                (text) =>
                  text.charAt(0).toUpperCase() +
                  text.slice(1).toLocaleLowerCase()
              )}
          </Link>
        )
      })}
    </div>
  )
}
