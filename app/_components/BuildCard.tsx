import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/app/_components/cover-image";

export default async function BuildCard({ build }: { build: Build }) {

  if (!build) notFound();

  const { meta, content } = build;
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));
  return (
    <article
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80" >
      <CoverImage
        title={build.meta.title}
        slug={build.meta.slug}
        image={build.meta.image}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`/builds/${build.meta.slug}`} className="hover:underline">
          <span className="absolute inset-0" />
          {build.meta.title}
        </Link>
      </h3>
    </article>
  );
}
