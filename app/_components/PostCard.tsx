import CoverImage from './cover-image';
import DateComponent from './date';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PostCard({ post }: { post: BlogPost }) {

  if (!post) notFound();

  const { meta, content } = post;
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <article
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
    >
      <CoverImage
        title={post.meta.title}
        slug={post.meta.slug}
        image={post.meta.image}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <DateComponent dateString={post.meta.date} />
        <div className="-ml-4 flex items-center gap-x-4">
          <svg
            viewBox="0 0 2 2"
            className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`/posts/${post.meta.slug}`} className="hover:underline">
          <span className="absolute inset-0" />
          {post.meta.title}
        </Link>
      </h3>
    </article>
  );
}
