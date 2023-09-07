import React from 'react';
import CoverImage from './cover-image';
import DateComponent from './date';
import Avatar from './avatar';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  images: string[];
  author?: {
    name: string;
    picture: {
      url: string
    };
  };
}

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  return (
    <article
      key={post.slug}
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
    >
      <CoverImage
        title={post.title}
        slug={post.slug}
        image={post.images[0]}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <DateComponent dateString={post.date} />
        <div className="-ml-4 flex items-center gap-x-4">
          <svg
            viewBox="0 0 2 2"
            className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          {/* <div className="flex gap-x-2.5">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div> */}
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h3>
    </article>
  );
}

export default PostCard;