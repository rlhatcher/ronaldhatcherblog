'use client'

import React from 'react'

import { orkUpload } from '@/lib/actions'
import { UploadButton } from '@/lib/uploadthing'

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="orkUploader"
        onClientUploadComplete={res => {
          console.log('Files: ', res)
          orkUpload(res.orkFile)
          alert('Upload Completed')
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
    </main>
  )
}
