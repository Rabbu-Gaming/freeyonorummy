import Disclaimer from "../../components/disclaimerr";
import Head from "next/head";

export const metadata = {
  title: "Disclaimer | Free Yono Rummy",
  description:
    "Read the official disclaimer of Free Yono Rummy. Learn about our role as an independent information platform for apps like Yono Rummy, Spin Gold, MBM Bet and more.",
};

export default function DisclaimerPage() {
  return (
    <>
      <Head>
        <title>Disclaimer</title>
        <meta
          name="description"
          content="Official disclaimer of Free Yono Rummy. We are an independent platform providing information about trusted betting apps like Yono Rummy, MBM Bet & Spin Gold. Play responsibly."
        />
        <meta
          name="keywords"
          content="Free Yono Rummy Disclaimer, Yono Rummy Apps Disclaimer, Trusted Betting Apps India, Responsible Gaming, Game Download Disclaimer"
        />
        <link rel="canonical" href="https://freeyonorummy.com/disclaimer" />

        <meta property="og:title" content="Disclaimer | Free Yono Rummy - Important Legal Notice" />
        <meta
          property="og:description"
          content="Read Free Yono Rummy’s disclaimer. We provide information about popular apps like Yono Rummy, Spin Gold & MBM Bet. Always play responsibly."
        />
        <meta property="og:image" content="https://img.yonostore.app/logo/free-yono-rummy.webp" />
        <meta property="og:url" content="https://freeyonorummy.com/disclaimer" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Disclaimer | Free Yono Rummy" />
        <meta
          name="twitter:description"
          content="Important disclaimer from Free Yono Rummy regarding our platform and the apps we list. Play responsibly and stay informed."
        />
        <meta name="twitter:image" content="https://img.yonostore.app/logo/free-yono-rummy.webp" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Disclaimer | Free Yono Rummy",
              url: "https://freeyonorummy.com/disclaimer",
              description:
                "Official disclaimer of Free Yono Rummy explaining our independent role in providing information about real-cash games like Yono Rummy, MBM Bet & Spin Gold.",
              publisher: {
                "@type": "Organization",
                name: "Free Yono Rummy",
                logo: "https://img.yonostore.app/logo/free-yono-rummy.webp",
                url: "https://freeyonorummy.com",
              },
            }),
          }}
        />
      </Head>

      <Disclaimer />
    </>
  );
}