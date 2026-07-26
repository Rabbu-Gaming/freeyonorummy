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
        url: "https://img.yonostore.app/logo/free-yono-rummy.webp",
        sizes: "32x32",
        type: "image/webp"
      },
      {
        url: "https://img.yonostore.app/logo/free-yono-rummy.webp",
        sizes: "192x192",
        type: "image/webp"
      }
    ],
    apple: "https://img.yonostore.app/logo/free-yono-rummy.webp"
  },
  openGraph: {
    title: "Free Yono Rummy – Rummy, Slots & Bonus Reward Apps",
    description:
      "Explore Free Yono Rummy – your directory for Free Yono apps, Rummy, Slots & Bonus rewards. Find all Free Yono games with reviews, ratings & download links.",
    url: "https://freeyonorummy.com/",
    siteName: "Free Yono Rummy",
    images: [
      {
        url: "https://img.yonostore.app/logo/free-yono-rummy.webp",
        width: 1200,
        height: 630,
        alt: "Free Yono Rummy Game Logo"
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
    images: ["https://img.yonostore.app/logo/free-yono-rummy.webp"],
    site: "@freeyonorummy"
  },
  metadataBase: new URL("https://freeyonorummy.com/")
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