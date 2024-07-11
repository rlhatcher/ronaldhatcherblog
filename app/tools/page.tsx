import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { DesignUpload } from '@/components/design'

export default function Home(): JSX.Element {
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { label: 'tools' },
    { label: '🔧' },
  ]
  return (
    <div>
      <BreadcrumbResponsive items={links} />
      <LoginLink>Sign in</LoginLink>
      <DesignUpload />
    </div>
  )
}
