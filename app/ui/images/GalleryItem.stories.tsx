import type { Meta, StoryObj } from '@storybook/react'

import GalleryItem from './GalleryItem'

const meta = {
  title: 'Images/GalleryItem',
  component: GalleryItem,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof GalleryItem>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    publicId: 'logo'
  }
}
