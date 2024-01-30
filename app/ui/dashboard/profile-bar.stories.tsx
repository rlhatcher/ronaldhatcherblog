import { type Meta, type StoryObj } from '@storybook/react'

import ProfileBar from './profile-bar'

const meta = {

  title: 'Dashboard/ProfileBar',
  component: ProfileBar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ProfileBar>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    name: 'Ronald Hatcher'
  }
} satisfies Meta<typeof ProfileBar>
