import PostCard from "./post-card";
import { getPostsMeta } from "@/lib/posts";



export default async function PostsSection({ limit }: { limit: number }) {

  const posts = await getPostsMeta();
  if (!posts) return []

  return (
    <div className="rounded-2xl bg-gray-100 pt-12 sm:pt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Latest updates on projects and builds
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard post={post}  />
          ))}
        </div>
      </div>
    </div>
  );
}
