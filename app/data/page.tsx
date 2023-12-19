import Link from 'next/link'
import TypeIcon from '../components/TypeIcon'
import TopNav from '../components/TopNav'

const features = [
  {
    name: 'Rocketry Manufacturers',
    description: 'A list of rocketry manufacturers.',
    icon: 'mfgs',
    link: '/data/manufacturers'
  },
  {
    name: 'Rocketry Kits',
    description: 'A list of rocketry kits from known manufacturers.',
    icon: 'kits',
    link: '/data/kits'
  },
  {
    name: 'Rocketry Motors',
    description: 'A list of rocketry motors from known manufacturers.',
    icon: 'motors',
    link: '/data/motors'
  },
  {
    name: 'Papers',
    description: 'References for research and other papers.',
    icon: 'documents',
    link: '/data/documents'
  }
]

export default function DataPage (): React.JSX.Element {
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav
        links={[]}
        page={{ title: 'Data' }}
      />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            A Growing Index of Rocketry and Robotics Resources
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Various views into the data that I have collected over the years.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
            {features.map((feature) => (
              <Link key={feature.name} href={feature.link}>
              <div key={feature.name} className='relative pl-16'>
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-300'>
                    <TypeIcon type={feature.icon} aria-hidden='true' />
                  </div>
                  {feature.name}
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  {feature.description}
                </dd>
              </div>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
