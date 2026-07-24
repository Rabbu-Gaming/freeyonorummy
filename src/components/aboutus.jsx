"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "500" });

export default function AboutUs() {
  return (
    <section className="w-full bg-[#fff] px-4 pt-4 pb-10 flex justify-center">
      <div className="w-full max-w-[1114px] px-[6.2px] sm:px-4 md:px-6 lg:px-12 xl:px-20 space-y-6 pt-[2px] mt-[-15px]">
        <h2 className={`text-2xl sm:text-3xl md:text-[2.5rem] font-extrabold text-gray-900 text-center ${inter.className}`}>
          About Us
        </h2>
        <p className="text-sm text-gray-600 font-semibold text-center -mt-4 mb-2">
          Last updated: June 16, 2025
        </p>

        <div className="space-y-6 text-gray-800 text-[15px] leading-relaxed font-medium text-left">
          <p>
            <a href="https://yonoallstores.com/" className="text-blue-600 underline">Yono All Store</a> is a purpose-built platform tailored for Indian gamers seeking trustworthy, skill-based mobile game apps. In a digital world saturated with misleading APKs and unregulated platforms, we stand for safety, clarity, and verified discovery. From Rummy to trivia, spin-to-win games, and more, every app listed has been thoroughly reviewed to ensure a clean, legal, and enjoyable experience for players across India.
          </p>

          <p>
            Our platform serves both casual users looking for fun, low-storage games and serious players interested in high-bonus, skill-focused titles. With an intuitive layout and a commitment to real transparency, Yono All Store provides a mobile-first experience with curated app recommendations, bonus comparisons, gameplay videos, and helpful tools like the App Checker — a one-click solution to instantly verify the legitimacy of any gaming app.
          </p>

          <p>
            Our long-term vision is to simplify game discovery across all regions of India. That means recommending apps suited for different languages, internet speeds, and gaming habits. Whether you're in a metro city or a rural area, our listings are lightweight, region-aware, and optimized for fast installation. We’re not just a listing page — we’re building a trust layer for India’s growing mobile gaming economy.
          </p>

          <p>
            Safety has always been our core. Each app goes through a strict screening process before making it onto our site. We examine permissions, background behavior, past reviews, app size, and version history. The goal is to eliminate risk for users by filtering out potentially harmful or shady applications. Through our App Checker tool, users can also self-verify any app with confidence before downloading.
          </p>

          <p>
            Yono All Store also believes in educating the player. Our blogs cover topics ranging from "How to Spot Fake Game Apps" to strategy guides for improving your gameplay. We explain legal frameworks in simple language, help users avoid risky platforms, and offer honest reviews of the most popular apps. Whether you’re a beginner or seasoned player, our content is crafted to support smarter decisions.
          </p>

          <p>
            Our growth has been community-powered. What started as a simple directory of Rummy games has now evolved into a full-scale gaming ecosystem. We actively engage with users on Telegram, Discord, and through blog feedback to identify which games are performing best, what new features players want, and how to further streamline the discovery experience. Suggestions are welcomed, and user voices shape our product roadmap.
          </p>

          <p>
            With new features like app trust scores, regional filters, and push alerts for bonus drops, Yono All Store is scaling quickly. Our commitment remains: to be India's most reliable gateway to safe, enjoyable, and skill-based gaming. As laws evolve and mobile habits shift, we promise to stay updated, compliant, and transparent—always putting users first.
          </p>

          <p>
            Our featured categories include Teen Patti games, spin-based apps with daily bonuses, card-based strategy games, and fun quiz apps with real rewards. We list bonus values upfront and sort apps by trust score, size, and popularity—so users know what they’re getting before tapping download. No bait-and-switch. No misguiding ads. Just verified apps and clear choices.
          </p>

          <p>
            We also provide a Progressive Web App (PWA) experience, allowing users to install Yono All Store directly on their phone’s home screen. No app store needed. This speeds up browsing, saves bandwidth, and makes it easier to revisit and recheck for app updates and new drops.
          </p>

          <p>
            Have a suggestion, found a bug, or want to recommend a game? We’re always open to feedback. Our mission grows stronger when users contribute. Help us improve by sharing your ideas, your experience, and your voice. You can also subscribe to our updates and blog for the latest in verified gaming news.
          </p>

        </div>
      </div>
    </section>
  );
}
