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
    { slug: "about", priority: 0.7, changefreq: "monthly" },
    { slug: "privacy", priority: 0.6, changefreq: "yearly" },
    { slug: "terms", priority: 0.6, changefreq: "yearly" },
    { slug: "disclaimer", priority: 0.6, changefreq: "yearly" }
  ].map(r => ({
    loc: url(r.slug),
    changefreq: r.changefreq,
    priority: r.priority
  }));

  const appRoutes = appsData.map(app => ({
    loc: url(app.slug),
    changefreq: "weekly",
    priority: 0.8
  }));

  const allUrls = [...staticRoutes, ...appRoutes];

  const escape = (str) => str.replace(/&/g, "&amp;");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `
  <url>
    <loc>${escape(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""
    }
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" }
  });
}