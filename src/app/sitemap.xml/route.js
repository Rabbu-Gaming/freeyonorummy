import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import appsData from "../../data/apps.json";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://freeyonorummy.com";
  const today = new Date().toISOString().split("T")[0];

  const url = (path) => `${baseUrl}${path ? "/" + path : ""}`;

  const staticRoutes = [
    { slug: "", priority: 1.0, changefreq: "daily" },
    { slug: "category/all-yono-games", priority: 0.9, changefreq: "daily" },
    { slug: "category/new-yono-apps", priority: 0.9, changefreq: "daily" },
    { slug: "blog", priority: 0.7, changefreq: "monthly" },
    { slug: "about", priority: 0.7, changefreq: "monthly" },
    { slug: "privacy", priority: 0.6, changefreq: "yearly" },
    { slug: "terms", priority: 0.6, changefreq: "yearly" },
    { slug: "disclaimer", priority: 0.6, changefreq: "yearly" }
  ].map(r => ({
    loc: url(r.slug),
    changefreq: r.changefreq,
    priority: r.priority
  }));

  let blogRoutes = [];
  try {
    const blogsPath = path.join(process.cwd(), "src", "data", "blogs");
    const files = await fs.readdir(blogsPath);
    const mdFiles = files.filter(f => /\.(md|mdx)$/.test(f));

    for (const file of mdFiles) {
      const filePath = path.join(blogsPath, file);
      const content = await fs.readFile(filePath, "utf-8");

      const dateMatch = content.match(/date:\s*"([^"]+)"/);
      let lastmod = today;
      if (dateMatch) {
        const extracted = dateMatch[1].trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(extracted)) {
          lastmod = extracted;
        }
      }

      const slug = file.replace(/\.(md|mdx)$/, "");
      blogRoutes.push({
        loc: url(`blog/${slug}`),
        lastmod,
        changefreq: "monthly",
        priority: 0.65
      });
    }
  } catch (err) {
    console.error("Failed to read blogs:", err);
  }

  const appRoutes = appsData.map(app => ({
    loc: url(app.slug),
    changefreq: "weekly",
    priority: 0.8
  }));

  const allUrls = [...staticRoutes, ...blogRoutes, ...appRoutes];

  const escape = (str) => str.replace(/&/g, "&amp;");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `
  <url>
    <loc>${escape(u.loc)}</loc>${
      u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""
    }
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" }
  });
}