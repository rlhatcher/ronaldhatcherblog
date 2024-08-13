import { z } from 'zod'

import { manufacturerSchema } from '@/schemas/core' // Assuming Manufacturer schema is defined in Manufacturer.ts

// ThrustSample Schema
export const thrustSampleSchema = z.object({
  time: z.number(),
  thrust: z.number(),
})

// Motor Schema
export const motorSchema = z.object({
  madeBy: manufacturerSchema, // Reference to the Manufacturer schema
  commonName: z.string(),
  delays: z.string(),
  diameter: z.number(),
  infoUrl: z.string(),
  totImpulseNs: z.number(),
  burnTimeS: z.number(),
  propInfo: z.string(),
  length: z.number(),
  avgThrustN: z.number(),
  dataFiles: z.string(),
  impulseClass: z.string(),
  sparky: z.string(),
  caseInfo: z.string(),
  propWeightG: z.number(),
  certOrg: z.string(),
  motorId: z.string(),
  availability: z.string(),
  maxThrustN: z.number(),
  totalWeightG: z.number(),
  designation: z.string(),
  updatedOn: z.string(),
  type: z.string(),
  thrustCurve: z.array(thrustSampleSchema).optional(), // Optional array of ThrustSample
})

export const mfgMotorSchema = z.object({
  commonName: z.string(),
  delays: z.string(),
  diameter: z.number(),
  infoUrl: z.string(),
  totImpulseNs: z.number(),
  burnTimeS: z.number(),
  propInfo: z.string(),
  length: z.number(),
  avgThrustN: z.number(),
  dataFiles: z.string(),
  impulseClass: z.string(),
  sparky: z.string(),
  caseInfo: z.string(),
  propWeightG: z.number(),
  certOrg: z.string(),
  motorId: z.string(),
  availability: z.string(),
  maxThrustN: z.number(),
  totalWeightG: z.number(),
  designation: z.string(),
  updatedOn: z.string(),
  type: z.string(),
  thrustCurve: z.array(thrustSampleSchema).optional(), // Optional array of ThrustSample
})

// Types inferred from schemas
export type ThrustSample = z.infer<typeof thrustSampleSchema>
export type Motor = z.infer<typeof motorSchema>
export type MfgMotor = z.infer<typeof mfgMotorSchema>
