import React from 'react'

import { BreadcrumbResponsive } from './bread-crumb'

interface MdxPageProps {
  meta: {
    title: string
    description: string
  }
  content: React.ReactNode
  links: BreadCrumb[]
}

const MdxPage: React.FC<MdxPageProps> = ({ meta, content, links }) => {
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <article>
        <h3 className="bg-muted p-2 font-mono text-lg font-light leading-6 shadow-lg">
          {meta.description}
        </h3>
        <div className="m:p-10 prose relative top-0 mx-auto p-5 dark:prose-invert prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
          {content}
        </div>
      </article>
    </div>
  )
}

export default MdxPage
