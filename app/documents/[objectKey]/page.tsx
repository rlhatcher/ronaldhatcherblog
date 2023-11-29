import { getBucketFiles, getFileString } from '@/lib/documents'
import PdfViewer from '@/app/_components/PdfViewer'

interface Props {
  params: {
    objectKey: string
  }
}

export async function generateStaticParams (): Promise<Array<{ objectKey: string }>> {
  const files = await getBucketFiles()

  if (files != null) {
    return files.map((pdf) => ({ objectKey: pdf.objectKey }))
  } else {
    return []
  }
}

export default async function PdfPage ({
  params: { objectKey }
}: Props): Promise<React.JSX.Element | never[]> {
  const pdfData: string = await getFileString(objectKey)

  return (
    <div className='h-screen w-screen mx-auto px-5 bg-blue-100 rounded-2xl py-4 sm:pt-4'>
      <PdfViewer key={objectKey} pdfData={pdfData} />
    </div>
  )
}
