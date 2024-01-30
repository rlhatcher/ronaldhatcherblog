import { getBucketFiles, getFileString } from '@/app/lib/aws'
import PdfViewer from '@/app/ui/PdfViewer'
import TopNav from '@/app/ui/TopNav'

interface Props {
  params: {
    objectKey: string
  }
}

export async function generateStaticParams (): Promise<
Array<{ objectKey: string }>
> {
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
    <div className='mx-auto sm:px-6 lg:px-8'>
      <TopNav
        links={[{ href: '/refdata', label: 'Data' }, { href: '/refdata/documents', label: 'Documents' }]}
        page={{ title: objectKey }}
      />
        <PdfViewer key={objectKey} pdfData={pdfData} />
    </div>
  )
}
