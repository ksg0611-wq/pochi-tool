import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseAnchor from "@/components/AdSenseAnchor";

const inter = Inter({ subsets: ["latin"] });

// ── AdSense publisher ID ────────────────────────────────────────────
// 審査通過後、下記を実際の Publisher ID に差し替えること
const ADSENSE_PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXXX";
// ───────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "PochiTool - クリエイター向け手数料計算ツール",
  description: "FANBOX、Skeb、BOOTHなどのプラットフォームの手数料を簡単に計算・比較できるツールです。",
  openGraph: {
    title: "PochiTool - クリエイター向け手数料計算ツール",
    description: "FANBOX、Skeb、BOOTHなどのプラットフォームの手数料を簡単に計算・比較できるツールです。",
    url: "https://pochi-tool.com",
    siteName: "PochiTool",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/*
          AdSense スクリプト:
          - strategy="afterInteractive" → hydration 完了後にロードし、TTI への影響を最小化
          - async は crossOrigin とともに next/script が自動付与
          - Publisher ID が未設定の場合はスクリプトをロードしない（開発モード安全対策）
        */}
        {!ADSENSE_PUBLISHER_ID.includes("XXXXXXXX") && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          {/* モバイル固定スティッキーバナー（md以上は非表示） */}
          <AdSenseAnchor />
        </ThemeProvider>
      </body>
    </html>
  );
}
