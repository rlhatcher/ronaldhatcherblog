import PostCard from "./PostCard";
import { getPostsMeta } from "@/lib/posts";

export default async function PostCards({ limit }: { limit: number }) {

  const posts = await getPostsMeta();
  if (!posts) return []

  return (

        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard post={post} key={post.meta.slug} />
          ))}
        </div>
  );
}
