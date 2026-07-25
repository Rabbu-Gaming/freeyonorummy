import Link from "next/link";

function SparkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/category/all-yono-games", label: "All Yono Games" },
  { href: "/category/new-yono-apps", label: "New Yono Apps" },
  { href: "/blog", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white flex flex-col items-center">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="w-full flex justify-center px-4 pt-8">
        <div className="relative w-full max-w-[900px] rounded-[18px] border border-green-200 bg-gradient-to-br from-green-50 to-white px-5 py-7 sm:px-8 overflow-hidden">
          <div className="absolute -right-10 -top-14 w-40 h-40 rounded-full bg-green-100/40"></div>
          <div className="absolute -left-12 -bottom-16 w-36 h-36 rounded-full bg-green-100/30"></div>

          <div className="relative flex flex-col items-center gap-6">

            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1.5">
                <img
                  src="https://img.yonoallgames.app/logo/yono-all-games.webp"
                  alt="Free Yono Rummy"
                  width={30}
                  height={30}
                  loading="lazy"
                  className="object-contain"
                />
                <span className="text-[17px] font-extrabold tracking-wide text-gray-900">
                  Yono<span className="text-green-700">Rummy</span><span className="text-blue-700">Home</span>
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 mt-1">
                <SparkIcon />
                Verified Gaming Apps
              </span>
            </div>

            <p className="text-[12px] text-gray-600 text-center leading-relaxed max-w-[340px]">
              Yono Rummy Home curates reliable Teen Patti, Rummy & Slots apps, each backed by genuine bonus offers so you can play on Android with confidence.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[11px] font-semibold text-gray-700 bg-white/70 border border-gray-200 rounded-full px-3 py-1.5 hover:border-green-400 hover:text-green-700 hover:bg-white transition-colors duration-150"
                >
                  {l.label}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-500 text-center py-6">
        © 2026 Free Yono Rummy. All rights reserved.
      </p>

    </footer>
  );
}