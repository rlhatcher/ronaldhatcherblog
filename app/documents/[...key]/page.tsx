import { getFileString } from '@/lib/documents'
import DocCard from '@/app/_components/DocCard'

interface Props {
  params: {
    key: string
  }
}

export default async function PdfPage ({
  params: { key }
}: Props): Promise<React.JSX.Element | never[]> {
  const pdfString = await getFileString(key)

  return (
    <div className='h-screen w-screen mx-auto px-5 bg-blue-100 rounded-2xl py-4 sm:pt-4' >
      <DocCard fileData={pdfString} />
    </div>
  )
}
