import { ChevronRightIcon, PlusIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { Button } from '../button'

export function CreateDesign (): JSX.Element {
  return (
    <Button href='/dashboard/designs/create'>
      <PlusIcon />
      <span className='hidden md:block'>Create Design</span>{' '}
    </Button>
  )
}

export function CreateConfig (): JSX.Element {
  return (
    <Button href='/dashboard/designs/create-config'>
      <PlusIcon />
      <span className='hidden md:block'>Create Config</span>{' '}
    </Button>
  )
}

export function DesignNav ({ design }: { design: Design }): JSX.Element {
  return (
    <Link href={`/dashboard/designs/${design.id}`}>
      <li
        key={design.name}
        className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 hover:bg-zinc-950/5 dark:hover:bg-white/5'
      >
        <div className='flex w-0 flex-1 items-center'>
          {design.name}
          <div className='ml-4 flex min-w-0 flex-1 gap-2'>
            <span className='truncate font-medium'>{design.name}</span>
            <span className='flex-shrink-0 text-gray-400'>
              {design.filename}
            </span>
          </div>
        </div>
        <div className='ml-4 flex-shrink-0'>
          <ChevronRightIcon
            className='h-5 w-5 flex-shrink-0 text-gray-400'
            aria-hidden='true'
          />
        </div>
      </li>
    </Link>
  )
}

export function ConfigNav ({ config }: { config: ConfigurationDetail }): JSX.Element {
  return (
    <Link href={`/dashboard/designs/${config.configId}`}>
      <li
        key={config.configId}
        className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 hover:bg-zinc-950/5 dark:hover:bg-white/5'
      >
        <div className='flex w-0 flex-1 items-center'>
          {config.designation}-{config.manufacturer}
          <div className='ml-4 flex min-w-0 flex-1 gap-2'>
            <span className='truncate font-medium'>{config.designation}</span>
            <span className='flex-shrink-0 text-gray-400'>
              {config.manufacturer}
            </span>
          </div>
        </div>
        <div className='ml-4 flex-shrink-0'>
          <ChevronRightIcon
            className='h-5 w-5 flex-shrink-0 text-gray-400'
            aria-hidden='true'
          />
        </div>
      </li>
    </Link>
  )
}

export function UploadDesign (): JSX.Element {
  return (
    <Button href='/dashboard/designs/upload'>
      <PlusIcon />
      <span className='hidden md:block'>Upload .ork</span>{' '}
    </Button>
  )
}
