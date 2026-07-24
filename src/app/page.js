import Hero from "../components/Hero";
import Disclaimer from "../components/disclaimer";
import Sections from "../components/sections";

export const metadata = {
  title: "Yono All Games – Rummy, Slots & Bonus Reward Apps",
  description:
    "Explore Yono All Games – your directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & download links.",
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
    canonical: "https://yonoallgames.app",
  },
  openGraph: {
    title: "Yono All Games – Rummy, Slots & Bonus Reward Apps",
    description:
      "Explore Yono All Games – your directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & download links.",
    url: "https://yonoallgames.app",
    siteName: "Yono All Games",
    images: [
      {
        url: "https://img.yonoallgames.app/logo/yono-all-games.webp",
        width: 1200,
        height: 630,
        alt: "Yono All Games – Rummy, Slots & Bonus Apps",
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
    title: "Yono All Games – Rummy, Slots & Bonus Reward Apps",
    description:
      "Explore Yono All Games – your directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & download links.",
    images: ["https://img.yonoallgames.app/logo/yono-all-games.webp"],
    site: "@yonoallgames",
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
              name: "Yono All Games",
              url: "https://yonoallgames.app",
              publisher: {
                "@type": "Organization",
                name: "Yono All Games",
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
              name: "Yono All Games",
              applicationCategory: "GameApplication",
              operatingSystem: "Android",
              description:
                "Explore Yono All Games – your directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & download links.",
              featureList: [
                "Verified Gaming Apps",
                "Trusted App Reviews",
                "Bonus & Reward Updates",
                "App Safety Checker"
              ],
              url: "https://yonoallgames.app",
              publisher: {
                "@type": "Organization",
                name: "Yono All Games"
              }
            })
          }}
        />
      </main>
    </>
  );
}