'use client';
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import AppFAQ from "./faq";
import ContentRenderer from "./ContentRenderer";
import SuggestedApps from "../../components/suggested";
import Disclaimer from "../../components/disclaimer";
import FloatButton from "./floatbutton";
import {
  GiftIcon,
  WalletSimpleIcon,
  CloudDownloadIcon,
  StarFilledIcon,
  StarOutlineIcon,
  ShieldIcon,
  TelegramPlaneIcon,
  VerifiedIcon,
} from "../../components/styles/icons";
const inter = Inter({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
export default function ClientAppPage({ appData }) {
  const timerRef = useRef(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  if (!appData) {
    return (
      <div className="w-full text-center py-16 text-gray-600" aria-live="polite">
        App not found
      </div>
    );
  }
  const {
    slug,
    image,
    signupBonus = "N/A",
    minWithdraw = "N/A",
    totalDownloads = "0",
    rating = "N/A",
    downloadLink,
    description = "No description available.",
    content,
    faqItems = [],
    upcoming,
    size,
    version,
  } = appData;
  const isUpcoming =
    upcoming === true ||
    (typeof upcoming === "string" && upcoming.trim().toLowerCase() === "yes");
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const stars = parseFloat(rating) || 0;
  const telegramWebUrl = "https://t.me/+wsvobC6WazRiOWVl";

  const openTelegram = (e) => {
    e.preventDefault();
    window.location.href = telegramWebUrl;
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    operatingSystem: "ANDROID",
    applicationCategory: "GameApplication",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stars.toString(),
      reviewCount: (parseFloat(totalDownloads) * 1000).toFixed(0),
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    downloadUrl: downloadLink,
    description,
    image,
    ...(version ? { softwareVersion: version } : {}),
    ...(size ? { fileSize: `${size}MB` } : {}),
  };
  const primaryStats = [
    { Icon: GiftIcon, label: "Signup Bonus", value: signupBonus },
    { Icon: WalletSimpleIcon, label: "Min Withdraw", value: minWithdraw },
  ];
  const secondaryStats = [
    { Icon: CloudDownloadIcon, label: "Downloads", value: `${totalDownloads}M+` },
  ];
  if (size) {
    secondaryStats.push({ Icon: CloudDownloadIcon, label: "Size", value: `${size} MB` });
  }
  if (version) {
    secondaryStats.push({ Icon: ShieldIcon, label: "Version", value: version });
  }
  const secondaryColsClass =
    secondaryStats.length === 3 ? "grid-cols-3" : secondaryStats.length === 2 ? "grid-cols-2" : "grid-cols-1";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-white flex flex-col">
        <section className="relative w-full bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 pt-6 pb-7 px-4 sm:px-6 overflow-hidden">
          <div className="absolute -right-10 -top-16 w-44 h-44 rounded-full bg-white/10"></div>
          <div className="absolute -left-12 -bottom-16 w-36 h-36 rounded-full bg-white/10"></div>
          <div className="relative w-full max-w-[900px] mx-auto">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="shrink-0 relative">
                <div className="relative p-[3px] rounded-2xl bg-white/20">
                  <Image
                    src={image}
                    alt={name}
                    width={112}
                    height={112}
                    priority
                    fetchPriority="high"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-[13px] object-cover bg-white"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/30">
                  <VerifiedIcon className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white">
                    Verified Listing
                  </span>
                </span>
                <h1 className={`text-[19px] sm:text-[26px] font-extrabold text-white leading-tight tracking-tight ${inter.className}`}>
                  {name}
                </h1>
                <p className="text-[11px] sm:text-[12.5px] font-medium text-emerald-50 leading-tight">
                  Download Latest {name} APK
                </p>
                <div className="flex items-center justify-center gap-0.5 mt-1" aria-label={`Rating: ${stars} out of 5`}>
                  {[...Array(5)].map((_, i) =>
                    i < Math.round(stars) ? (
                      <StarFilledIcon key={i} className="w-3.5 h-3.5 text-yellow-300" />
                    ) : (
                      <StarOutlineIcon key={i} className="w-3.5 h-3.5 text-white/30" />
                    )
                  )}
                  <span className="text-[11px] font-bold text-white/80 ml-1.5">{stars}/5</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              {primaryStats.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="relative bg-white/10 border border-white/20 rounded-xl px-3 py-3 flex items-center gap-2.5 transition-colors duration-150 hover:bg-white/15"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-white shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex flex-col items-start leading-tight min-w-0">
                    <span className={`text-[13.5px] font-extrabold text-white leading-none truncate ${inter.className}`}>
                      {value}
                    </span>
                    <span className="text-[8.5px] font-semibold text-emerald-50 uppercase tracking-wider leading-tight mt-1">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={`grid ${secondaryColsClass} gap-2 mt-2`}>
              {secondaryStats.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="relative bg-white/10 border border-white/20 rounded-lg px-2 py-2 flex flex-col items-center gap-1 transition-colors duration-150 hover:bg-white/15"
                >
                  <span className="flex items-center justify-center text-emerald-50">
                    <Icon className="w-3 h-3" />
                  </span>
                  <span className={`text-[11px] font-bold text-white leading-none text-center ${inter.className}`}>
                    {value}
                  </span>
                  <span className="text-[7.5px] font-semibold text-emerald-50 uppercase tracking-wider text-center leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {isUpcoming ? (
                <span
                  aria-disabled="true"
                  aria-label={`${name} APK coming soon`}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 text-white/70 text-[13px] font-bold rounded-xl bg-white/10 border border-white/30 cursor-not-allowed ${inter.className}`}
                >
                  Coming Soon
                </span>
              ) : (
                <a
                  id="primary-download-target"
                  href={downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 text-emerald-800 text-[13px] font-bold rounded-xl bg-white shadow-sm transition-transform duration-150 active:scale-[0.98] ${inter.className}`}
                >
                  <CloudDownloadIcon className="w-4 h-4 shrink-0" />
                  <span>Download APK</span>
                </a>
              )}
              <a
                href={telegramWebUrl}
                onClick={openTelegram}
                rel="noopener noreferrer"
                aria-label="Join our Telegram channel"
                className={`flex items-center justify-center gap-2 w-full py-2.5 text-[13px] font-bold rounded-xl border border-white/30 text-white bg-white/10 transition-colors duration-150 hover:bg-white/20 ${inter.className}`}
              >
                <TelegramPlaneIcon className="w-4 h-4 shrink-0" />
                <span>Join Telegram</span>
              </a>
            </div>
            <div className="mt-3.5 bg-white/10 border border-white/20 rounded-lg px-3.5 py-3 flex gap-2.5 items-start text-left">
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-white/20 text-white shrink-0 mt-px">
                <ShieldIcon className="w-3 h-3" />
              </span>
              <p className="text-[11.5px] text-emerald-50 leading-relaxed">
                <strong className="font-bold text-white">Description: </strong>
                {description}
              </p>
            </div>
          </div>
        </section>
        <SuggestedApps currentSlug={slug} />
        {content && (
          <section className="w-full px-4 sm:px-6 pb-8">
            <div className="w-full max-w-[900px] mx-auto pt-3">
              <ContentRenderer html={content} />
            </div>
          </section>
        )}
        <AppFAQ faqItems={faqItems} />
        <Disclaimer />
      </main>
      {!isUpcoming && (
        <FloatButton
          appName={name}
          downloadLink={downloadLink}
          targetId="primary-download-target"
        />
      )}
    </>
  );
}