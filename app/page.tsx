import { draftMode } from "next/headers";
import { getAllPosts } from "@/lib/api";
import { getAllFeatures } from "@/lib/api";
import Posts from "@/app/_components/Posts";
import HeroSection from "./_components/hero-section";
import PostsSection from "./_components/posts-section";
import FeatureSection from "./_components/feature-section";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-2 mb-4 md:mb-4">
      <h1 className="text-3xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
        Ronald Hatcher.
      </h1>
      <h2 className="text-center md:text-left text-xl mt-2 md:pl-8">
        Personal notes and projects.
      </h2>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const allFeatures = await getAllFeatures(isEnabled);

  return (
    <div className="container mx-auto px-5">
      <Intro />
      <FeatureSection features={allFeatures} />
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">•</span>
        </div>
      </div>
      {/* @ts-expect-error Server Component */}
      <PostsSection posts={allPosts} />
    </div>
  );
}
