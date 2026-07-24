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
          Last updated: July 25, 2026
        </p>

        <div className="space-y-6 text-gray-800 text-[15px] leading-relaxed font-medium text-left">
          <p>
            Free Yono Rummy is a dedicated platform designed for Indian players who want reliable and safe access to skill-based mobile gaming apps. In an online space full of unverified APKs and confusing promotions, we focus on delivering clarity, safety, and genuine app discovery.
          </p>

          <p>
            Whether you're a casual gamer looking for light entertainment or a serious player chasing big bonuses, Free Yono Rummy offers a clean and transparent experience. Our easy-to-use platform features carefully selected apps with honest bonus details, real user feedback, and verified download links.
          </p>

          <p>
            We aim to make game discovery simple and trustworthy across every corner of India. Our listings are optimized for all types of users — from big cities to small towns — with attention to app size, performance, and regional preferences.
          </p>

          <p>
            User safety remains our top priority. Every app is carefully screened for security, performance, and legitimacy before being listed. We also provide tools to help users verify apps themselves, reducing the risk of downloading questionable files.
          </p>

          <p>
            Beyond listings, we believe in educating players. Our blog covers useful topics like spotting fake apps, understanding gaming laws, and improving gameplay strategies. We break down complex rules in simple terms so every player can make informed choices.
          </p>

          <p>
            What began as a small directory has grown into a complete gaming resource, shaped by feedback from our community. We actively listen to players through social channels and use their input to improve our recommendations and add new features.
          </p>

          <p>
            Free Yono Rummy continues to evolve with features like trust ratings, bonus alerts, and smart filters. Our promise is simple: to remain India’s most dependable source for safe, enjoyable, and transparent mobile gaming.
          </p>

          <p>
            We cover popular categories including Teen Patti, Rummy, Slots, Spin & Win games, and more. All apps are presented with clear bonus information, withdrawal details, and trust indicators so you can decide with confidence.
          </p>

          <p>
            You can also install our Progressive Web App (PWA) for quick access directly from your home screen — no app store required. This makes browsing faster and lets you stay updated with the latest verified apps and offers.
          </p>

          <p>
            Got feedback, spotted an issue, or want to suggest a new app? We welcome your input. Your suggestions help us grow and serve the community better. Feel free to reach out anytime.
          </p>

        </div>
      </div>
    </section>
  );
}