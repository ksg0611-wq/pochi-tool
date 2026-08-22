import { Metadata } from 'next';
import FanboxCalculator from './FanboxCalculator';

export const metadata: Metadata = {
  title: 'FANBOX 手数料・手取り計算機 | PochiTool',
  description: 'FANBOXクリエイターのための最新手数料率（R-18設定および定額振込手数料反映）に基づいた高精度な計算機です。',
  alternates: { canonical: "https://www.pochi-tool.com/fanbox" },
};

export default function FanboxPage() {
  return (
    <div className="w-full">
      <FanboxCalculator />

      <article className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            pixivFANBOXの手数料計算の仕組み
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            FANBOXでは、支援者からの月額支援金総額に対して「一律10%」のプラットフォーム手数料が発生します。※R-18（成人向け）コンテンツを含むアカウントの場合は決済システムの都合上、12.9%となります。
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            よくある質問（FAQ）
          </h3>
          <ul className="space-y-4">
            <li className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Q. 手数料以外に引かれるお金はありますか？
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A. 売上を銀行口座へ引き出す際に、振込手数料（通常200円〜300円程度、登録口座により異なる）が別途発生します。
              </p>
            </li>
            <li className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Q. 支援金はいつ振り込まれますか？
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A. 毎月1日〜末日までの売上が確定した後、翌月20日以降に指定口座へ振り込まれます。
              </p>
            </li>
          </ul>
        </section>

        <section className="pt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            参考リンク：
            <a
              href="https://www.fanbox.cc/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
            >
              pixivFANBOX総合ヘルプ
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}

