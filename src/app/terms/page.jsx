import TermsAndConditions from "../../components/terms";

export const metadata = {
  title: "Terms & Conditions | Yono All Games",
  description:
    "Review the official Terms and Conditions of using Yono All Games. Understand your responsibilities, rights, and limitations when accessing Yono Rummy, MBM Bet, and other apps.",
  keywords: [
    "Terms and Conditions",
    "Yono All Games Terms",
    "Yono Rummy Rules",
    "Legal Betting App Policy",
    "Indian Gaming Terms",
    "User Agreement",
  ],
  alternates: {
    canonical: "https://yonorummyhome.com/terms",
  },
  openGraph: {
    title: "Yono All Games Terms & Conditions - Know Your Rights",
    description:
      "Learn the rules and policies for using Yono All Games, including access to Yono Rummy and other real-money games.",
    url: "https://yonorummyhome.com/terms",
    type: "website",
    images: [
      {
        url: "https://img.yonoallgames.app/logo/yono-all-games.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Yono All Games",
    description:
      "Understand the legal terms and usage rules when using Yono All Games and its real-money apps.",
    images: ["https://img.yonoallgames.app/logo/yono-all-games.webp"],
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Yono Rummy Home Terms and Conditions",
      url: "https://yonorummyhome.com/terms",
      description:
        "Read the terms and conditions for using Yono Rummy Home — India’s trusted source for real-money games including Yono Rummy, MBM Bet, and Spin Gold.",
      publisher: {
        "@type": "Organization",
        name: "Yono Rummy Home",
        logo: {
          "@type": "ImageObject",
          url: "https://img.yonoallgames.app/logo/yono-all-games.webp",
        },
      },
    }),
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <TermsAndConditions />
    </main>
  );
}
