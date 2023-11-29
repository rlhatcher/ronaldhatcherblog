'use client'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

interface Props {
  pdfData: string
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

const PdfViewer: React.FC<Props> = ({ pdfData }) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1) // start on first page
  const [loading, setLoading] = useState(true)
  const [pageWidth, setPageWidth] = useState(0)

  function onDocumentLoadSuccess ({
    numPages: nextNumPages
  }: {
    numPages: number
  }): void {
    setNumPages(nextNumPages)
  }

  function onPageLoadSuccess (): void {
    setPageWidth(window.innerWidth)
    setLoading(false)
  }

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/'
  }

  // Go to next page
  function goToNextPage (): void {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  function goToPreviousPage (): void {
    setPageNumber((prevPageNumber) => prevPageNumber - 1)
  }

  return (
    <>
      <Nav pageNumber={pageNumber} numPages={numPages} />
      <div
        hidden={loading}
        style={{ height: 'calc(100vh - 64px)' }}
        className='flex items-center'
      >
        <div
          className={
            'flex items-center justify-between absolute z-10 px-2'
          }
        >
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className='relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-900 focus:z-20'
          >
            <span className='sr-only'>Previous</span>
            <GrLinkPrevious className='h-10 w-10' aria-hidden='true' />
          </button>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className='relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-900 focus:z-20'
          >
            <span className='sr-only'>Next</span>
            <GrLinkNext className='h-10 w-10' aria-hidden='true' />
          </button>
        </div>

        <div className='h-full flex justify-center mx-auto'>
          <Document
            file={pdfData}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            renderMode='canvas'
            className=''
          >
            <Page
              className=''
              key={pageNumber}
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={onPageLoadSuccess}
              onRenderError={() => {
                setLoading(false)
              }}
              width={Math.max(pageWidth * 0.8, 390)}
            />
          </Document>
        </div>
      </div>
    </>
  )
}

export default PdfViewer

function Nav ({
  pageNumber,
  numPages
}: {
  pageNumber: number
  numPages: number
}): JSX.Element {
  return (
    <nav className='w-fit'>
      <div className='mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'>
          <span>{pageNumber}</span>
          <span className='text-gray-400'> / {numPages}</span>
        </div>
      </div>
    </nav>
  )
}
