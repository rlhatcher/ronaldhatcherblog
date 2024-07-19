// import { SiGithub } from '@icons-pack/react-simple-icons'
import { AvatarIcon, BellIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { CloudImage } from './cloud-image'
import { EntryArtwork } from './entry-artwork'

// import { badgeVariants } from '@/components/ui/badge'

export function UpdatesFeed({ updates }: { updates: Update[] }): JSX.Element {
  return (
    <div className="[grid-area:updates]">
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
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                {/* {update.meta.type === 'retrospective' ? ( */}
                  <>
                    <div className="relative">
                      <CloudImage
                        src={update.meta.image ?? 'logo'}
                        alt={update.meta.title ?? 'Update'}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                        width={100}
                        height={100}
                      />
                      <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                        <AvatarIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a
                            href={update.meta.slug}
                            className="font-medium text-gray-900"
                          >
                            {update.meta.title}
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Commented {update.meta.date?.toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{update.meta.description}</p>
                      </div>
                    </div>
                  </>
                ) : update.meta.type === 'notification' ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <BellIcon
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-sm leading-8 text-gray-500">
                        <span className="mr-0.5">
                          <a
                            href={update.meta.project}
                            className="font-medium text-gray-900"
                          >
                            {update.meta.project}
                          </a>{' '}
                          added tags
                        </span>{' '}
                        <span className="mr-0.5">
                          {/* {activityItem.tags.map((tag) => (
                            <Fragment key={tag.name}>
                              <a
                                href={tag.href}
                                className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                              >
                                <svg
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                  className={classNames(tag.color, 'h-1.5 w-1.5')}
                                >
                                  <circle r={3} cx={3} cy={3} />
                                </svg>
                                {tag.name}
                              </a>{' '}
                            </Fragment>
                          ))} */}
                        </span>
                        <span className="whitespace-nowrap">
                          {update.meta.date?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
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
