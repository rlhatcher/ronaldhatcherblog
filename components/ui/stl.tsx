'use client'

import React from 'react'
import { StlViewer } from 'react-stl-viewer'

interface ModelViewerProps {
  url: string
  style: React.CSSProperties
}

export function ModelViewer({ url, style }: ModelViewerProps): JSX.Element {
  return (
    <StlViewer
      style={style}
      orbitControls
      shadows
      url={url}
    />
  )
}
