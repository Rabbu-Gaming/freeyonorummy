import ClientPage from "../../../components/styles/clientpage";
import appsData from "../../../data/apps.json";

const siteUrl = "https://yonorummyhome.com/";
const pageUrl = `${siteUrl}/category/all-yono-games`;

const pageH1 = "All Yono Games";
const pageSubText =
  "Download trusted Yono Games apps with instant signup bonus and easy withdrawals. 100% Safe for 2026.";
const pageH2 = "All Yono Apps";

export const metadata = {
  title: "All Verified Yono Games Apps | Download & Compare 2026",
  description:
    "Browse all verified Yono Games apps with instant signup bonus and easy withdrawals. Compare bonuses, minimum withdrawal limits, and download safely.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "All Verified Yono Games Apps | Download & Compare 2026",
    description:
      "Browse all verified Yono Games apps with instant signup bonus and easy withdrawals. Compare bonuses, minimum withdrawal limits, and download safely.",
    url: pageUrl,
    siteName: "Yono All Games",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "All Verified Yono Games Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Verified Yono Games Apps | Download & Compare 2026",
    description:
      "Browse all verified Yono Games apps with instant signup bonus and easy withdrawals. Compare bonuses, minimum withdrawal limits, and download safely.",
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default function Page() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Verified Yono Games Apps",
    description:
      "A verified list of Yono Games apps for Indian real-money gaming with signup bonus and withdrawal details.",
    url: pageUrl,
    numberOfItems: appsData.length,
    itemListElement: appsData.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/${app.slug}`,
      name: app.name,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All Yono Games Apps",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ClientPage h1={pageH1} subText={pageSubText} h2={pageH2} current="all" />
    </>
  );
}