import type { Metadata } from "next";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Yono Rummy Blog – News, Guides & Updates",
  description:
    "Explore the latest blog posts from Free Yono Rummy, including game guides, trusted app insights, and platform updates to stay informed and safe.",
  keywords: [
    "Free Yono Rummy blog",
    "Yono game guides",
    "best game blogs",
    "trusted game apps India",
    "app updates news",
    "teen patti tips",
    "rummy guides",
  ],
  openGraph: {
    title: "Free Yono Rummy Blog – News, Guides & Updates",
    description:
      "Stay updated with guides, stories, and expert insights from the world of trusted Indian game apps.",
    url: "https://yonorummyhome.com/blog",
    siteName: "Free Yono Rummy",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://yonorummyhome.com/blog",
  },
};

type BlogMeta = {
  title: string;
  slug: string;
  date: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  [k: string]: any;
};

async function readBlogList(): Promise<BlogMeta[]> {
  const fs = await import("fs/promises");
  const blogsPath = path.join(process.cwd(), "src", "data", "blogs");

  try {
    const files = await fs.readdir(blogsPath);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const list = await Promise.all(
      mdFiles.map(async (file) => {
        const raw = await fs.readFile(path.join(blogsPath, file), "utf8");
        const { data } = matter(raw);
        const meta = { ...(data as Partial<BlogMeta>) } as BlogMeta;
        if (!meta.slug) meta.slug = file.replace(/\.md$/, "");
        if (!meta.date) meta.date = new Date(0).toISOString();
        return meta;
      })
    );

    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("readBlogList error:", err);
    return [];
  }
}

export default async function BlogListPage() {
  const blogs = await readBlogList();
  const posts = Array.isArray(blogs) ? blogs : [];

  if (posts.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Free Yono Rummy Blog</h1>
        <p className="text-gray-500">No blog posts found yet. Check back later.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <section className="w-full bg-white">
        <div className="max-w-[60rem] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 sm:pt-10 sm:pb-8">
          <span className="inline-block text-[11px] font-bold tracking-[0.14em] uppercase text-emerald-700 mb-2 sm:mb-3">
            Free Yono Rummy Blog
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2 sm:mb-3">
            Guides, Updates and Insights
          </h1>
          <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
            Practical rummy strategies, verified app reviews and platform updates, curated for players who want a safe and informed experience.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-[60rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Latest Articles</h2>
          <span className="text-xs font-medium text-gray-400">{posts.length} posts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {posts.map((post: BlogMeta) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-row items-center gap-3 rounded-xl bg-white border border-gray-300 shadow-sm h-full p-2.5"
            >
              {post.coverImage && (
                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={post.title || post.slug}
                    loading="lazy"
                    width={600}
                    height={400}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              )}

              <div className="flex flex-col flex-grow min-w-0">
                <h3 className="text-[13px] font-bold text-gray-900 leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="mt-1 text-[10px] text-gray-500 uppercase font-light">
                  {post.date
                    ? new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}