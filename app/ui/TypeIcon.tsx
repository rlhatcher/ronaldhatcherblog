import React from 'react'
import {
  IoHammerOutline,
  IoFlaskOutline,
  IoBookOutline,
  IoAddCircleOutline,
} from 'react-icons/io5'
import { PiFactory, PiRocketLaunch } from 'react-icons/pi'
import { SiMediafire } from 'react-icons/si'

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
    case 'mfgs':
      return <PiFactory />
    case 'kits':
      return <PiRocketLaunch />
    case 'motors':
      return <SiMediafire />
    default:
      return <IoAddCircleOutline />
  }
}

export default TypeIcon
