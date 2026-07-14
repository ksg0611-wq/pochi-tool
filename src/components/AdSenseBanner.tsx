"use client";

import { useEffect, useRef } from "react";

type AdSenseSize = "banner" | "rectangle" | "leaderboard";

const sizeMap: Record<AdSenseSize, { minHeight: string; label: string }> = {
  banner: { minHeight: "min-h-[90px]", label: "広告（バナー 728×90）" },
  rectangle: { minHeight: "min-h-[250px]", label: "広告（レクタングル 336×280）" },
  leaderboard: { minHeight: "min-h-[90px]", label: "広告（リーダーボード）" },
};

interface AdSenseBannerProps {
  /** 広告スロットID（審査通過後に入力） */
  slot?: string;
  /** 表示フォーマット */
  size?: AdSenseSize;
  /** Tailwind 追加クラス */
  className?: string;
}

const PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXXX"; // ← 審査通過後にここを差し替える

export default function AdSenseBanner({
  slot,
  size = "banner",
  className = "",
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const { minHeight, label } = sizeMap[size];

  useEffect(() => {
    // 実際の publisher ID と slot が設定されている場合のみ adsbygoogle を push
    if (
      slot &&
      !PUBLISHER_ID.includes("XXXXXXXX") &&
      typeof window !== "undefined" &&
      (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle
    ) {
      try {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
      } catch {
        // AdSense の重複 push エラーを無視
      }
    }
  }, [slot]);

  // 開発モード or スロット未設定の場合はプレースホルダーを表示せず、DOMから完全に削除（条件付きレンダリング）
  if (!slot || PUBLISHER_ID.includes("XXXXXXXX")) {
    return null;
  }

  return (
    <div className={`w-full ${minHeight} overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
