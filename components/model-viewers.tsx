'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

import { BlogImage } from './cloud-image'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

interface Rocket3DViewerProps {
  style: React.CSSProperties
  modelId: string
  modelImage: string
  orbitControls: boolean
  rotation: boolean
}

export const Rocket3DViewer = ({
  style,
  modelId,
  modelImage,
  orbitControls,
  rotation,
}: Rocket3DViewerProps): JSX.Element => {
  const [viewerLoaded, setViewerLoaded] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    if (!viewerLoaded) return

    const initD8sApi = (): void => {
      initDimensions({
        account: 'unknownpro',
        viewers: ['IMAGE', '3D'],
        threeDViewer: {
          viewer: {
            autoShow: true,
            showLoadingProgress: true,
            controls: {
              enabled: orbitControls,
              position: 'flex-start',
              zoom: true,
              mouseZoom: true,
              rotate: true,
              pan: true,
            },
            rotation: {
              enabled: rotation,
              speed: 2,
              offOnInteraction: true,
            },

            ar: {
              enabled: false,
            },

            styles: {
              theme: theme ?? 'light',
            },
          },
        },
      })
      console.log('D8s API initialized')
    }

    const script1 = document.createElement('script')
    script1.src = 'https://dimensions-tag.cloudinary.com/latest/all.js'
    script1.onload = () => {
      const script2 = document.createElement('script')
      script2.src = 'https://dimensions-3d-viewer.cloudinary.com/latest/all.js'
      script2.onload = initD8sApi
      document.body.appendChild(script2)
    }
    document.body.appendChild(script1)

    return () => {
      document.body.removeChild(script1)
    }
  }, [orbitControls, rotation, theme, viewerLoaded])

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Switch
          id="3d-viewer-switch"
          checked={viewerLoaded}
          onCheckedChange={(checked: boolean) => {
            setViewerLoaded(checked)
          }}
        />
        <Label htmlFor="3d-viewer-switch">3D Viewer</Label>
      </div>
      {viewerLoaded ? (
        <div
          id="three-d-viewer"
          className="d8s-container"
          data-d8s-type="3d"
          data-d8s-id={modelId}
          style={style}
        ></div>
      ) : (
        <BlogImage
          src={modelImage}
          alt="3D Model"
          crop="fit"
        />
      )}
    </div>
  )
}
