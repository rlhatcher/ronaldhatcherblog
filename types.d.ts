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
  manufacturer: string
  manufacturerAbbrev: string
  designation: string
  commonName: string
  impulseClass: string
  diameter: number
  length: number
  type: string
  certOrg: string
  avgThrustN: number
  maxThrustN: number
  totImpulseNs: number
  burnTimeS: number
  dataFiles: number
  infoUrl: string
  totalWeightG: number
  propWeightG: number
  delays: string
  propInfo: string
  sparky: boolean
  updatedOn: Date
  caseInfo: string
}
