'use client';
import { useState, useEffect, useRef } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  if (pros.length === 0 && cons.length === 0) return null;

  const [activeTab, setActiveTab] = useState<"pros" | "cons">("pros");
  const prosRef = useRef<HTMLDivElement>(null);
  const consRef = useRef<HTMLDivElement>(null);
  const [equalHeight, setEqualHeight] = useState<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setEqualHeight(undefined);
      return;
    }
    if (prosRef.current && consRef.current) {
      const prosH = prosRef.current.offsetHeight;
      const consH = consRef.current.offsetHeight;
      setEqualHeight(Math.max(prosH, consH));
    }
  }, [pros, cons, isMobile]);

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(https?:\/\/[^\s\)]+\))/g);

    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
        return <em key={idx} className="italic text-gray-800">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("[") && part.includes("](")) {
        const match = part.match(/\[(.*?)\]\((https?:\/\/[^\s\)]+)\)/);
        if (match) {
          const [, label, url] = match;
          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline underline-offset-2"
            >
              {label}
            </a>
          );
        }
      }
      return part;
    });
  };

  return (
    <div className="my-8 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="md:hidden flex items-center gap-1 p-1.5 m-3 rounded-full bg-gray-100">
        <button
          onClick={() => setActiveTab("pros")}
          className={`flex-1 py-2 text-center text-sm font-semibold rounded-full ${
            activeTab === "pros" ? "bg-white text-emerald-700" : "text-gray-500"
          }`}
        >
          Pros
        </button>
        <button
          onClick={() => setActiveTab("cons")}
          className={`flex-1 py-2 text-center text-sm font-semibold rounded-full ${
            activeTab === "cons" ? "bg-white text-red-600" : "text-gray-500"
          }`}
        >
          Cons
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className={`${activeTab === "pros" ? "block" : "hidden md:block"} md:border-r md:border-gray-200`}
          style={{ height: !isMobile && equalHeight ? `${equalHeight}px` : undefined }}
        >
          {pros.length > 0 && (
            <div ref={prosRef} className="p-4 sm:p-5 h-full">
              <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 mb-3">
                Pros
              </p>
              <ul className="divide-y divide-gray-100">
                {pros.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 py-2 text-sm text-gray-700">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center">
                      <FaCheck className="w-2 h-2 text-emerald-600" />
                    </span>
                    <span>{renderFormattedText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          className={`${activeTab === "cons" ? "block" : "hidden md:block"}`}
          style={{ height: !isMobile && equalHeight ? `${equalHeight}px` : undefined }}
        >
          {cons.length > 0 && (
            <div ref={consRef} className="p-4 sm:p-5 h-full">
              <p className="text-[11px] font-bold uppercase tracking-wide text-red-600 mb-3">
                Cons
              </p>
              <ul className="divide-y divide-gray-100">
                {cons.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 py-2 text-sm text-gray-700">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-red-50 flex items-center justify-center">
                      <FaXmark className="w-2 h-2 text-red-600" />
                    </span>
                    <span>{renderFormattedText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}