import { BellIcon, RocketIcon, ChatBubbleIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { CloudImage } from './cloud-image'
import { EntryArtwork } from './entry-artwork'

// import { badgeVariants } from '@/components/ui/badge'

export function UpdatesFeed({ updates }: { updates: Update[] }): JSX.Element {
  return (
    <div className="flow-root">
      <ul
        role="list"
        className="-mb-8"
      >
        {updates.map((update, index) => (
          <li key={update.meta.slug}>
            <div className="relative pb-8">
              {index !== updates.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-border"
                />
              ) : null}
              <Link
                className=""
                href={`/updates/${update.meta.slug}`}
              >
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <CloudImage
                      src={update.meta.image ?? 'logo'}
                      alt={update.meta.title ?? 'Update'}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-border ring-4 ring-ring"
                      width={100}
                      height={100}
                    />
                    <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-secondary px-0.5 py-px">
                      {update.meta.feedType === 'notification' ? (
                        <BellIcon
                          aria-hidden="true"
                          className="h-4 w-4 text-secondary-foreground"
                        />
                      ) : update.meta.feedType === 'retro' ? (
                        <ChatBubbleIcon
                          aria-hidden="true"
                          className="h-4 w-4 text-secondary-foreground"
                        />
                      ) : update.meta.feedType === 'launch' ? (
                        <RocketIcon
                          aria-hidden="true"
                          className="h-4 w-4 text-secondary-foreground"
                        />
                      ) : null}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="font-mono font-semibold">
                        {update.meta.title}
                      </div>
                      <p className="mt-0.5 text-sm">
                        {update.meta.date?.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>{update.meta.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function UpdatesSection({
  updates,
}: {
  updates: Update[]
}): JSX.Element {
  return (
    <>
      {updates.map(update => (
        <article
          key={update.meta.slug}
          className="flex flex-col items-center p-4"
        >
          <Link
            href={`/updates/${update.meta.slug}`}
            key={update.meta.slug}
            className="flex w-full max-w-[500px] flex-col items-center"
          >
            <EntryArtwork
              key={update.meta.slug}
              meta={update.meta}
              className="h-full"
              aspectRatio="square"
              width={500}
              height={500}
            />
            <div className="w-full max-w-xs">
              <h3 className="mt-3 text-center font-medium leading-none">
                {update.meta.title}
              </h3>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                {update.meta.description}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </>
  )
}
