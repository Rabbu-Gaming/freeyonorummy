import PrivacyPolicy from "../../components/privacy";

export const metadata = {
  title: "Privacy Policy | Free Yono Rummy",
  description:
    "Read the Privacy Policy of Free Yono Rummy. Learn how we collect, use, and protect your data when using our real money gaming platform including Yono Rummy, MBM Bet & Spin Gold.",
  keywords: [
    "Privacy Policy",
    "Free Yono Rummy Data Policy",
    "Secure Gaming Platform",
    "Real Cash Games Privacy",
    "Indian Betting Apps",
    "Yono Rummy Policy",
  ],
  alternates: {
    canonical: "https://freeyonorummy.com/privacy",
  },
  openGraph: {
    title: "Free Yono Rummy Privacy Policy - Secure Gaming in India",
    description:
      "Understand how Free Yono Rummy handles your data and protects user privacy while offering top real cash games like Yono Rummy and Spin Gold.",
    url: "https://freeyonorummy.com/privacy",
    type: "website",
    images: [
      {
        url: "https://img.yonostore.app/logo/free-yono-rummy.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Yono Rummy Privacy Policy",
    description:
      "Read how Free Yono Rummy ensures your data is safe while you enjoy secure gaming with real rewards.",
    images: ["https://img.yonostore.app/logo/free-yono-rummy.webp"],
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Free Yono Rummy Privacy Policy",
      url: "https://freeyonorummy.com/privacy",
      description:
        "Read the privacy policy of Free Yono Rummy, India’s trusted real money gaming platform offering apps like Yono Rummy, Spin Gold, and more.",
      publisher: {
        "@type": "Organization",
        name: "Free Yono Rummy",
        logo: {
          "@type": "ImageObject",
          url: "https://img.yonostore.app/logo/free-yono-rummy.webp",
        },
      },
    }),
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}