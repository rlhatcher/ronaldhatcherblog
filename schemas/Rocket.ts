import { z } from 'zod'

const baseRocketSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  description: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' }),
  image: z.instanceof(File).optional(),
})

export type Rocket = z.infer<typeof baseRocketSchema> & {
  basedOn: Rocket[]
}

export const rocketSchema: z.ZodType<Rocket> = baseRocketSchema.extend({
  basedOn: z.lazy(() => rocketSchema.array()),
})
