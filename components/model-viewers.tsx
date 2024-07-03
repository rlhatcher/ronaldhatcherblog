'use client'

import React from 'react'
import { StlViewer } from 'react-stl-viewer'

interface RocketStlProps {
  style: React.CSSProperties
  fileUrl: string
  orbitControls: boolean
  shadows: boolean
}

const RocketStl = ({
  style,
  orbitControls,
  shadows,
  fileUrl,
}: RocketStlProps): JSX.Element => {
  return (
    <StlViewer
      style={style}
      orbitControls
      shadows
      url={fileUrl}
    />
  )
}

export default RocketStl
