import TopNav from "@/app/_components/top-nav";
import PostCards from "../_components/PostCards";

export default function PostsPage() {
    return (
        <div className="container mx-auto px-5">
            <TopNav links={[
                { href: "/", label: "Ω" }]}
                page={{ title: "Posts" }} />
            <article>
                <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <PostCards limit={30} />
                    </div>
                </div>
            </article>
        </div>
    );
}
