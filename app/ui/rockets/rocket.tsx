import { UpdateRocket } from './buttons'
import { DesignNav } from '@/app/ui/designs/buttons'
import CloudImage from '@/app/ui/cloud-image'
import RocketList from './rocket-list'

export default function DetailView ({
  rocket
}: {
  rocket: Rocket
}): React.JSX.Element {
  return (
    <div>
      {/* Wrapper div for the top section, using flex to align side by side */}
      <div className='flex flex-wrap lg:flex-nowrap'>
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
                  {rocket.name}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right side CloudImage */}
          <div className='flex-none lg:ml-6'>
            <CloudImage src={(rocket.image ?? 'test')} alt='test' height='400' width='600' crop = 'thumb'/>
          </div>
        </div>
        <div className='mt-6'>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Designs
            </dt>
            <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <ul
                role='list'
                className='divide-y divide-gray-100 rounded-md border border-gray-200'
              >
                {rocket.definedBy?.map((design) => {
                  return <DesignNav key={design.name} design={design} />
                })}
              </ul>
            </dd>
          </div>
          <RocketList listItems={rocket.basedOn} label='Based On' />
          <RocketList listItems={rocket.inspired} label='Inspired' />
        </div>
      </div>
    </div>
  )
}
