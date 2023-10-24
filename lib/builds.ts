import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Video from "@/app/_components/Video";

type gitFile = {
  name: string;
  path: string;
};

export async function getBuildByName(
  fileName: string
): Promise<Project | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/rlhatcher/rlhblog-content/main/builds/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    image: string;
    tags: string[];
  }>({
    source: rawMDX,
    components: {
      Video,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          //@ts-ignore
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "prepend",
            },
          ],
        ],
      },
    },
  });

  const slug = fileName.replace(/\.mdx$/, "");

  const BuildObj: Build = {
    meta: {
      slug: slug,
      title: frontmatter.title,
      date: frontmatter.date,
      image: frontmatter.image,
      tags: frontmatter.tags,
    },
    content,
  };

  return BuildObj;
}

export async function getBuildsMeta(): Promise<Build[] | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/rlhatcher/rlhblog-content/contents/builds`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const repoFiletree: gitFile[] = await res.json();

  const filesArray = repoFiletree
    .map((obj) => obj.name)
    .filter((name) => name.endsWith(".mdx"));

  const builds: Build[] = [];

  for (const file of filesArray) {
    const build = await getBuildByName(file);
    if (build) {
      builds.push(build);
    }
  }

  return builds.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}
