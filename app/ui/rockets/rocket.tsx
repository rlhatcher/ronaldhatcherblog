'use client'

import { PaperClipIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { UpdateRocket, CreateRocket } from './buttons'
import Link from 'next/link'

export default function DetailView ({
  rocket
}: {
  rocket: Rocket
}): React.JSX.Element {
  return (
    <div>
      <div className='flex justify-between items-start'>
        <div className='px-4 sm:px-0'>
          <h3 className='text-base font-semibold leading-7 text-gray-900'>
            {rocket.name}
          </h3>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
            Personal details and application.
          </p>
        </div>
        <UpdateRocket id={rocket.id} />
      </div>
      <div className='mt-6 border-t border-gray-100'>
        <dl className='divide-y divide-gray-100'>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              ID
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {rocket.id}
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Full name
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {rocket.name}
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Description
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {rocket.name}
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Designs <CreateRocket />
            </dt>
            <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <ul
                role='list'
                className='divide-y divide-gray-100 rounded-md border border-gray-200'
              >
                {rocket.definedBy?.map((design) => {
                  return (
                    <li
                      key={design.name}
                      className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'
                    >
                      <div className='flex w-0 flex-1 items-center'>
                        <PaperClipIcon
                          className='h-5 w-5 flex-shrink-0 text-gray-400'
                          aria-hidden='true'
                        />
                        <div className='ml-4 flex min-w-0 flex-1 gap-2'>
                          <span className='truncate font-medium'>
                            {design.filename}
                          </span>
                          <span className='flex-shrink-0 text-gray-400'>
                            2.4mb
                          </span>
                        </div>
                      </div>
                      <div className='ml-4 flex-shrink-0'>
                        <Link href={`/dashboard/designs/${design.name}`}>
                          <ChevronRightIcon
                            className='h-5 w-5 flex-shrink-0 text-gray-400'
                            aria-hidden='true'
                          />
                        </Link>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Based On
            </dt>
            <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <ul
                role='list'
                className='divide-y divide-gray-100 rounded-md border border-gray-200'
              >
                {rocket.basedOn?.map((rocket) => {
                  return (
                    <li
                      key={rocket.name}
                      className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'
                    >
                      <div className='flex w-0 flex-1 items-center'>
                        {rocket.id}
                        <div className='ml-4 flex min-w-0 flex-1 gap-2'>
                          <span className='truncate font-medium'>
                            {rocket.name}
                          </span>
                          <span className='flex-shrink-0 text-gray-400'>
                            {rocket.manufacturer}
                          </span>
                        </div>
                      </div>
                      <div className='ml-4 flex-shrink-0'>
                        <Link href={`/dashboard/designs/${rocket.name}`}>
                          <ChevronRightIcon
                            className='h-5 w-5 flex-shrink-0 text-gray-400'
                            aria-hidden='true'
                          />
                        </Link>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
