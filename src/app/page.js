import Hero from "../components/Hero";
import Disclaimer from "../components/disclaimer";
import Sections from "../components/sections";

export const metadata = {
  title: "Free Yono Rummy – Rummy, Slots & Bonus Reward Apps",
  description:
    "Explore Free Yono Rummy – your trusted directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & safe download links.",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://freeyonorummy.com",
  },
  openGraph: {
    title: "Free Yono Rummy – Rummy, Slots & Bonus Reward Apps",
    description:
      "Explore Free Yono Rummy – your trusted directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & safe download links.",
    url: "https://freeyonorummy.com",
    siteName: "Free Yono Rummy",
    images: [
      {
        url: "https://img.yonoallgames.app/logo/yono-all-games.webp",
        width: 1200,
        height: 630,
        alt: "Free Yono Rummy – Rummy, Slots & Bonus Apps",
      },
    ],
    locale: "en_IN",
    type: "website",
    seeAlso: [
      "https://github.com/Aestero-UI/yonostore",
      "https://www.facebook.com/share/1Bxo8EGZqR/",
      "https://www.linkedin.com/in/yono-store-271624375",
      "https://x.com/yono_store",
      "https://pin.it/5Hv9D5OVa"
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Yono Rummy – Rummy, Slots & Bonus Reward Apps",
    description:
      "Explore Free Yono Rummy – your trusted directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & safe download links.",
    images: ["https://img.yonoallgames.app/logo/yono-all-games.webp"],
    site: "@yono_store",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function HomePage() {
  return (
    <>
      <main className="bg-white min-h-screen">
        <Hero />
        <Sections />
        <Disclaimer />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Free Yono Rummy",
              url: "https://freeyonorummy.com",
              publisher: {
                "@type": "Organization",
                name: "Free Yono Rummy",
                logo: {
                  "@type": "ImageObject",
                  url: "https://img.yonoallgames.app/logo/yono-all-games.webp"
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Free Yono Rummy",
              applicationCategory: "GameApplication",
              operatingSystem: "Android",
              description:
                "Explore Free Yono Rummy – your trusted directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & safe download links.",
              featureList: [
                "Verified Gaming Apps",
                "Trusted App Reviews",
                "Bonus & Reward Updates",
                "App Safety Checker"
              ],
              url: "https://freeyonorummy.com",
              publisher: {
                "@type": "Organization",
                name: "Free Yono Rummy"
              }
            })
          }}
        />
      </main>
    </>
  );
}