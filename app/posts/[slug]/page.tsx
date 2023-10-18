import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "@/app/_components/more-stories";
import Avatar from "@/app/_components/avatar";
import Date from "@/app/_components/date";
import CoverImage from "@/app/_components/cover-image";
import TopNav from "@/app/_components/top-nav";

import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { post, morePosts } = await getPostAndMorePosts(params.slug, false);

  return (
    <div className="container mx-auto px-5">
      <TopNav links={[
                { href: "/", label: "Ω" },
                { href: "/posts", label: "Posts" }]}
              page={{ title: post.title }} />
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">
              <div className="hidden md:block md:mb-4">
                {post.author && (
                  <Avatar name={post.author.name} picture={post.author.picture} />
                )}
              </div>
              <div className="mb-4 md:mb-4 sm:mx-0">
                <CoverImage title={post.title} image={post.images[0]} />
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-4">
                  {post.author && (
                    <Avatar name={post.author.name} picture={post.author.picture} />
                  )}
                </div>
                <div className="mb-4 text-lg">
                  <Date dateString={post.date} />
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="prose">
                  <Markdown content={post.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
