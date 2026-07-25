import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import fs from "fs/promises";
import React from "react";
import Image from "next/image";

import FAQSection from "../faq";
import RelatedBlogs from "../RelatedBlogs";
import { extractFaqFromContent } from "../faq-parser";
import AppCard from "../AppCard";
import TeleCard from "../TeleCard";
import ProsCons from "../ProsCons";

function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6l0 13" />
      <path d="M12 6l0 13" />
      <path d="M21 6l0 13" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1zm3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16v-9.625z" />
      <path d="M12 12a1 1 0 0 1 .993 .883l.007 .117v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
    </svg>
  );
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
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

type AppData = {
  slug: string;
  name: string;
  image: string;
  signupBonus: string;
  downloadLink: string;
  minWithdraw: string;
  totalDownloads: number;
  rating: string;
  upcoming?: string;
};

async function readBlogList(): Promise<BlogMeta[]> {
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
    return [];
  }
}

async function readBlogBySlug(slug: string): Promise<{ data: BlogMeta; content: string } | null> {
  const filePath = path.join(process.cwd(), "src", "data", "blogs", `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    const meta = { ...(data as Partial<BlogMeta>) } as BlogMeta;
    if (!meta.slug) meta.slug = slug;
    if (!meta.date) meta.date = new Date(0).toISOString();
    return { data: meta, content };
  } catch (err) {
    return null;
  }
}

function slugToName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function getAllApps(): Promise<AppData[]> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "apps.json");
    const raw = await fs.readFile(filePath, "utf8");
    const jsonApps: { slug: string; image: string }[] = JSON.parse(raw);

    const apps = await Promise.all(
      jsonApps.map(async (jsonApp): Promise<AppData | null> => {
        try {
          const mdPath = path.join(process.cwd(), "src", "data", "apps", `${jsonApp.slug}.md`);
          const mdRaw = await fs.readFile(mdPath, "utf8");
          const { data } = matter(mdRaw);
          return {
            slug: jsonApp.slug,
            name: slugToName(jsonApp.slug),
            image: jsonApp.image,
            signupBonus: data.signupBonus,
            downloadLink: data.downloadLink,
            minWithdraw: data.minWithdraw,
            totalDownloads: data.totalDownloads,
            rating: data.rating,
            upcoming: data.upcoming,
          };
        } catch {
          return null;
        }
      })
    );

    return apps.filter((a): a is AppData => a !== null);
  } catch (err) {
    return [];
  }
}

function countSharedTags(tagsA: string[] | undefined, tagsB: string[] | undefined): number {
  if (!tagsA || !tagsB) return 0;
  return tagsA.filter((tag) => tagsB.includes(tag)).length;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const [blogs, current, allApps] = await Promise.all([
    readBlogList(),
    readBlogBySlug(slug),
    getAllApps(),
  ]);

  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  if (currentIndex === -1 || !current) return notFound();

  const { data, content: rawContent } = current;
  const readTime = estimateReadTime(rawContent);

  const relatedBlogs = blogs
    .filter((b) => b.slug !== slug)
    .sort((a, b) => {
      const scoreA = countSharedTags(data.tags, a.tags);
      const scoreB = countSharedTags(data.tags, b.tags);

      if (scoreA !== scoreB) return scoreB - scoreA;

      const hasTagsA = (a.tags?.length ?? 0) > 0 ? 1 : 0;
      const hasTagsB = (b.tags?.length ?? 0) > 0 ? 1 : 0;
      if (hasTagsA !== hasTagsB) return hasTagsB - hasTagsA;

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 6);

  const inlineSlugs = new Set<string>();
  const slugScanRegex = /:::apps\s*([\s\S]*?)\s*:::/g;
  let slugMatch;
  while ((slugMatch = slugScanRegex.exec(rawContent)) !== null) {
    slugMatch[1].split("\n").map((s) => s.trim()).filter(Boolean).forEach((s) => inlineSlugs.add(s));
  }

  const relatedApps = [...allApps]
    .filter((a) => !inlineSlugs.has(a.slug) && (a as any).upcoming !== "yes")
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  const faqResult = extractFaqFromContent(rawContent);
  let markdownContent = faqResult.cleanedContent;
  const faqItems = faqResult.faqItems;

  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;

  const blockRegex = /:::(apps|youtube|telegram|proscons)\s*([\s\S]*?)\s*:::/g;
  let match;

  while ((match = blockRegex.exec(markdownContent)) !== null) {
    const start = match.index;
    const end = blockRegex.lastIndex;

    if (start > lastIndex) {
      parts.push(markdownContent.slice(lastIndex, start));
    }

    const type = match[1];
    const blockContent = match[2].trim();

    if (type === "apps") {
      const slugs = blockContent
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      slugs.forEach((slug, idx) => {
        const app = allApps.find((a) => a.slug === slug);
        if (app) {
          parts.push(<AppCard key={`app-${slug}-${parts.length}-${idx}`} app={app} />);
        }
      });
    } else if (type === "youtube") {
      const lines = blockContent.split("\n").map((l) => l.trim()).filter(Boolean);
      const videoId = lines[0];
      const caption = lines.slice(1).join("\n") || "";

      if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        parts.push(
          <div
            key={`yt-${videoId}-${parts.length}`}
            className="my-6 aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200"
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
              title={caption || "YouTube video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
            {caption && (
              <p className="mt-2 text-center text-sm text-gray-600 px-4">
                {caption}
              </p>
            )}
          </div>
        );
      }
    } else if (type === "telegram") {
      parts.push(<TeleCard key={`telegram-${parts.length}`} />);
    } else if (type === "proscons") {
      const sections = blockContent.split(/::(pros|cons)\b/);

      let pros: string[] = [];
      let cons: string[] = [];
      let currentList: string[] | null = null;

      for (const part of sections) {
        const trimmed = part.trim();
        if (!trimmed) continue;

        if (trimmed === "pros") {
          currentList = pros;
          continue;
        }
        if (trimmed === "cons") {
          currentList = cons;
          continue;
        }

        if (currentList !== null) {
          const lines = trimmed
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => line.replace(/^[-*•]\s+/, ""));

          currentList.push(...lines);
        }
      }

      if (pros.length > 0 || cons.length > 0) {
        parts.push(
          <ProsCons
            key={`proscons-${parts.length}`}
            pros={pros}
            cons={cons}
          />
        );
      }
    }

    lastIndex = end;
  }

  if (lastIndex < markdownContent.length) {
    parts.push(markdownContent.slice(lastIndex));
  }

  return (
    <div className="max-w-[60rem] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6 sm:pt-10">
      <div className="lg:flex lg:gap-6">
        <main className="lg:flex-1 min-w-0">
          {data.tags && data.tags[0] && (
            <span className="inline-block text-[11px] font-bold tracking-[0.14em] uppercase text-emerald-700 mb-3">
              {data.tags[0]}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
            {data.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5 text-gray-500">
              <CalendarIcon />
              {data.date
                ? new Date(data.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                : "Date not available"}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <BookIcon />
              {readTime} min read
            </span>
          </div>

          {data.coverImage && (
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-xl mb-6 sm:mb-10 bg-gray-100">
              <Image
                src={data.coverImage}
                alt={data.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60rem"
              />
            </div>
          )}

          <div className="prose prose-base sm:prose-lg max-w-none text-gray-800">
            {parts.map((part, index) =>
              typeof part === "string" ? (
                <ReactMarkdown
                  key={index}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ node, ...props }) => <h2 className="mt-9 mb-3 text-xl sm:text-2xl font-semibold" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="mt-8 mb-3 text-lg sm:text-xl font-semibold" {...props} />,
                    p: ({ node, ...props }) => <p className="mt-5 mb-5 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc ml-6 mt-5 mb-5 space-y-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mt-5 mb-5 space-y-2" {...props} />,
                    li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                    img: ({ node, ...props }) => <img className="rounded-2xl my-5" {...props} loading="lazy" />,
                    strong: ({ node, ...props }) => <strong className="text-gray-900 font-semibold" {...props} />,
                    code: ({ node, ...props }) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm" {...props} />,
                    a: ({ node, ...props }) => (
                      <a {...props} className="text-blue-600 hover:text-blue-800 transition" target="_blank" rel="noopener noreferrer" />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="my-10 overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
                        <table className="min-w-full divide-y divide-gray-200" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
                    tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-100 bg-white" {...props} />,
                    tr: ({ node, ...props }) => <tr className="hover:bg-gray-50/70 transition-colors" {...props} />,
                    th: ({ node, ...props }) => (
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap" {...props} />
                    ),
                  }}
                >
                  {part}
                </ReactMarkdown>
              ) : (
                part
              )
            )}
          </div>

          {faqItems.length > 0 && <FAQSection items={faqItems} />}
        </main>

        <RelatedBlogs blogs={relatedBlogs} variant="desktop" apps={relatedApps} />
      </div>

      <RelatedBlogs blogs={relatedBlogs} variant="mobile" apps={relatedApps} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            datePublished: data.date,
            dateModified: data.date,
            image: data.coverImage,
            description: data.description,
            url: `https://yonoallgames.app/blog/${slug}`,
            publisher: {
              "@type": "Organization",
              name: "Yono All Games",
              logo: { "@type": "ImageObject", url: "https://img.yonoallgames.app/logo/yono-all-games.webp" },
            },
          }),
        }}
      />

      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await readBlogList();
  const realParams = blogs.map((b) => ({ slug: b.slug }));

  const forcedParams = [
    { slug: "hee" },
  ];

  const combined = [...realParams, ...forcedParams].filter(
    (v, i, a) => a.findIndex(t => t.slug === v.slug) === i
  );

  return combined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await readBlogBySlug(slug);
  if (!blog) {
    return { title: "Blog – Yono All Games", description: "Yono All Games blog" };
  }

  const { title, description, coverImage, tags, date } = blog.data;

  return {
    title: `${title} | Yono All Games Blog`,
    description: description || "Read trusted guides, tips, and updates on Yono All Games.",
    keywords: tags?.join(", ") || undefined,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${title} | Yono All Games Blog`,
      description: description || "Read trusted guides, tips, and updates on Yono All Games.",
      url: `https://yonoallgames.app/blog/${slug}`,
      siteName: "Yono All Games",
      images: coverImage ? [{ url: coverImage, width: 1200, height: 630, alt: title }] : undefined,
      type: "article",
      locale: "en_IN",
      publishedTime: date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Yono All Games Blog`,
      description: description || "Read trusted guides, tips, and updates on Yono All Games.",
      images: coverImage ? [coverImage] : undefined,
    },
    alternates: {
      canonical: `https://yonoallgames.app/blog/${slug}`,
    },
  };
}