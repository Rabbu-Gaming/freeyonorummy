import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export const metadata = {
  title: "Yono All Games – Rummy, Slots & Bonus Reward Apps",
  description:
    "Explore Yono All Games – your directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & download links.",
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
        alt: "Yono All Games Game Banner"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Yono All Games – Rummy, Slots & Bonus Reward Apps",
    description:
      "Explore Yono All Games – your directory for Yono apps, Rummy, Slots & Bonus rewards. Find all Yono games with reviews, ratings & download links.",
    images: ["https://img.yonoallgames.app/logo/yono-all-games.webp"],
    site: "@yonoallgames"
  },
  metadataBase: new URL("https://yonoallgames.app")
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