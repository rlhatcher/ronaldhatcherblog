import { z } from 'zod'

// Lazy imports to handle potential circular dependencies
import { motorSchema } from '@/schemas/Motor' // Import the Motor schema from Motor.ts

// Create a zod schema that matches the ParentReference interface
export const parentReferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
})

// Manufacturer Schema using z.lazy to handle circular dependencies

export const manufacturerSchema = z.object({
  name: z.string(),
  id: z.string(),
  motors: z.array(motorSchema).optional(), // Reference to Motor schema, optional array
})

// Person Schema
export const personSchema = z.object({
  id: z.string(),
  email: z.string().email(), // Validates that the string is an email
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string().url(), // Validates that the string is a URL
})

// Types inferred from schemas
export type Manufacturer = z.infer<typeof manufacturerSchema>
export type Person = z.infer<typeof personSchema>
export type ParentReference = z.infer<typeof parentReferenceSchema>
