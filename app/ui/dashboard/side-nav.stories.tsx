import { type Meta, type StoryObj } from '@storybook/react'

import SideNav from './side-nav'

const meta = {

  title: 'Dashboard/SideNav',
  component: SideNav,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof SideNav>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
  }
} satisfies Meta<typeof SideNav>
