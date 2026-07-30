'use client';

import React from "react";
import { TelegramIcon } from "../../components/styles/icons";

export default function TeleCard() {
  const telegramWebUrl = "#";

  const openTelegram = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "tg://resolve?domain=yono_storeee";
    setTimeout(() => {
      window.location.href = telegramWebUrl;
    }, 500);
  };

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center gap-3.5 p-4">
        <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
          <TelegramIcon width="20" height="20" className="text-[#006699]" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-bold text-gray-900 leading-snug">
            Stay Connected with Yono All Games
          </h3>
          <p className="text-[12px] text-gray-500 leading-snug mt-0.5">
            Updates, new releases, bonuses and withdrawal proofs
          </p>
        </div>

        <a
          href={telegramWebUrl}
          onClick={openTelegram}
          className="flex-shrink-0 text-[12px] font-bold text-[#006699] bg-blue-50 border border-blue-100 rounded-full px-3.5 py-2"
        >
          Join
        </a>
      </div>
    </div>
  );
}