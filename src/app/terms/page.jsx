import TermsAndConditions from "../../components/terms";

export const metadata = {
  title: "Terms & Conditions | Free Yono Rummy",
  description:
    "Review the official Terms and Conditions of using Free Yono Rummy. Understand your responsibilities, rights, and limitations when accessing Yono Rummy, MBM Bet, and other apps.",
  keywords: [
    "Terms and Conditions",
    "Free Yono Rummy Terms",
    "Yono Rummy Rules",
    "Legal Betting App Policy",
    "Indian Gaming Terms",
    "User Agreement",
  ],
  alternates: {
    canonical: "https://freeyonorummy.com/terms",
  },
  openGraph: {
    title: "Free Yono Rummy Terms & Conditions - Know Your Rights",
    description:
      "Learn the rules and policies for using Free Yono Rummy, including access to Yono Rummy and other real-money games.",
    url: "https://freeyonorummy.com/terms",
    type: "website",
    images: [
      {
        url: "https://img.yonostore.app/logo/free-yono-rummy.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Free Yono Rummy",
    description:
      "Understand the legal terms and usage rules when using Free Yono Rummy and its real-money apps.",
    images: ["https://img.yonostore.app/logo/free-yono-rummy.webp"],
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Free Yono Rummy Terms and Conditions",
      url: "https://freeyonorummy.com/terms",
      description:
        "Read the terms and conditions for using Free Yono Rummy — India’s trusted source for real-money games including Yono Rummy, MBM Bet, and Spin Gold.",
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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <TermsAndConditions />
    </main>
  );
}