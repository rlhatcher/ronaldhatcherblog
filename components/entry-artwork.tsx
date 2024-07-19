import React from 'react'

import { CloudImage } from '@/components/cloud-image'
import { cn } from '@/lib/utils'

interface EntryArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  meta: Meta
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

export function EntryArtwork({
  meta,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: EntryArtworkProps): JSX.Element {
  return (
    <div
      className={cn('space-y-3', className)}
      {...props}
    >
      <div className="overflow-hidden rounded-md">
        <CloudImage
          src={meta.image ?? 'logo'}
          alt={meta.title ?? 'Entry'}
          crop="fill"
          width={width}
          height={height}
          className={cn(
            'h-auto w-auto object-cover transition-all hover:scale-105',
            aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
          )}
        />
      </div>
    </div>
  )
}
