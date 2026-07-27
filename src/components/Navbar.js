'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  {
    href: "/blog",
    label: "Blogs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    href: "/disclaimer",
    label: "Disclaimer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    href: "/privacy",
    label: "Privacy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[1250] bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 shadow-md">
      <div className="max-w-[60rem] mx-auto px-6 lg:px-8">
        <div className="h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:ml-0 ml-[-8px] shrink-0">
            <span className="relative flex items-center justify-center w-7 h-7 shrink-0">
              <img
                src="https://img.yonostore.app/logo/free-yono-rummy.webp"
                alt="Free Yono Rummy Logo"
                width="28"
                height="28"
                loading="eager"
                fetchPriority="high"
                className="w-7 h-7 object-contain"
              />
            </span>
            <span className="font-bold text-base leading-none tracking-tight whitespace-nowrap text-white">
              Free Yono Rummy
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-1">
              {links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="relative px-3 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 md:mr-0 mr-[-8px]">
            <a
              href="https://t.me/+wsvobC6WazRiOWVl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M21.05 2.927a1.5 1.5 0 0 0-1.523-.255L2.6 9.24a1.35 1.35 0 0 0 .098 2.54l4.35 1.4 1.68 5.4a1.2 1.2 0 0 0 1.96.51l2.42-2.17 4.29 3.17a1.35 1.35 0 0 0 2.14-.82l3.03-14.3a1.5 1.5 0 0 0-.46-1.443zM9.6 13.9l-1.02 4.02-1.02-3.9 10.5-7.02z" />
              </svg>
              <span className="leading-none">Join</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col items-center justify-center w-7 h-7"
            >
              <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block w-4 h-0.5 bg-white rounded-full my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed top-12 left-0 right-0 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 shadow-xl z-[1249] transition-all duration-300 ease-out overflow-hidden ${isOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="max-w-[60rem] mx-auto px-6 py-6">
          <div className="flex flex-col gap-1">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-4 py-4 px-5 hover:bg-white/10 rounded-2xl transition-all text-white"
              >
                <span className="flex items-center justify-center w-9 h-9 bg-white/20 text-white rounded-2xl group-hover:bg-white/30 transition-colors">
                  {link.icon}
                </span>
                <span className="text-[15px] font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;