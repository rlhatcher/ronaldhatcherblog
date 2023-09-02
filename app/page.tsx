import { draftMode } from "next/headers";
import { getAllPosts } from "@/lib/api";
import HeroSection from "./hero-section";
import PostsSection from "./posts-section";
import FeatureSection from "./feature-section";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Ronald Hatcher.
      </h1>
      <h2 className="text-center md:text-left text-xl mt-5 md:pl-8">
        A statically generated blog
      </h2>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);

  return (
    <div className="container mx-auto px-5">
      <Intro />
      <FeatureSection />
      <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">•</span>
      </div>
    </div>
      <PostsSection posts={allPosts} />
    </div>
  );
}
