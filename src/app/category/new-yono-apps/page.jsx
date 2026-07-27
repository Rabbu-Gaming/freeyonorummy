import ClientPage from "../../../components/styles/clientpage";
import appsData from "../../../data/apps.json";

const siteUrl = "https://freeyonorummy.com/";
const pageUrl = `${siteUrl}/category/new-yono-apps`;

const pageH1 = "New Yono Games Apps";
const pageSubText =
  "Explore the newest Yono Games apps with instant signup bonus and easy withdrawals. 100% Safe for 2026.";
const pageH2 = "New Yono Apps";

const newApps = appsData.filter((app) => app.new === "yes");

const pageContent = {
  intro:
    "This page tracks the newest Yono Games apps as they launch, so you can try fresh apps before they get crowded. Each app here goes through the same basic checks as our main list, covering download link, signup bonus, and minimum withdrawal amount, before it's added.",
  highlights: [
    {
      title: "Freshly Launched",
      desc: "Only apps that are newly released or recently added to the market appear on this page.",
    },
    {
      title: "Early Signup Bonuses",
      desc: "New apps often run higher launch bonuses, so checking this page regularly can be worth it.",
    },
    {
      title: "Same Safety Checks",
      desc: "New apps go through the same basic verification as apps on our main list before being added here.",
    },
  ],
  sections: [
    {
      heading: "Why Check New Apps Regularly",
      body: "New Yono Games apps sometimes launch with higher signup bonuses to attract early users, so checking this page from time to time can help you catch offers before they change. Once an app has been live for a while, it moves to our main list.",
    },
    {
      heading: "What to Check Before Trying a New App",
      body: "Since new apps have a shorter track record, it's worth checking the minimum withdrawal amount and reading the app's own terms carefully before depositing. Start with a smaller amount until you've confirmed the withdrawal process works as expected.",
    },
  ],
  faqs: [
    {
      q: "How do apps end up on this new apps page?",
      a: "Apps appear here shortly after their initial launch or after being newly added to our platform, and move to the main list once they've been live for a while.",
    },
    {
      q: "Do new apps have better signup bonuses?",
      a: "Newer apps sometimes offer higher launch bonuses to attract early users, but this varies by app, so it's worth comparing bonus and withdrawal details before deciding.",
    },
    {
      q: "Is it safe to try a newly launched app?",
      a: "We run the same basic checks on new apps as we do for our main list, but with less track record, it's a good idea to start small and confirm the withdrawal process yourself.",
    },
    {
      q: "How often is this page updated?",
      a: "This page updates as soon as a new app passes our basic checks, so the list reflects current launches rather than a fixed schedule.",
    },
    {
      q: "Will a new app stay on this page permanently?",
      a: "No, apps typically move from this page to the main All Yono Games list once they've been available for some time.",
    },
  ],
};

export const metadata = {
  title: "New Yono Games Apps | Latest Launches 2026",
  description:
    "Discover the latest new Yono Games apps with instant signup bonus and easy withdrawals. Compare bonuses, minimum withdrawal limits, and download safely.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "New Yono Games Apps | Latest Launches 2026",
    description:
      "Discover the latest new Yono Games apps with instant signup bonus and easy withdrawals. Compare bonuses, minimum withdrawal limits, and download safely.",
    url: pageUrl,
    siteName: "Yono All Games",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "New Yono Games Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Yono Games Apps | Latest Launches 2026",
    description:
      "Discover the latest new Yono Games apps with instant signup bonus and easy withdrawals. Compare bonuses, minimum withdrawal limits, and download safely.",
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default function Page() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "New Yono Games Apps",
    description:
      "A verified list of newly launched Yono Games apps for Indian real-money gaming with signup bonus and withdrawal details.",
    url: pageUrl,
    numberOfItems: newApps.length,
    itemListElement: newApps.map((app, index) => ({
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
        name: "New Yono Games Apps",
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
        apps={newApps}
        current="new"
        content={pageContent}
      />
    </>
  );
}