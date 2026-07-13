import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel サーバーレス環境で posts/ ディレクトリを
  // ファイルトレーシングに含め、fs.readdirSync が正しく動作するようにする
  outputFileTracingIncludes: {
    "/guide/[slug]": ["./posts/**/*.md"],
    "/guide": ["./posts/**/*.md"],
  },
};

export default nextConfig;
