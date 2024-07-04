'use client'

import React, { useEffect, useState } from 'react'

interface RocketStlProps {
  style: React.CSSProperties
  modelId: string
  orbitControls: boolean
  rotation: boolean
}

export const RocketStl = ({
  style,
  orbitControls,
  rotation,
  modelId,
}: RocketStlProps): JSX.Element => {
  const [viewerLoaded, setViewerLoaded] = useState(false)

  useEffect(() => {
    if (!viewerLoaded) return

    const initD8sApi = (): void => {
      initDimensions({
        account: 'unknownpro',
        viewers: ['3D'],
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
              theme: 'light',
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
  }, [orbitControls, rotation, viewerLoaded])

  return (
    <div>
      <button
        onClick={() => {
          setViewerLoaded(true)
        }}
      >
        View 3D
      </button>
      {viewerLoaded && (
        <div
          id="three-d-viewer"
          className="d8s-container"
          data-d8s-type="3d"
          data-d8s-id={modelId}
          style={style}
        ></div>
      )}
    </div>
  )
}
