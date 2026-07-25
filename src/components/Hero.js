"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appsData from "../data/apps.json";
import SearchBar, { fuzzyMatch } from "../components/styles/search";
import { CloudDownloadIcon } from "../components/styles/icons";

function formatCurrency(val) {
  if (val === undefined || val === null) return "";
  const s = String(val).trim();
  if (!s) return "";
  return s.startsWith("₹") ? s : `₹${s}`;
}

function isUpcoming(app) { 
  return app.upcoming === "yes";
}

export default function Home() {
  const [query, setQuery] = useState("");

  const featuredApps = appsData.slice(0, 3);
  const baseList = appsData.slice(3);
  const remainingApps = query.trim()
    ? baseList.filter((app) => fuzzyMatch(query, app.name))
    : baseList;

  return (
    <>
      <section className="relative w-full bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 px-3 pt-6 sm:pt-8 pb-6 flex flex-col items-center overflow-hidden">
        <div className="absolute -right-10 -top-16 w-44 h-44 rounded-full bg-white/10"></div>
        <div className="absolute -left-12 -bottom-16 w-36 h-36 rounded-full bg-white/10"></div>
        <div className="relative w-full max-w-[900px]">
          <div className="text-center mb-5">
            <h1 className="text-[22px] sm:text-[28px] font-extrabold text-white leading-tight mb-2 tracking-tight">
              All Verified Yono Games Apps
            </h1>
            <p className="text-[12.5px] sm:text-[13.5px] text-emerald-50 font-normal max-w-[260px] mx-auto leading-relaxed">
              Download trusted Yono Games apps with instant signup bonus and easy withdrawals. 100% Safe for 2026.
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Link
                href="/category/all-yono-games"
                className="px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-[10.5px] font-bold text-white backdrop-blur-sm no-underline"
              >
                All Yono Apps
              </Link>
              <Link
                href="/category/new-yono-apps"
                className="px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-[10.5px] font-bold text-white backdrop-blur-sm no-underline"
              >
                New Yono Apps
              </Link>
            </div>
          </div>

          <div className="flex items-end justify-center gap-2 sm:gap-6">
            {featuredApps.map((app, idx) => {
              const isCenter = idx === 1;
              const isPriority = idx === 0 || isCenter;
              return (
                <Link
                  key={app.slug}
                  href={`/${app.slug}`}
                  className={[
                    "flex flex-col items-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm shadow-lg min-w-0",
                    isCenter
                      ? "flex-1 max-w-[130px] px-2 pt-3.5 pb-3 scale-105 z-10 bg-white/15 border-white/30 shadow-xl"
                      : "flex-1 max-w-[105px] px-1.5 pt-2.5 pb-2.5",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-md",
                      isCenter ? "w-[60px] h-[60px] sm:w-[72px] sm:h-[72px]" : "w-[46px] h-[46px] sm:w-[56px] sm:h-[56px]",
                    ].join(" ")}
                  >
                    <Image
                      src={app.image}
                      alt={app.name}
                      width={isCenter ? 72 : 56}
                      height={isCenter ? 72 : 56}
                      priority={isPriority}
                      loading={isPriority ? "eager" : "lazy"}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p
                    className={[
                      "mt-2 font-bold text-white text-center leading-snug line-clamp-2",
                      isCenter ? "text-[12px] sm:text-[13.5px]" : "text-[9.5px] sm:text-[11px]",
                    ].join(" ")}
                  >
                    {app.name}
                  </p>
                  <div className={["flex flex-col items-center gap-[2px] mt-1", isCenter ? "min-h-[26px]" : "min-h-[22px]"].join(" ")}>
                    {app.signupBonus && (
                      <p className={["font-bold text-yellow-300 whitespace-nowrap", isCenter ? "text-[9.5px]" : "text-[8px]"].join(" ")}>
                        Bonus: {formatCurrency(app.signupBonus)}
                      </p>
                    )}
                    {app.minWithdraw && (
                      <p className={["font-semibold text-emerald-100 whitespace-nowrap", isCenter ? "text-[9.5px]" : "text-[8px]"].join(" ")}>
                        Min Withdrawal {formatCurrency(app.minWithdraw)}
                      </p>
                    )}
                  </div>
                  <span
                    className={[
                      "mt-2.5 w-full flex items-center justify-center gap-1 rounded-lg font-bold text-emerald-800 bg-white shadow-sm",
                      isCenter ? "py-[6.5px] text-[10.5px]" : "py-[5px] text-[9px]",
                    ].join(" ")}
                  >
                    {isUpcoming(app) ? (
                      "Coming Soon"
                    ) : (
                      <>
                        <CloudDownloadIcon className={isCenter ? "w-[12px] h-[12px]" : "w-[10px] h-[10px]"} />
                        Download
                      </>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="relative w-full max-w-[900px] px-1 mt-5">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </section>

      <section className="w-full bg-white px-4 pt-5 pb-8 flex justify-center">
        <div className="w-full max-w-[900px]">
          <div className="flex justify-center mb-6">
            <div className="relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200 shadow-[0_2px_10px_rgba(4,120,87,0.08)]">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-emerald-600" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-l-full bg-emerald-600" />
              <h2 className="text-[13px] font-extrabold text-emerald-800 tracking-[0.08em] uppercase">
                {query.trim() ? `Results for "${query.trim()}"` : "All Yono Apps"}
              </h2>
            </div>
          </div>

          {remainingApps.length > 0 ? (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
              {remainingApps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/${app.slug}`}
                  className="flex flex-col items-center text-center px-2 py-3 bg-white rounded-2xl border border-gray-200 shadow-sm no-underline"
                >
                  <Image
                    src={app.image}
                    alt={app.name}
                    width={52}
                    height={52}
                    loading="lazy"
                    className="w-[52px] h-[52px] object-contain rounded-xl border border-gray-200"
                  />
                  <div className="flex flex-col flex-1 items-center w-full">
                    <h3 className="mt-2 text-[11.5px] font-bold text-gray-900 leading-snug line-clamp-2">
                      {app.name}
                    </h3>
                    <div className="flex flex-col items-center gap-[2px] mt-1">
                      {app.signupBonus && (
                        <p className="text-[9px] font-bold text-red-700 whitespace-nowrap">
                          Bonus: {formatCurrency(app.signupBonus)}
                        </p>
                      )}
                      {app.minWithdraw && (
                        <p className="text-[9px] font-semibold text-green-700 whitespace-nowrap">
                          Min Withdrawal: {formatCurrency(app.minWithdraw)}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="mt-2 w-full flex items-center justify-center gap-1 rounded-lg px-1.5 py-1.5 text-[9.5px] font-bold text-white bg-emerald-700 whitespace-nowrap">
                    {isUpcoming(app) ? (
                      "Soon"
                    ) : (
                      <>
                        <CloudDownloadIcon className="w-[9px] h-[9px]" />
                        Download
                      </>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No apps found</p>
              <p className="text-xs text-gray-500 mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}