import type { Meta, StoryObj } from '@storybook/react'

import CloudImage from './CloudImage'

const meta = {
  title: 'Images/CloudImage',
  component: CloudImage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof CloudImage>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'string',
    image: 'string',
    slug: 'string',
    className: 'string',
    alt: 'string',
    zoom: 'boolean' as unknown as any,
    height: 400,
    width: 600,
    crop: 'thumb'
  }
} satisfies Meta<typeof CloudImage>
