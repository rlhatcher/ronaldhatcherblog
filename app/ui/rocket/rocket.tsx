import { UpdateRocket } from './buttons'
import CloudImage from '@/app/ui/cloud-image'
import RocketList from './rocket-list'
import DesignList from './design-list'

export default function DetailView ({
  rocket
}: {
  rocket: Rocket
}): React.JSX.Element {
  return (
    <div>
      {/* Top section with flex layout for side-by-side alignment at larger screens */}
      <div className='flex flex-col lg:flex-row'>
        {/* Left side content */}
        <div className='flex-grow'>
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
            <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                ID
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {rocket.id}
              </dd>
            </div>
            <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Full name
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {rocket.name}
              </dd>
            </div>
            <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Description
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {rocket.description}
              </dd>
            </div>
          </dl>
        </div>
        </div>
        {/* Right side CloudImage */}
        <div className='flex-none w-full lg:w-auto lg:max-w-xs px-4 mt-6 lg:mt-0 lg:ml-6'>
          <CloudImage
            src={rocket.image ?? 'logo'}
            alt='Rocket Image'
            height='600'
            width='600'
            crop='thumb'
          />
        </div>
      </div>

      {/* Full-width design sections below the top content */}
      <div className='mt-6 w-full'>
        <dl className='divide-y divide-gray-100'>
          <DesignList rocketId={rocket.id} listItems={rocket.definedBy} label='Designs' />
          <RocketList listItems={rocket.basedOn} label='Based On' />
          <RocketList listItems={rocket.inspired} label='Inspired' />
        </dl>
      </div>
    </div>
  )
}
