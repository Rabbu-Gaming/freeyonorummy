import AboutUs from "../../components/aboutus";
import Head from "next/head";

export const metadata = {
  title: "About Us | Yono All Games ",
  description:
    "Discover why Yono All Games is India’s trusted source for safe and verified betting apps like Yono Rummy, Spin Gold, MBM Bet, and more. Secure platform with instant downloads.",
};

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta
          name="description"
          content="Discover why Yono All Games is India's #1 platform for safe and trusted betting apps like Yono Rummy, MBM Bet & Spin Gold. 100% secure & real rewards."
        />
        <meta
          name="keywords"
          content="About Yono All Games, Yono Rummy Apps, Trusted Betting Apps, Real Cash Games, Secure Game Downloads, Indian Gaming Platform"
        />
        <link rel="canonical" href="https://yonoallgames.app/about" />

        <meta property="og:title" content="About Yono All Games - Trusted Source for Yono Rummy & More" />
        <meta
          property="og:description"
          content="Learn what makes Yono All Games a secure, trusted platform to download popular games like Yono Rummy, Spin Gold & MBM Bet."
        />
        <meta property="og:image" content="https://img.yonoallgames.app/logo/yono-all-games.webp" />
        <meta property="og:url" content="https://yonoallgames.app/about" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yono All Games - Secure Platform for Top Indian Games" />
        <meta
          name="twitter:description"
          content="Why choose Yono All Games? We’re India’s safest place to get apps like Yono Rummy & Spin Gold."
        />
        <meta name="twitter:image" content="https://img.yonoallgames.app/logo/yono-all-games.webp" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Yono All Games",
              url: "https://yonoallgames.app/about",
              logo: "https://img.yonoallgames.app/logo/yono-all-games.webp",
              description:
                "Yono All Games provides secure access to real-cash games like Yono Rummy, MBM Bet & Spin Gold. Trusted by thousands of players in India.",
            }),
          }}
        />
      </Head>

      <AboutUs />
    </>
  );
}
