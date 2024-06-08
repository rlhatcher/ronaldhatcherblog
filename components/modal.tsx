'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { Dialog, DialogOverlay, DialogContent } from './ui/dialog'

export function Modal({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const router = useRouter()

  const handleOpenChange = (): void => {
    router.back()
  }

  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={handleOpenChange}
    >
      <DialogOverlay className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <DialogContent className="w-full max-w-full bg-white p-2 sm:p-4 lg:p-6">
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
