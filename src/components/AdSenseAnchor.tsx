"use client";

import { useState } from "react";

export default function AdSenseAnchor() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      role="complementary"
      aria-label="広告バナー"
    >
      <div className="relative w-full bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        {/* 閉じるボタン */}
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-7 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow"
          aria-label="広告を閉じる"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* 広告プレースホルダー */}
        <div
          className="w-full min-h-[60px] flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-xs text-gray-400 dark:text-gray-500 select-none py-3">
            広告（モバイルアンカー）- 審査通過後に有効化
          </span>
        </div>
      </div>
    </div>
  );
}
