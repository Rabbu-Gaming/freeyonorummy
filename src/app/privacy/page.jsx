import PrivacyPolicy from "../../components/privacy";

export const metadata = {
  title: "Privacy Policy | Yono All Games",
  description:
    "Read the Privacy Policy of Yono All Games. Learn how we collect, use, and protect your data when using our real money gaming platform including Yono Rummy, MBM Bet & Spin Gold.",
  keywords: [
    "Privacy Policy",
    "Yono All Games Data Policy",
    "Secure Gaming Platform",
    "Real Cash Games Privacy",
    "Indian Betting Apps",
    "Yono Rummy Policy",
  ],
  alternates: {
    canonical: "https://yonorummyhome.com/privacy",
  },
  openGraph: {
    title: "Yono All Games Privacy Policy - Secure Gaming in India",
    description:
      "Understand how Yono All Games handles your data and protects user privacy while offering top real cash games like Yono Rummy and Spin Gold.",
    url: "https://yonorummyhome.com/privacy",
    type: "website",
    images: [
      {
        url: "https://img.yonoallgames.app/logo/yono-all-games.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yono All Games Privacy Policy",
    description:
      "Read how Yono All Games ensures your data is safe while you enjoy secure gaming with real rewards.",
    images: ["https://img.yonoallgames.app/logo/yono-all-games.webp"],
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Yono Rummy Home Privacy Policy",
      url: "https://yonorummyhome.com/privacy",
      description:
        "Read the privacy policy of Yono Rummy Home, India’s trusted real money gaming platform offering apps like Yono Rummy, Spin Gold, and more.",
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

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
