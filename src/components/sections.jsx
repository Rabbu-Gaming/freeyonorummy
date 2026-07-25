"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";

const FAQS = [
    {
        q: "What is Free Yono Rummy and what apps does it list?",
        a: "Free Yono Rummy is an independent directory and review platform covering Yono-branded Android gaming apps available in India. We list and compare yono apps, yono bonus apps, rummy apps, and yono games across categories including Rummy, Slots, Spin games, 777-style arcade titles, Bingo, and VIP platforms. Our goal is to give Indian players clear, accurate information so they can choose the right yono apps confidently without wading through promotional content.",
    },
    {
        q: "Are Yono games available on the Google Play Store?",
        a: "Most Yono-branded gaming apps are distributed as APK files outside the Google Play Store. To install them you need to enable Install from Unknown Sources in your Android settings under Settings then Security then Unknown Sources. Always download APKs only from the verified links listed on each app page here.",
    },
    {
        q: "Which Indian states restrict real-money skill games like Rummy?",
        a: "Real-money skill-based games such as Rummy are currently reported as restricted in Andhra Pradesh, Telangana, Tamil Nadu, Assam, Odisha, Nagaland, Sikkim, and Arunachal Pradesh. Laws in this space can change, so always confirm the regulations in your specific state before participating in any real-money game.",
    },
    {
        q: "What is the minimum withdrawal amount across Yono apps?",
        a: "The minimum withdrawal threshold across most Yono apps listed here starts at ₹100, with some premium apps setting it slightly higher. Withdrawals are typically processed via UPI, PhonePe, Paytm, or Google Pay. The exact limit for each app is shown in the table below and on each app's individual page.",
    },
    {
        q: "How does Free Yono Rummy decide which apps to list?",
        a: "Every app listed on Free Yono Rummy is evaluated on gameplay variety, sign-up bonus transparency, withdrawal reliability, user interface quality, and responsible gaming disclosures. We do not accept payment for placements. Listings reflect independent research and real player experience for yono bonus apps, rummy apps, and yono games.",
    },
    {
        q: "Is it safe to download Yono gaming APKs?",
        a: "Skill-based real-money games carry inherent financial risk. We recommend using only the sign-up bonus before depositing real money, setting a personal spending limit each session, and never chasing losses. These apps are strictly for adults aged 18 and above. If gaming is becoming compulsive please reach out to a responsible gaming helpline.",
    },
    {
        q: "How often is the Free Yono Rummy directory updated?",
        a: "We refresh listings on a rolling basis as new Yono-branded apps launch or existing versions update. Bonus figures, withdrawal limits, and download links are re-checked regularly so the information on each app page stays current rather than stale.",
    },
];

const CATEGORIES = [
    { name: "Rummy", tag: "Card" },
    { name: "Slots", tag: "Casino" },
    { name: "Spin", tag: "Luck" },
    { name: "777 Arcade", tag: "Arcade" },
    { name: "Bingo", tag: "Casual" },
    { name: "VIP", tag: "Premium" },
];

const STATS = [
    { value: "50+", label: "Apps Listed" },
    { value: "100%", label: "Independent" },
    { value: "₹100", label: "Min. Withdraw" },
    { value: "18+", label: "Age Requirement" },
];

const TRUST = [
    { text: "No paid placements", detail: "Every listing earns its spot on merit" },
    { text: "Independent listings", detail: "Zero sponsorship influence" },
    { text: "Verified download links", detail: "Checked before publishing" },
    { text: "18+ only platform", detail: "Strictly for adult players" },
];

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    );
}

function SparkIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
        </svg>
    );
}

function PlusMinusIcon({ open }) {
    return (
        <span className="relative w-[16px] h-[16px] shrink-0">
            <span className={`absolute inset-0 flex items-center justify-center text-[16px] leading-none transition-transform duration-200 ${open ? "rotate-180 opacity-0" : "opacity-100"}`}>+</span>
            <span className={`absolute inset-0 flex items-center justify-center text-[16px] leading-none transition-transform duration-200 ${open ? "opacity-100" : "opacity-0"}`}>−</span>
        </span>
    );
}

function FAQItem({ item, index, isOpen, onToggle }) {
    const bodyRef = useRef(null);
    const [height, setHeight] = useState(0);
    const skipTransition = useRef(true);

    useLayoutEffect(() => {
        if (bodyRef.current) {
            setHeight(bodyRef.current.scrollHeight);
        }
    }, [item.a, isOpen]);

    useEffect(() => {
        const el = bodyRef.current;
        if (!el || typeof ResizeObserver === "undefined") return;
        const observer = new ResizeObserver(() => {
            setHeight(el.scrollHeight);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            skipTransition.current = false;
        });
        return () => cancelAnimationFrame(id);
    }, []);

    const buttonId = `faq-button-${index}`;
    const panelId = `faq-panel-${index}`;

    return (
        <div
            className={`rounded-[10px] border-l-4 bg-gray-50 transition-colors duration-200 ${isOpen ? "border-green-700 bg-green-50/40" : "border-gray-200"}`}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
        >
            <button
                id={buttonId}
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-1 rounded-[10px]"
            >
                <span className="text-[13px] font-bold text-gray-900 leading-snug" itemProp="name">
                    {String(index + 1).padStart(2, "0")}. {item.q}
                </span>
                <span className={`shrink-0 mt-0.5 transition-colors duration-200 ${isOpen ? "text-green-700" : "text-gray-500"}`}>
                    <PlusMinusIcon open={isOpen} />
                </span>
            </button>
            <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                style={{
                    height: isOpen ? height : 0,
                    overflow: "hidden",
                    transition: skipTransition.current ? "none" : "height 0.28s cubic-bezier(0.4,0,0.2,1)",
                }}
                aria-hidden={!isOpen}
            >
                <div ref={bodyRef} className="px-4 pb-4" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-[13px] text-gray-600 leading-relaxed" itemProp="text">{item.a}</p>
                </div>
            </div>
        </div>
    );
}

