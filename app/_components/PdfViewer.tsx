'use client'
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

interface Props {
  pdfData: string
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

const PdfViewer: React.FC<Props> = ({ pdfData }) => {
  return (
    <div>
      <Document file={pdfData} className='pdf-document'>
        <Page pageNumber={1} />
      </Document>
    </div>
  )
}

export default PdfViewer
