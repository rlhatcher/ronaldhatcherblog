'use client'
import React, { useState } from 'react'
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
import { mergeDesign } from '@/lib/neo4j'
import { UploadDropzone } from '@/lib/uploadthing'
import { type Configuration, type Design } from '@/schemas/Design'

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
  const [statusMessage, setStatusMessage] = useState<string>('')

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
        const fileUrl: string = res[0].url
        const fileName: string = res[0].name

        setStatusMessage(`Scanning ${fileName} file`)
        const design = await orkUpload(fileUrl)

        setStatusMessage(`Storing ${design.name} design`)
        await mergeDesign(design)

        setStatusMessage('Upload and processing complete.')
      } catch (error) {
        console.error('Error during processing:', error)
      }
    }
  }

  const handleUploadProgress = (progress: number): void => {
    setStatusMessage(`Uploading... ${progress}%`)
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
          onUploadProgress={handleUploadProgress}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`)
            setStatusMessage('Error during upload')
          }}
        />
        {statusMessage !== '' && <p>{statusMessage}</p>}
      </CardContent>
    </Card>
  )
}
