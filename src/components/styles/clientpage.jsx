"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import appsData from "../../data/apps.json";
import SearchBar, { fuzzyMatch } from "./search";
import { CloudDownloadIcon } from "./icons";

function formatCurrency(val) {
  if (val === undefined || val === null) return "";
  const s = String(val).trim();
  if (!s) return "";
  return s.startsWith("₹") ? s : `₹${s}`;
}

function isUpcoming(app) {
  return app.upcoming === "yes";
}

function SectionHeading({ title }) {
  return (
    <div className="inline-block mb-4">
      <h2 className="text-[19px] sm:text-[24px] font-extrabold text-gray-900 leading-tight">
        {title}
      </h2>
      <div className="h-[3px] w-14 mt-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-amber-500" />
    </div>
  );
}

function PlusMinusIcon({ open }) {
  return (
    <span className="relative w-[16px] h-[16px] shrink-0">
      <span
        className={`absolute inset-0 flex items-center justify-center text-[16px] leading-none transition-transform duration-200 ${
          open ? "rotate-180 opacity-0" : "opacity-100"
        }`}
      >
        +
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center text-[16px] leading-none transition-transform duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        −
      </span>
    </span>
  );
}

function FAQAccordionItem({ item, index, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [item.a, isOpen]);

  return (
    <div
      className={`rounded-[10px] border-l-4 bg-white transition-colors duration-200 ${
        isOpen ? "border-emerald-600 shadow-sm" : "border-gray-200"
      }`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1 rounded-[10px]"
      >
        <span className="text-[13px] font-bold text-gray-900 leading-snug" itemProp="name">
          {String(index + 1).padStart(2, "0")}. {item.q}
        </span>
        <span
          className={`shrink-0 mt-0.5 transition-colors duration-200 ${
            isOpen ? "text-emerald-700" : "text-gray-400"
          }`}
        >
          <PlusMinusIcon open={isOpen} />
        </span>
      </button>
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: "hidden",
          transition: "height 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden={!isOpen}
      >
        <div
          ref={bodyRef}
          className="px-4 pb-4"
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <p className="text-[13px] text-gray-600 leading-relaxed" itemProp="text">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQSection({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items?.length) return null;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 shrink-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-600"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <SectionHeading title="Frequently Asked Questions" />
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <FAQAccordionItem
            key={index}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ClientPage({ h1, subText, h2, apps, current, content }) {
  const [query, setQuery] = useState("");

  const sourceApps = apps || appsData;

  const filteredApps = query.trim()
    ? sourceApps.filter((app) => fuzzyMatch(query, app.name))
    : sourceApps;

  const navLinks = [
    { key: "all", label: "All Yono Games", href: "/category/all-yono-games" },
    { key: "new", label: "New Yono Apps", href: "/category/new-yono-apps" },
  ];

  return (
    <>
      <section className="relative w-full bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 px-3 pt-6 sm:pt-8 pb-6 flex flex-col items-center overflow-hidden">
        <div className="absolute -right-10 -top-16 w-44 h-44 rounded-full bg-white/10"></div>
        <div className="absolute -left-12 -bottom-16 w-36 h-36 rounded-full bg-white/10"></div>
        <div className="relative w-full max-w-[900px]">
          <div className="text-center mb-5">
            <h1 className="text-[22px] sm:text-[28px] font-extrabold text-white leading-tight mb-2 tracking-tight">
              {h1}
            </h1>
            <p className="text-[12.5px] sm:text-[13.5px] text-emerald-50 font-normal max-w-[260px] mx-auto leading-relaxed">
              {subText}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              {navLinks.map((link) =>
                link.key === current ? (
                  <Link
                    key={link.key}
                    href="/"
                    className="px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-[10.5px] font-bold text-white backdrop-blur-sm no-underline"
                  >
                    Home
                  </Link>
                ) : (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-[10.5px] font-bold text-white backdrop-blur-sm no-underline"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-[900px] px-1">
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
                {query.trim() ? `Results for "${query.trim()}"` : h2}
              </h2>
            </div>
          </div>

          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
              {filteredApps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/${app.slug}`}
                  className="flex flex-col items-center text-center px-2 py-3 bg-white rounded-2xl border border-gray-200 shadow-sm no-underline"
                >
                  <img
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

      {content && (
        <section className="w-full bg-white px-4 py-10 flex justify-center">
          <div className="w-full max-w-[900px]">
            {content.intro && (
              <p className="text-[13px] sm:text-[14px] text-gray-700 leading-relaxed mb-8">
                {content.intro}
              </p>
            )}

            {content.highlights && content.highlights.length > 0 && (
              <div className="mb-10">
                <SectionHeading title="Why Players Trust This List" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {content.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-emerald-100 bg-white px-4 py-4 shadow-sm"
                    >
                      <h3 className="text-[12.5px] font-bold text-emerald-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.sections && content.sections.length > 0 && (
              <div className="mb-10 flex flex-col gap-8">
                {content.sections.map((sec, idx) => (
                  <div key={idx}>
                    <SectionHeading title={sec.heading} />
                    <p className="text-[13px] text-gray-700 leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {content.faqs && content.faqs.length > 0 && (
              <FAQSection items={content.faqs} />
            )}
          </div>
        </section>
      )}
    </>
  );
}