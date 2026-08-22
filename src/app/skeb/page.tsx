import { Metadata } from 'next';
import SkebCalculator from './SkebCalculator';

export const metadata: Metadata = {
  title: 'Skeb 手数料・手取り計算機 | PochiTool',
  description: 'SkebクリエイターのためのX（Twitter）連携や過去30日募集の割引条件（最大6.8%）および振込手数料無料が反映された手取り計算機です。',
  alternates: { canonical: "https://www.pochi-tool.com/skeb" },
};

export default function SkebPage() {
  return (
    <div className="w-full">
      <SkebCalculator />

      <article className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Skebの手数料と割引条件の仕組み
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Skebの基本手数料は9.8%ですが、X（旧Twitter）アカウントとの連携や、過去30日以内のリクエスト募集などの条件を満たすことで、最低6.8%まで手数料が割引される独自のシステムを採用しています。
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            よくある質問（FAQ）
          </h3>
          <ul className="space-y-4">
            <li className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Q. 銀行への振込手数料はかかりますか？
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A. Skebではクリエイターへの売上振込手数料は「無料（0円）」です。表示された手取り額がそのまま振り込まれます。
              </p>
            </li>
            <li className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Q. 割引条件はいつ判定されますか？
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A. リクエストを承認したタイミングでの条件達成状況によって適用される手数料率が決定します。
              </p>
            </li>
          </ul>
        </section>

        <section className="pt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            参考リンク：
            <a
              href="https://skeb.jp/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
            >
              Skeb公式クリエイターガイド
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}

