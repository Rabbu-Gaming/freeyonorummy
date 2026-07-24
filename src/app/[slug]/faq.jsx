"use client";

import { useState, useRef, useEffect } from "react";

function PlusMinusIcon({ open }) {
  return (
    <span className="relative w-[16px] h-[16px] shrink-0">
      <span className={`absolute inset-0 flex items-center justify-center text-[16px] leading-none transition-transform duration-200 ${open ? "rotate-180 opacity-0" : "opacity-100"}`}>+</span>
      <span className={`absolute inset-0 flex items-center justify-center text-[16px] leading-none transition-transform duration-200 ${open ? "opacity-100" : "opacity-0"}`}>−</span>
    </span>
  );
}

function parseInline(text) {
  if (!text) return null;
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-bold text-gray-900">
          {match[1]}
        </strong>
      );
    } else {
      const isExternal = /^https?:\/\//.test(match[3]);
      nodes.push(
        <a
          key={key++}
          href={match[3]}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-semibold text-green-700 underline underline-offset-2 decoration-green-300 hover:decoration-green-600 transition-colors"
        >
          {match[2]}
        </a>
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function FAQItem({ item, index, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [item.a]);

  return (
    <div
      className={`rounded-[10px] border-l-4 bg-gray-50 transition-colors duration-200 ${isOpen ? "border-green-700 bg-green-50/40" : "border-gray-200"}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-1 rounded-[10px]"
      >
        <span className="text-[13px] font-bold text-gray-900 leading-snug" itemProp="name">
          {String(index + 1).padStart(2, "0")}. {item.q}
        </span>
        <span className={`shrink-0 mt-0.5 transition-colors duration-200 ${isOpen ? "text-green-700" : "text-gray-400"}`}>
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
        <div ref={bodyRef} className="px-4 pb-4" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
          <p className="text-[13px] text-gray-600 leading-relaxed" itemProp="text">
            {parseInline(item.a)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AppFAQ({ faqItems }) {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (i) => setOpenFAQ((prev) => (prev === i ? null : i));

  if (!faqItems || faqItems.length === 0) return null;

  return (
    <section
      className="w-full bg-white px-4 pb-10 flex justify-center"
      aria-labelledby="app-faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="w-full max-w-[900px]">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 id="app-faq-heading" className="text-[16px] font-bold text-gray-900 mb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-[12px] text-gray-600">
              Straight answers about the app, bonuses, and downloads.
            </p>
          </div>
          <span className="hidden sm:inline text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            {faqItems.length} Questions
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {faqItems.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openFAQ === i}
              onToggle={() => toggleFAQ(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}