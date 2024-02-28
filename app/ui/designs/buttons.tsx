import { ChevronRightIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

export function DesignNav ({ design }: { design: Design }): JSX.Element {
  return (
    <li
      key={design.name}
      className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'
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
        <Link href={`/dashboard/design/${design.name}`}>
          <ChevronRightIcon
            className='h-5 w-5 flex-shrink-0 text-gray-400'
            aria-hidden='true'
          />
        </Link>
      </div>
    </li>
  )
}
