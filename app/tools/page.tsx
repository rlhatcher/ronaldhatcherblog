import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { DesignUpload } from '@/components/design'

export default async function Page(): Promise<JSX.Element> {
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { label: 'tools' },
    { label: '🔧' },
  ]
  return (
    <div>
      <BreadcrumbResponsive items={links} />
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <RegisterLink className="rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Register
        </RegisterLink>
        <LoginLink className="text-sm font-semibold leading-6 text-slate-600 hover:text-orange-600">
          Sign In <span aria-hidden="true">→</span>
        </LoginLink>
      </div>
      {/* <LoginLink>Sign in</LoginLink> */}
      <DesignUpload />
    </div>
  )
}
