import React from 'react'
import Link from 'next/link'
import TypeIcon from './TypeIcon'

export default function FeatureSection (): React.JSX.Element {
  return (
    <section className='overflow-hidden bg-gray-100 shadow sm:rounded-lg mb-2 p-2'>
      <div className='px-4 sm:p-6'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3'>
            <Link
              key='projects'
              href='/projects'
              className='hover:underline'
              passHref
            >
              <div className='flex flex-col cursor-pointer'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <TypeIcon type='projects' />
                  <h2 className='flex-auto text-lg font-semibold leading-7 text-gray-900'>
                    Rockets & Robots
                  </h2>
                </dt>
                <dd className='relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <span className='absolute inset-0' />
                  Mostly rocketry and robotics. From the initial concept to the
                  final implementation, addressing the inspiration, design
                  thinking, research, coding, and engineering principles.
                </dd>
              </div>
            </Link>
            <Link
              key='builds'
              href='/builds'
              className='hover:underline'
              passHref
            >
              <div className='flex flex-col cursor-pointer'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <TypeIcon type='builds' />
                  <h2 className='flex-auto text-lg font-semibold leading-7 text-gray-900'>
                    Technology
                  </h2>
                </dt>
                <dd className='relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <span className='absolute inset-0' />
                  The tangible aspects of rocketry and robotics, this section
                  provides a detailed look into the assembly and testing
                  processes. All of my hands-on work lives here.
                </dd>
              </div>
            </Link>
            <Link key='documents' href='/data' className='hover:underline'>
              <div className='flex flex-col cursor-pointer'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <TypeIcon type='documents' />
                  <h2 className='flex-auto text-lg font-semibold leading-7 text-gray-900'>
                    Documents & Data
                  </h2>
                </dt>
                <dd className='relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <span className='absolute inset-0' />
                  Supplementary resources like documents, references, datasets
                  and code repositories are all here.
                </dd>
              </div>
            </Link>
          </dl>
        </div>
      </div>
    </section>
  )
}
