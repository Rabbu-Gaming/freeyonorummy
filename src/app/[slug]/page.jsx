import { notFound } from "next/navigation";
import appsData from "../../data/apps.json";
import ClientAppPage from "./ClientAppPage";
import { readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export async function generateStaticParams() {
  return appsData.map((app) => ({ slug: app.slug }));
}

function parseFaqBlock(content) {
  const faqs = [];
  const faqRegex = /:::faq\s*\r?\n([\s\S]*?):::/g;
  let match;

  while ((match = faqRegex.exec(content)) !== null) {
    const block = match[1];
    const lines = block.split(/\r?\n/);
    let currentQ = null;
    let currentA = [];

    for (const line of lines) {
      const qMatch = line.match(/^\*\*\d+\.\s+(.*?)\*\*\s*$/);
      if (qMatch) {
        if (currentQ) faqs.push({ q: currentQ, a: currentA.join(" ").trim() });
        currentQ = qMatch[1];
        currentA = [];
      } else if (currentQ && line.trim()) {
        currentA.push(line.trim());
      }
    }
    if (currentQ) faqs.push({ q: currentQ, a: currentA.join(" ").trim() });
  }

  const cleanContent = content.replace(/:::faq\s*\r?\n[\s\S]*?:::/g, "");
  return { faqs, cleanContent };
}

async function getAppData(slug) {
  try {
    const filePath = path.join(process.cwd(), "src/data/apps", `${slug}.md`);
    const fileContent = await readFile(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);
    const { faqs, cleanContent } = parseFaqBlock(content);
    const processedContent = await remark().use(remarkHtml, { sanitize: false }).process(cleanContent);
    const contentHtml = processedContent.toString();

    const jsonApp = appsData.find((app) => app.slug === slug);

    return {
      ...frontmatter,
      ...(jsonApp ? { image: jsonApp.image, size: jsonApp.size, version: jsonApp.version } : {}),
      content: contentHtml,
      faqItems: faqs,
      slug,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const app = await getAppData(slug);
  if (!app) notFound();

  return {
    title: app.title,
    description: app.description || `Download ${slug} APK safely from Yono All Games.`,
    keywords: app.tags || [],
    robots: "index, follow",
    openGraph: {
      title: `${app.title} – Free Yono Rummy`,
      description: app.description || "",
      images: [app.image],
    },
    alternates: {
      canonical: `https://freeyonorummy.com/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const appData = await getAppData(slug);
  if (!appData) notFound();
  return <ClientAppPage appData={appData} />;
}