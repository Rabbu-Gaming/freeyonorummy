"use client";

import { useState, useEffect, useMemo, useRef } from "react";

export function fuzzyMatch(query, text) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

const PLACEHOLDER_WORDS = [
  "Search yono game apps...",
  "All yono yono apps...",
  "Search All yono Games apps...",
  "Joy Rummy...",
  "Yono Rummy...",
  "Jaiho 777..."
];

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ClearIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default function SearchBar({ value, onChange, placeholder }) {
  const [typed, setTyped] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const timeoutRef = useRef(null);

  const words = useMemo(
    () => (placeholder ? [placeholder, ...PLACEHOLDER_WORDS.slice(1)] : PLACEHOLDER_WORDS),
    [placeholder]
  );

  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (value || isFocused || !isPageVisible) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 30;
    const HOLD_TIME = 1600;
    const GAP_TIME = 300;

    const tick = () => {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        charIndex++;
        setTyped(currentWord.slice(0, charIndex));

        if (charIndex === currentWord.length) {
          isDeleting = true;
          timeoutRef.current = setTimeout(tick, HOLD_TIME);
          return;
        }
        timeoutRef.current = setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        setTyped(currentWord.slice(0, charIndex));

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timeoutRef.current = setTimeout(tick, GAP_TIME);
          return;
        }
        timeoutRef.current = setTimeout(tick, DELETE_SPEED);
      }
    };

    timeoutRef.current = setTimeout(tick, GAP_TIME);

    return () => clearTimeout(timeoutRef.current);
  }, [value, isFocused, isPageVisible, words]);

  useEffect(() => {
    if (value || isFocused) setTyped("");
  }, [value, isFocused]);

  return (
    <div className="relative mb-3">
      <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${isFocused ? "text-green-700" : "text-gray-400"}`}>
        <SearchIcon />
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? "Search yono game apps..." : ""}
        aria-label="Search yono game apps"
        className="w-full bg-white border border-gray-200 rounded-[14px] pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-500 outline-none shadow-sm hover:border-gray-300 focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(21,128,61,0.12)] focus:bg-white transition-all duration-200 ease-out"
      />

      {!value && !isFocused && (
        <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-4rem)] flex items-center">
          {typed}
          <span className="inline-block w-[1px] h-[17px] bg-gray-400 ml-[1px] animate-[blink_1.1s_step-end_infinite]" />
        </span>
      )}

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer bg-transparent border-none p-1 rounded-full transition-colors duration-150"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
}