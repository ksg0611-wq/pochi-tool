import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
