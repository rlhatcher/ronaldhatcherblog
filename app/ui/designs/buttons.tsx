import { ChevronRightIcon, PlusIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { Button } from '../button'

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

export function UploadDesign (): JSX.Element {
  return (
    <Button href='/dashboard/designs/upload'>
      <PlusIcon />
      <span className='hidden md:block'>Upload .ork</span>{' '}
    </Button>
  )
}
