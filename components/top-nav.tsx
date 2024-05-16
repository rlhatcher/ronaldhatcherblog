import React from 'react'

import { BreadcrumbResponsive } from './bread-crumb'
interface Props {
  links: BreadCrumb[]
  page: {
    title: string
  }
}

const TopNav: React.FC<Props> = ({ links, page }) => {
  return (
    <nav className="flex-col md:flex-row flex font-mono items-center md:items-baseline md:justify-between mt-2 mb-2 md:mb-2">
      <h1 className="text-xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
        <BreadcrumbResponsive items={links} />
      </h1>
      <h2 className="text-center md:text-left text-xl font-semibold mt-2 md:pl-8">
        {page.title}
      </h2>
    </nav>
  )
}

export default TopNav
