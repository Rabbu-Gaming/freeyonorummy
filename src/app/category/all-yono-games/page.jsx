import ClientPage from "../../../components/styles/clientpage";
import appsData from "../../../data/apps.json";

const siteUrl = "https://freeyonorummy.com/";
const pageUrl = `${siteUrl}/category/all-yono-games`;

const pageH1 = "All Yono Games";
const pageSubText =
  "Download trusted Yono Games apps with instant signup bonus and easy withdrawals. 100% Safe for 2026.";
const pageH2 = "All Yono Apps";

const pageContent = {
  intro:
    "This page lists every Yono Games app on our platform in one place, so you can compare signup bonuses, minimum withdrawal limits, and app ratings before you download. Every app listed here has been reviewed for basic safety details like APK source, permissions, and withdrawal process before being added.",
  highlights: [
    {
      title: "Verified Before Listing",
      desc: "Every app is checked for a working download link, valid APK, and consistent bonus details before it goes live.",
    },
    {
      title: "Bonus & Withdrawal Info",
      desc: "Signup bonus and minimum withdrawal amounts are shown upfront so you can compare apps at a glance.",
    },
    {
      title: "Updated Regularly",
      desc: "Bonus values and app versions are re-checked periodically so the list stays accurate through 2026.",
    },
  ],
  sections: [
    {
      heading: "How This List Is Put Together",
      body: "Each app on this page is added after checking its official download page, signup bonus, and minimum withdrawal amount. Apps that change their bonus terms or stop working are updated or removed so the list reflects what's currently available.",
    },
    {
      heading: "How to Choose an App",
      body: "If you're comparing multiple apps, look at the minimum withdrawal amount alongside the signup bonus, since a large bonus is less useful if the withdrawal threshold is high. Use the search bar above to jump straight to a specific app by name.",
    },
  ],
  faqs: [
    {
      q: "Are the apps on this page safe to download?",
      a: "We check each app's download link and basic details before listing it, but you should always review the app's own permissions and terms before installing.",
    },
    {
      q: "How often is the bonus information updated?",
      a: "Bonus and minimum withdrawal figures are reviewed periodically and updated when an app changes its terms.",
    },
    {
      q: "Can I search for a specific app on this page?",
      a: "Yes, use the search bar at the top of the page to filter the list by app name.",
    },
    {
      q: "Do I need to complete KYC to withdraw my winnings?",
      a: "This depends on each individual app's own policy, since requirements vary by app. Check the app's own terms and withdrawal page for its exact process.",
    },
    {
      q: "What should I check before claiming a signup bonus?",
      a: "Look at the minimum withdrawal amount, any wagering conditions attached to the bonus, and whether the bonus applies to your first deposit or just signup.",
    },
  ],
};

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pageContent.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ClientPage
        h1={pageH1}
        subText={pageSubText}
        h2={pageH2}
        current="all"
        content={pageContent}
      />
    </>
  );
}