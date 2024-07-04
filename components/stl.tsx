import React from 'react'

import { RocketStl } from './model-viewers'

import { getFileByPath } from '@/lib/github/rocket-files'

interface ModelViewerProps {
  style: React.CSSProperties
  filePath: string
  orbitControls: boolean
  shadows: boolean
}

export async function ModelViewer({
  filePath,
  style,
  orbitControls,
  shadows,
}: ModelViewerProps): Promise<JSX.Element> {
  const blob = await getFileByPath(filePath)
  const objectUrl = URL.createObjectURL(blob)

  return (
    <>
      <RocketStl
        style={style}
        orbitControls
        rotation
        modelId={objectUrl}
      />
    </>
  )
}

export default ModelViewer
