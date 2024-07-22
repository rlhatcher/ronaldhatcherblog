import React from 'react'

interface Props {
  children?: React.ReactNode
}

const Container = ({ children }: Props): JSX.Element => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">{children}</div>
  )
}

export default Container
