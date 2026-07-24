'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import appsData from "../data/apps.json";
import SearchBar, { fuzzyMatch } from "./styles/search";
import { CloudDownloadIcon } from "./styles/icons";

function getBaseName(name) {
  if (!name) return "";
  return name
    .replace(/[\d₹.,]+/g, "")
    .trim()
    .toLowerCase()
    .split(" ")[0];
}

function nameSimilarity(a, b) {
  const normalize = str => str.toLowerCase().replace(/[^a-z0-9]/g, " ").trim().split(/\s+/);
  const wordsA = normalize(a);
  const wordsB = new Set(normalize(b));
  const common = wordsA.filter(w => wordsB.has(w)).length;
  const aLow = a.toLowerCase();
  const bLow = b.toLowerCase();
  return common * 3 + (aLow.includes(bLow) || bLow.includes(aLow) ? 5 : 0);
}

function formatCurrency(val) {
  if (val === undefined || val === null) return "";
  const s = String(val).trim();
  if (!s) return "";
  return s.startsWith("₹") ? s : `₹${s}`;
}

function isUpcoming(app) {
  return app.upcoming === "yes";
}

export default function SuggestedApps({ currentSlug }) {
  const [query, setQuery] = useState("");

  const relatedApps = useMemo(() => {
    const currentApp = appsData.find((app) => app.slug === currentSlug);
    const currentBaseName = getBaseName(currentApp?.name);

    const matched = [];
    const others = [];

    for (const app of appsData) {
      if (app.slug === currentSlug) continue;
      if (getBaseName(app.name) === currentBaseName) {
        matched.push(app);
      } else {
        others.push(app);
      }
    }

    let result = matched.slice(0, 18);

    if (result.length < 18) {
      const needed = 18 - result.length;
      const currentName = currentApp?.name || "";

      const scored = others.map((app) => ({
        app,
        score: nameSimilarity(currentName, app.name),
      }));

      scored.sort((a, b) => b.score - a.score);

      result = [...result, ...scored.slice(0, needed).map((s) => s.app)];
    }

    return result;
  }, [currentSlug]);

  const filteredApps = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return relatedApps;
    return appsData.filter(
      (app) => app.slug !== currentSlug && fuzzyMatch(trimmed, app.name)
    );
  }, [query, relatedApps, currentSlug]);

  return (
    <section className="w-full bg-white px-4 pt-5 pb-4 flex justify-center">
      <div className="w-full max-w-[900px]">
        <div className="flex justify-center mb-6">
          <div className="relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200 shadow-[0_2px_10px_rgba(4,120,87,0.08)]">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-emerald-600" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-l-full bg-emerald-600" />
            <h2 className="text-[13px] font-extrabold text-emerald-800 tracking-[0.08em] uppercase">
              {query.trim() ? `Results for "${query.trim()}"` : "Related Apps"}
            </h2>
          </div>
        </div>

        <div className="mb-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {filteredApps.map((app) => (
              <Link
                key={app.slug}
                href={`/${app.slug}`}
                className="flex flex-col items-center text-center px-2 py-3 bg-white rounded-2xl border border-gray-200 shadow-sm no-underline"
              >
                <Image
                  src={app.image}
                  alt={`${app.name} – download bonus ₹${app.signupBonus || "N/A"}`}
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
  );
}