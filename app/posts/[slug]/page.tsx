import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import 'highlight.js/styles/github-dark.css';
import Avatar from "@/app/_components/avatar";
// import Date from "@/app/_components/date";
import CoverImage from "@/app/_components/cover-image";
import TopNav from "@/app/_components/top-nav";

import { getPostByName, getPostsMeta } from "@/lib/posts";

export const revalidate = 10;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMeta();

  if (!posts) return []

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: Props) {
  const post = await getPostByName(`${slug}.mdx`);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostByName(`${slug}.mdx`);

  if (!post) notFound();

  const { meta, content } = post;
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <div className="container mx-auto px-5">
      <TopNav
        links={[
          { href: "/", label: "Ω" },
          { href: "/posts", label: "Posts" },
        ]}
        page={{ title: meta.title }}
      />
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">
              {/* <div className="hidden md:block md:mb-4">
                {post.author && (
                  <Avatar
                    name={post.author.name}
                    picture={post.author.picture}
                  />
                )}
              </div> */}
              {/* <div className="mb-4 md:mb-4 sm:mx-0">
                <CoverImage title={post.title} image={post.images[0]} />
              </div> */}
              <div className="max-w-2xl mx-auto">
                {/*<div className="block md:hidden mb-4">
                  {post.author && (
                    <Avatar
                      name={post.author.name}
                      picture={post.author.picture}
                    />
                  )}
                </div> */}
                {/* <div className="mb-4 text-lg">
                  <Date dateString={post.meta.date} />
                </div> */}
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="px-2 md:px-4 prose prose-xl prose-slate mx-auto">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      {/* <MoreStories morePosts={morePosts} /> */}
    </div>
  );
}
