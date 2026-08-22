import { Metadata } from 'next';
import CompareCalculator from './CompareCalculator';

export const metadata: Metadata = {
  title: 'プラットフォーム別手数料 統合比較 (FANBOX vs Skeb vs BOOTH) | PochiTool',
  description: '同じ金額を稼いだ場合、どこが一番手数料が安いか？ FANBOX、Skeb、BOOTHの手取り額を一目で比較できます。',
  alternates: { canonical: "https://www.pochi-tool.com/compare" },
};

export default function ComparePage() {
  return (
    <div className="w-full">
      <CompareCalculator />

      <article className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            プラットフォーム別・手取り額の比較ポイント
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            同じ売上金額でも、利用するプラットフォーム（FANBOX、Skeb、BOOTH等）によって「基本手数料率」「割引条件」「振込手数料」が異なるため、最終的に手元に残る金額（手取り）には差が出ます。
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            よくある質問（FAQ）
          </h3>
          <ul className="space-y-4">
            <li className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Q. どのプラットフォームが一番手数料が安いですか？
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A. 金額帯によって異なります。1万円未満の少額では振込手数料が無料のSkeb（最大6.8%割引時）が有利な傾向にありますが、5万円以上の高額請求では、手数料率は高くてもBOOTHの固定額（45円）の影響が薄まるため、BOOTHの方が手取りが多くなるケースもあります。正確な金額は
                <a href="/compare" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">
                  一括比較計算機
                </a>
                でご確認ください。
              </p>
            </li>
            <li className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Q. R-18コンテンツを扱う場合の注意点は？
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A. FANBOX（12.9%）のように、成人向けコンテンツを取り扱う場合は全年齢向けと異なる手数料率が適用されるプラットフォームがあるため注意が必要です。
              </p>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

