import Link from "next/link";
import CoverImage from "./cover-image";

interface Build {
  title: string;
  project?: {
    slug: string;
    title: string;
    images: string[];
  }
  slug: string;
  description: string;
  images: string[];
}

interface BuildCardProps {
  build: Build;
}
const BuildCard: React.FC<BuildCardProps> = ({ build }) => {
  return (
    <article
      key={build.slug}
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
    >
      <CoverImage
        title={build.title}
        slug={build.slug}
        image={build.images[0]}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        {build.project?.title}
        <div className="ml-1 flex items-center gap-x-4">
          <div className="flex gap-x-2.5">
            project
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`/builds/${build.slug}`} className="hover:underline">
          <span className="absolute inset-0" />
          {build.title}
        </Link>
      </h3>
    </article>
  );
}

export default BuildCard;