interface PublishedDoc {
  objectKey: string
  url: string
  date: Date
  size: number
}

interface BreadCrumb {
  href: string
  label: string
}

interface Meta {
  title: string
  slug: string
  description: string
  date: string
  image: string
  tags: string[]
  type: string
}

interface ImageMeta {
  assetId: string
  publicId: string
  format: string
  bytes: number
  width: number
  height: number
  url: string
}

interface BuildMeta extends Meta {
  project: string
}

interface StepMeta extends Meta {
  weight: number
}

interface BlogPostMeta extends Meta {
  project: string
}

interface BlogPost {
  meta: BlogPostMeta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Project {
  meta: Meta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Build {
  meta: BuildMeta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Step {
  meta: StepMeta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}
interface TagObject {
  value: string
  count: number
}

interface Motor {
  id: string
  availability: string
  avgThrustN: number
  burnTimeS: number
  certOrg: string
  commonName: string
  dataFiles: number
  delays: string
  designation: string
  diameter: number
  impulseClass: string
  infoUrl: string
  length: number
  manufacturer: string
  manufacturerAbbrev: string
  maxThrustN: number
  propInfo: string
  propWeightG: number
  sparky: boolean
  totalWeightG: number
  totImpulseNs: number
  type: string
  updatedOn: Date
}

interface Kit {
  mfg_id: string
  model: string
  name: string
  image: string
  recommended_engines: string
  projected_max_altitude: string
  recovery_system: string
  length: number
  diameter: number
  estimated_weight: number
  estimated_assembly_time: number
  fin_materials: string
  decal_type: string
  launch_system: string
  launch_rod_size: string
  age_recommendation: number
  description: string
  instructions: string
  src_url: string
  is_discontinued: boolean
}
