import React from 'react'

interface Props {
  children?: React.ReactNode
}

const Container = ({ children }: Props): JSX.Element => {
  return (
    <div className="container mx-auto px-5 sm:px-6 lg:px-8">{children}</div>
  )
}

export default Container
