import { type Meta, type StoryObj } from '@storybook/react'

import NavLinks from './nav-links'

const meta = {

  title: 'Dashboard/Navlinks',
  component: NavLinks,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof NavLinks>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
  }
} satisfies Meta<typeof NavLinks>
