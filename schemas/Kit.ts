import { z } from 'zod'

import { manufacturerSchema } from '@/schemas/core' // Import the Manufacturer schema from core.ts

// Kit Schema
export const kitSchema = z.object({
  id: z.string(),
  madeBy: manufacturerSchema, // Reference to the Manufacturer schema
  url: z.string().url(), // Validates that the string is a URL
  imageSrc: z.string().url(), // Validates that the string is a URL
  recommendedEngines: z.string(),
  projectedMaxAltitude: z.string(),
  recoverySystem: z.string(),
  length: z.string(),
  diameter: z.string(),
  estimatedWeight: z.string(),
  estimatedAssemblyTime: z.string(),
  finMaterials: z.string(),
  decalType: z.string(),
  launchSystem: z.string(),
  launchRodSize: z.string(),
  instructions: z.string(),
  ageRecommendation: z.string(),
  name: z.string(),
  complexity: z.string(),
  height: z.string(),
  weight: z.string(),
  motorMount: z.string(),
  parachuteSize: z.string(),
  shockCordType: z.string(),
  shockCordMount: z.string(),
  finThickness: z.string(),
  ringThickness: z.string(),
  price: z.string(),
  currency: z.string(),
  sku: z.string(),
  stockStatus: z.string(),
  description: z.string(),
  links: z.string(),
  parachute: z.string(),
  finArray: z.string(),
  labels: z.array(z.string()), // Array of strings
})

export const mfgKitSchema = z.object({
  id: z.string(),
  url: z.string().url(), // Validates that the string is a URL
  imageSrc: z.string().url(), // Validates that the string is a URL
  recommendedEngines: z.string(),
  projectedMaxAltitude: z.string(),
  recoverySystem: z.string(),
  length: z.string(),
  diameter: z.string(),
  estimatedWeight: z.string(),
  estimatedAssemblyTime: z.string(),
  finMaterials: z.string(),
  decalType: z.string(),
  launchSystem: z.string(),
  launchRodSize: z.string(),
  instructions: z.string(),
  ageRecommendation: z.string(),
  name: z.string(),
  complexity: z.string(),
  height: z.string(),
  weight: z.string(),
  motorMount: z.string(),
  parachuteSize: z.string(),
  shockCordType: z.string(),
  shockCordMount: z.string(),
  finThickness: z.string(),
  ringThickness: z.string(),
  price: z.string(),
  currency: z.string(),
  sku: z.string(),
  stockStatus: z.string(),
  description: z.string(),
  links: z.string(),
  parachute: z.string(),
  finArray: z.string(),
  labels: z.array(z.string()), // Array of strings
})

// Type inferred from the schema
export type Kit = z.infer<typeof kitSchema>
