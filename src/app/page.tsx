import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import AdSenseBanner from '@/components/AdSenseBanner';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ── Top Banner ── */}
      <AdSenseBanner size="banner" className="mb-2" />

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          クリエイター向け<br className="md:hidden" />
          <span className="text-blue-600 dark:text-blue-400">最新お役立ちガイド</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          FANBOX、Skeb、BOOTHなど各種プラットフォームの手数料比較から、収益化のコツまで幅広く解説します。
        </p>
      </div>

      <div className="grid gap-6">
        {allPostsData.length === 0 ? (
          <p className="text-gray-500 text-center py-10">記事がありません。</p>
        ) : (
          allPostsData.map(({ slug, title, date, excerpt }) => (
            <Link 
              href={`/guide/${slug}`} 
              key={slug} 
              className="block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-white dark:bg-gray-900 shadow-sm hover:shadow-md"
            >
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{date}</p>
              {excerpt && <p className="text-gray-700 dark:text-gray-300">{excerpt}</p>}
            </Link>
          ))
        )}
      </div>

      {/* ── Bottom Banner ── */}
      <AdSenseBanner size="leaderboard" />
    </div>
  );
}
