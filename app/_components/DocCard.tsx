'use client'
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

interface PdfViewerProps {
  file: PublishedDoc
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  return (
    <div>
      <Document file={file.url} className='pdf-document'>
        <Page pageNumber={1} />
      </Document>
    </div>
  )
}

export default PdfViewer
