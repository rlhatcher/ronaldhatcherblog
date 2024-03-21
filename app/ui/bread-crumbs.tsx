import Link from 'next/link'
import { PiRocketLaunchThin } from 'react-icons/pi'

export default function Breadcrumbs ({
  breadcrumbs
}: {
  breadcrumbs: BreadCrumb[]
}): JSX.Element {
  const hasBreadcrumbs = breadcrumbs.length > 0
  const [firstBreadcrumb, ...restBreadcrumbs] = breadcrumbs

  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol
        role='list'
        className='flex space-x-4 rounded-md bg-white px-6 shadow'
      >
        {hasBreadcrumbs && (
          <li className='flex'>
            <div className='flex items-center'>
              <Link
                href={firstBreadcrumb.href}
                className='text-gray-400 hover:text-gray-500 flex items-center'
              >
                <PiRocketLaunchThin
                  className='h-5 w-5 flex-shrink-0'
                  aria-hidden='true'
                />
                <span className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'>
                  {firstBreadcrumb.label}
                </span>
              </Link>
            </div>
          </li>
        )}
        {restBreadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.label} className='flex'>
            <div className='flex items-center'>
              <svg
                className='h-full w-6 flex-shrink-0 text-gray-200'
                viewBox='0 0 24 44'
                preserveAspectRatio='none'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M.293 0l22 22-22 22h1.414l22-22-22-22H.293z' />
              </svg>
              <Link
                href={breadcrumb.href}
                className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'
              >
                {breadcrumb.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
