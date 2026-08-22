import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | PochiTool',
  description: 'PochiTool（ポチツール）の開発背景、データ検証方針、運営者情報、免責事項について',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="max-w-none text-gray-800 dark:text-gray-200 space-y-8">
        <header className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            <strong className="font-semibold">PochiTool</strong>（ポチツール）について
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            クリエイターのための手数料計算・収益シミュレーションプラットフォーム
          </p>
        </header>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            1. サイトの制作背景
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            近年、イラストレーター、漫画家、VTuber、同人作家をはじめとする個人クリエイターの収益化手段は、FANBOXなどの月額ファンクラブ、Skebなどのコミッション、BOOTHなどの自家通販・デジタル販売など、多角化しています。
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            しかし、プラットフォームごとに「基本手数料率」「割引条件」「固定手数料」「振込手数料」「端数の切り捨て処理」が異なり、「結局自分の手元にいくら残るのか」を正確に把握することは非常に手間がかかります。こうした煩雑な計算の手間を解消し、クリエイターが創作活動に集中できるよう、実体験に基づいて開発されたのが<strong>PochiTool</strong>です。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            2. 提供中の主な機能
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong className="font-semibold text-gray-900 dark:text-gray-100">FANBOX 手数料計算:</strong> 全年齢（10%）およびR-18設定（12.9%）、定額振込手数料を精密に演算</li>
            <li><strong className="font-semibold text-gray-900 dark:text-gray-100">Skeb 手数料計算:</strong> X（旧Twitter）連携や過去30日募集実績による段階的手数料（6.8%〜9.8%）を反映</li>
            <li><strong className="font-semibold text-gray-900 dark:text-gray-100">BOOTH 手数料計算:</strong> 決済手数料（5.6%+45円）およびBOOST（上乗せ支援金）を含めた実質手取り額を算出</li>
            <li><strong className="font-semibold text-gray-900 dark:text-gray-100">プラットフォーム統合比較:</strong> 同一売上金額に対する各サービスの手取り額をリアルタイムに同時比較</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            3. データ検証と更新方針
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            PochiToolでは、掲載している計算ロジックおよび解説記事の正確性を維持するため、以下の検証プロセスを継続的に実施しています。
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>公式情報ソースの定期巡回:</strong> pixivFANBOX、Skeb、BOOTH等の公式ヘルプページ、利用規約、運営アナウンスを定期的にモニタリングしています。</li>
            <li><strong>料率改定への迅速な対応:</strong> 各プラットフォームの手数料改定（例：2025年10月28日のBOOTH手数料改定など）が行われた際は、計算エンジンの定数および関連ガイド記事を速やかに検証・改定します。</li>
            <li><strong>コンテンツの最終確認日明記:</strong> ガイド記事および計算機ページには情報の確認日を明記し、読者が情報の鮮度を判断できるようにしています。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            4. 運営者情報
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong>運営者:</strong> PochiTool 開発・運営者（個人開発者）</p>
            <p><strong>活動領域:</strong> 日本のクリエイターエコノミーおよびインディーズ創作活動を支援するWebツールの開発・情報発信</p>
            <p><strong>連絡先:</strong> <a href="mailto:contact@pochi-tool.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@pochi-tool.com</a>（詳細は<a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">お問い合わせページ</a>をご確認ください）</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            5. 免責事項
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-xl space-y-2 text-sm text-blue-900 dark:text-blue-100">
            <p>
              ※ 本サイトは個人が運営する独立したツールであり、ピクシブ株式会社、株式会社スケブ、その他のプラットフォーム運営企業とは提携・協業関係にありません。
            </p>
            <p>
              ※ 計算結果は各プラットフォームの公表資料に基づいて精密に設計されていますが、実際の精算額や振込金額は決済方法、注文分割、キャンペーン適用等により異なる場合があります。正確な最終金額は必ず各サービスの公式管理画面でご確認ください。
            </p>
            <p>
              ※ 本サイトの情報は税務・法務・会計の助言を構成するものではありません。確定申告等の詳細な手続きについては管轄の税務署または専門家へご相談ください。
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
