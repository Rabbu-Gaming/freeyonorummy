import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export const metadata = {
  title: "Free Yono Rummy – Rummy, Slots & Bonus Reward Apps",
  description:
    "Explore Free Yono Rummy – your directory for Free Yono apps, Rummy, Slots & Bonus rewards. Find all Free Yono games with reviews, ratings & download links.",
  icons: {
    icon: [
      {
        url: "https://img.yonoallgames.app/logo/yono-all-games.webp",
        sizes: "32x32",
        type: "image/webp"
      },
      {
        url: "https://img.yonoallgames.app/logo/yono-all-games.webp",
        sizes: "192x192",
        type: "image/webp"
      }
    ],
    apple: "https://img.yonoallgames.app/logo/yono-all-games.webp"
  },
  openGraph: {
    title: "Free Yono Rummy – Rummy, Slots & Bonus Reward Apps",
    description:
      "Explore Free Yono Rummy – your directory for Free Yono apps, Rummy, Slots & Bonus rewards. Find all Free Yono games with reviews, ratings & download links.",
    url: "https://freeyonorummy.com",
    siteName: "Free Yono Rummy",
    images: [
      {
        url: "https://img.yonoallgames.app/logo/yono-all-games.webp",
        width: 1200,
        height: 630,
        alt: "Yono All Games Game Banner"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Yono Rummy – Rummy, Slots & Bonus Reward Apps",
    description:
      "Explore Free Yono Rummy – your directory for Free Yono apps, Rummy, Slots & Bonus rewards. Find all Free Yono games with reviews, ratings & download links.",
    images: ["https://img.yonoallgames.app/logo/yono-all-games.webp"],
    site: "@yonoallgames"
  },
  metadataBase: new URL("https://freeyonorummy.com")
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-12 bg-[#fff] text-[#111]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}