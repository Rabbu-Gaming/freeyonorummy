'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaInfoCircle, FaExclamationCircle, FaShieldAlt, FaTelegramPlane, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }
  }, [isOpen]);

  const links = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/about", label: "About", icon: FaInfoCircle },
    { href: "/disclaimer", label: "Disclaimer", icon: FaExclamationCircle },
    { href: "/contact", label: "Contact", icon: FaInfoCircle },
    { href: "/privacy", label: "Privacy", icon: FaShieldAlt },
  ];

  const mainLinks = links.slice(0, 3);
  const legalLinks = links.slice(3);

  return (
    <nav className="fixed top-0 left-0 w-full z-[1250] bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 shadow-md">
      <div className="max-w-[60rem] mx-auto px-6 lg:px-8">
        <div className="h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:ml-0 ml-[-8px] shrink-0">
            <span className="relative flex items-center justify-center w-7 h-7 shrink-0">
              <img
                src="https://img.yonoallgames.app/logo/yono-all-games.webp"
                alt="Yono All Games Logo"
                width="28"
                height="28"
                loading="eager"
                fetchPriority="high"
                className="w-7 h-7 object-contain"
              />
            </span>
            <span className="font-bold text-base leading-none tracking-tight whitespace-nowrap text-white">
              Yono All Games
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-1">
              {mainLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="relative px-3 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="relative group">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  More
                  <FaChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 py-2 w-52">
                    {legalLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="block px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4 md:mr-0 mr-[-8px]">
            <a
              href="https://t.me/newyonogameshub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all duration-200"
            >
              <FaTelegramPlane className="text-base" />
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
                  <link.icon className="w-5 h-5" />
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