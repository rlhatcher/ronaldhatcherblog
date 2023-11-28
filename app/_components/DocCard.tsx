'use client'
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

interface PdfViewerProps {
  fileData: string
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileData }) => {
  return (
    <div>
      <Document file={fileData} className='pdf-document'>
        <Page pageNumber={5} />
      </Document>
    </div>
  )
}

export default PdfViewer
