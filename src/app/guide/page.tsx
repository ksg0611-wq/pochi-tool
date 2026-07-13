import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

export default function GuideIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">ガイド・ブログ</h1>
      <div className="grid gap-6">
        {allPostsData.length === 0 ? (
          <p className="text-gray-500">記事がありません。</p>
        ) : (
          allPostsData.map(({ slug, title, date, excerpt }) => (
            <Link href={`/guide/${slug}`} key={slug} className="block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-white dark:bg-gray-900 shadow-sm hover:shadow-md">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{date}</p>
              {excerpt && <p className="text-gray-700 dark:text-gray-300">{excerpt}</p>}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
