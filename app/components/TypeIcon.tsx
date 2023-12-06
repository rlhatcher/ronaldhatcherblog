import React from 'react'
import { IoHammerOutline, IoFlaskOutline, IoBookOutline } from 'react-icons/io5'

interface IconProps {
  type: string
}

const TypeIcon: React.FC<IconProps> = ({ type }) => {
  switch (type) {
    case 'builds':
      return <IoHammerOutline />
    case 'projects':
      return <IoFlaskOutline />
    case 'posts':
      return <IoBookOutline />
    case 'documents':
      return <IoBookOutline />
    default:
      return null // or a default icon if you have one
  }
}

export default TypeIcon
