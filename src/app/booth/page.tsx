import { Metadata } from 'next';
import BoothCalculator from './BoothCalculator';

export const metadata: Metadata = {
  title: 'BOOTH 手数料・手取り計算機 | PochiTool',
  description: 'BOOTHクリエイターのための決済手数料（5.6%+45円）およびBOOST（上乗せ支援）が完全に反映された高精度な計算機です。',
  alternates: { canonical: "https://www.pochi-tool.com/booth" },
};

export default function BoothPage() {
  return (
    <div className="w-full">
      <BoothCalculator />

      <article className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            BOOTHの手数料計算の仕組み
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            BOOTHの決済手数料は、原則として「(商品価格 ＋ BOOST金額) × 5.6% ＋ 45円（2025年10月28日改定）」で計算されます。デジタルデータ販売でも自家通販（自宅から発送）でも基本の手数料率は同じです。
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            よくある質問（FAQ）
          </h3>
          <ul className="space-y-4">
            <li className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Q. BOOST（上乗せ支援）にも手数料はかかりますか？
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A. はい、商品価格とBOOSTの合計金額に対して5.6%+45円の手数料がかかります。
              </p>
            </li>
            <li className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Q. 送料にも決済手数料はかかりますか？
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A. 自家通販の場合、設定した送料は決済手数料の計算対象外となります。
              </p>
            </li>
          </ul>
        </section>

        <section className="pt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            参考リンク：
            <a
              href="https://booth.pm/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
            >
              BOOTH公式ヘルプページ
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}

