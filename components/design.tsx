'use client'

import React from 'react'
import { type ClientUploadedFileData } from 'uploadthing/types'

import { VmotionVsTime } from './sim-chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { orkUpload } from '@/lib/actions'
import { UploadDropzone } from '@/lib/uploadthing'

export const DesignView = ({
  design,
}: {
  design: Design
}): React.JSX.Element => {
  const configurations: Configuration[] = design.supports ?? []

  return (
    <Tabs
      defaultValue={configurations[0]?.name ?? ''}
      className="mx-auto flex h-full flex-col"
    >
      <h3 className="text-2xl font-semibold">Simulatuions</h3>
      <TabsList className="flex h-auto w-full flex-wrap justify-start">
        {configurations?.map(config => (
          <TabsTrigger
            key={config.name}
            value={config.name}
          >
            {config.usesMotor?.[0]?.commonName}
          </TabsTrigger>
        ))}
      </TabsList>
      {configurations?.map(config => (
        <TabsContent
          key={config.name}
          value={config.name}
        >
          <VmotionVsTime rocketConfig={config} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export const DesignUpload = (): JSX.Element => {
  const handleUploadComplete = async (
    res: Array<
      ClientUploadedFileData<{
        orkFile: string
      }>
    >
  ): Promise<void> => {
    console.log('Files: ', res)
    if (res != null && res.length > 0) {
      try {
        const uploadedFileUrl: string = res[0].url
        await orkUpload(uploadedFileUrl)
      } catch (error) {
        console.error('Error during processing:', error)
      }
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>ORK Uploader</CardTitle>
        <CardDescription>Upload Openrocket Design</CardDescription>
      </CardHeader>
      <CardContent>
        <UploadDropzone
          endpoint="orkUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`)
          }}
        />
      </CardContent>
    </Card>
  )
}