export default function Sections() {
    const [openFAQ, setOpenFAQ] = useState(0);
    const toggleFAQ = (i) => setOpenFAQ((prev) => (prev === i ? null : i));

    return (
        <div className="w-full bg-white">

            <section className="w-full bg-white px-4 pt-6 pb-8 flex justify-center" aria-labelledby="about-heading">
                <div className="w-full max-w-[900px]">
                    <a href="https://yonostore.app/" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 no-underline mb-4">
                        <SparkIcon />
                        Free Yono Rummy
                    </a>

                    <h2 id="about-heading" className="text-[26px] sm:text-[32px] font-extrabold text-gray-900 leading-tight tracking-tight mb-3 max-w-[700px]">
                        One Directory for Every Yono Gaming App in India
                    </h2>

                    <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed mb-2 max-w-[680px]">
                        Free Yono Rummy independently tracks Yono-branded Android gaming apps so you don&apos;t have to dig through scattered promo pages. Every listing carries a verified download link, an honest bonus breakdown, and real withdrawal timelines for yono apps, yono bonus apps, rummy apps, and yono games alike.
                    </p>
                    <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed mb-6 max-w-[680px]">
                        As the Yono ecosystem grew through 2026, dozens of near-identical APKs flooded the space. Our editorial team filters that noise: each app here is checked for gameplay quality, payout honesty, and responsible gaming disclosures before it earns a place in the directory.
                    </p>

                    <div className="relative mb-6 rounded-[14px] bg-gradient-to-r from-green-700 to-green-600 px-5 py-5 overflow-hidden">
                        <div className="absolute -right-6 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
                        <div className="absolute -right-2 bottom-[-30px] w-20 h-20 rounded-full bg-white/10"></div>
                        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
                            {STATS.map((s, i) => (
                                <div
                                    key={s.label}
                                    className={`flex flex-col ${i !== 0 ? "sm:pl-5 sm:border-l sm:border-white/25" : ""}`}
                                >
                                    <strong className="text-[24px] sm:text-[26px] font-extrabold text-white tracking-tight leading-none">
                                        {s.value}
                                    </strong>
                                    <span className="text-[10px] font-semibold text-green-50/90 mt-1.5 uppercase tracking-wide">
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {CATEGORIES.map((c) => (
                            <div key={c.name} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-[10px] pl-3 pr-2 py-2">
                                <span className="text-[12px] font-bold text-gray-900">{c.name}</span>
                                <span className="text-[9px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-1.5 py-0.5 uppercase tracking-wide">{c.tag}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-gray-100 pt-5">
                        {TRUST.map((t) => (
                            <div key={t.text} className="flex items-start gap-2.5 bg-gray-50 border border-gray-200 rounded-[10px] px-3 py-2.5 hover:border-green-300 hover:bg-green-50/40 transition-colors duration-150">
                                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-green-700 text-white flex items-center justify-center">
                                    <CheckIcon />
                                </span>
                                <div>
                                    <span className="block text-[12px] font-bold text-gray-900 leading-tight">{t.text}</span>
                                    <span className="block text-[10.5px] text-gray-500 mt-0.5 leading-tight">{t.detail}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="w-full px-4 pb-8 flex justify-center">
                <div className="w-full max-w-[900px]">
                    <div className="flex gap-3 bg-amber-50 border border-amber-300 rounded-[12px] px-4 py-4">
                        <span className="shrink-0 text-amber-900 mt-0.5"><ShieldIcon /></span>
                        <div>
                            <strong className="block text-[11px] font-bold uppercase tracking-widest text-amber-900 mb-1">
                                Responsible Gaming Notice
                            </strong>
                            <p className="text-[12px] text-amber-900 leading-relaxed">
                                Free Yono Rummy is an information and review platform only. We do not operate any gaming app, handle payments, or accept deposits or withdrawals, and we never encourage adding real money to play. If gaming ever feels compulsive or financially stressful, please pause and reach out to a responsible gaming helpline.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section
                className="w-full bg-white px-4 pb-10 flex justify-center"
                aria-labelledby="faq-heading"
                itemScope
                itemType="https://schema.org/FAQPage"
            >
                <div className="w-full max-w-[900px]">
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            <h2 id="faq-heading" className="text-[16px] font-bold text-gray-900 mb-1">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-[12px] text-gray-600">
                                Straight answers about Yono gaming apps, bonuses, and safety.
                            </p>
                        </div>
                        <span className="hidden sm:inline text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                            {FAQS.length} Questions
                        </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        {FAQS.map((item, i) => (
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

        </div>
    );
}