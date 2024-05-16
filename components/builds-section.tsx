import Link from 'next/link'
import React from 'react'

import { EntryArtwork } from '@/components/entry-artwork'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function BuildsSection({
  builds,
}: {
  builds: Build[]
}): JSX.Element {
  return (
    <div className="bg-accent mb-2 p-2 rounded-md">
      <div className="font-mono space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          <Link href="/builds">Builds</Link>
        </h2>
        <p className=" text-sm font-semibold text-muted-foreground">
          Detailed walkthroughs of rocket fabrication processes
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {builds.map(build => (
              <Link
                href={`/builds/${build.meta.slug}`}
                key={build.meta.slug}
              >
                <EntryArtwork
                  key={build.meta.slug}
                  meta={build.meta}
                  className="w-[250px]"
                  aspectRatio="square"
                  width={500}
                  height={500}
                />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
