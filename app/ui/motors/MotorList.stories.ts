import type { Meta, StoryObj } from '@storybook/react'
import MotorList from './MotorList'

const meta = {
  title: 'Motors/MotorList',
  component: MotorList,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof MotorList>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    motors: [
      {
        commonName: 'A8',
        delays: 'delays',
        diameter: 0,
        infoUrl: 'infoUrl',
        totImpulseNs: 0,
        manufacturer: 'manufacturer',
        burnTimeS: 0,
        propInfo: 'propInfo',
        length: 0,
        avgThrustN: 0,
        dataFiles: 'dataFiles',
        impulseClass: 'impulseClass',
        sparky: 'sparky',
        caseInfo: 'caseInfo',
        propWeightG: 0,
        certOrg: 'certOrg',
        motorId: 'motorId',
        availability: 'availability',
        maxThrustN: 0,
        totalWeightG: 0,
        designation: 'designation',
        updatedOn: 'updatedOn',
        type: 'type',
        mfgID: 'mfgID'
      }
    ]
  }
}
