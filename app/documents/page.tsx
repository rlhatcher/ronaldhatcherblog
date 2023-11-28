import React from 'react'
import DocCard from '@/app/_components/DocCard'
import TopNav from '@/app/_components/TopNav'
import { getBucketFiles, getFileString } from '@/lib/documents'

export default async function DocumentPage (): Promise<React.JSX.Element | never[]> {
  const links: BreadCrumb[] = []
  const files = await getBucketFiles()
  if (files == null) return []
  const pdfString = await getFileString(files[0]?.key)
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Documents' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <DocCard fileData={pdfString} />
        </section>
      </div>
    </div>
  )
}
