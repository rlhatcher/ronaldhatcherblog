import { z } from 'zod'

export const RocketSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  description: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' }),
  isModel: z.boolean(),
  email: z.string().email({ message: 'Invalid email address' }),
  image: z.instanceof(File).optional(),
})

export type Rocket = z.infer<typeof RocketSchema>
