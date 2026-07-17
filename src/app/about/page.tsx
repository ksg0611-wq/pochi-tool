import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | PochiTool',
  description: 'PochiTool（ポチツール）について',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="max-w-none text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">
          <strong className="font-semibold">PochiTool</strong>（ポチツール）について
        </h1>
        
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          PochiToolは、日本のクリエイター（イラストレーター、漫画家、VTuber、インディーズクリエイターなど）の皆様が、より賢く、効率的に活動収益を管理できるようサポートするために開発された<strong>クリエイター専用の手数料計算・比較ツール</strong>です。
        </p>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">提供中の機能</h3>
        <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong className="font-semibold text-gray-900 dark:text-gray-100">FANBOX 手数料計算:</strong> 全年齢およびR-18設定に応じた最新の手数料を精密に演算</li>
          <li><strong className="font-semibold text-gray-900 dark:text-gray-100">Skeb 手数料計算:</strong> X（旧Twitter）連携の有無による段階的な手数料率を適用して計算</li>
          <li><strong className="font-semibold text-gray-900 dark:text-gray-100">BOOTH 手数料計算:</strong> BOOST（上乗せ支援金）および固定手数料を含めた手取り額を算出</li>
          <li><strong className="font-semibold text-gray-900 dark:text-gray-100">プラットフォーム統合比較（Compare）:</strong> 複数のプラットフォームの精算額をリアルタイムランキングで一目で比較</li>
        </ul>

        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          <strong className="font-semibold">PochiTool</strong>は、クリエイターの皆様が手数料の計算にかける時間を減らし、創作活動だけに集中できる環境を作ることを目指しています。今後も各プラットフォームのポリシー変更に合わせて、最も迅速で正確なデータを提供してまいります。
        </p>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">運営者情報</h3>
        <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong className="font-semibold text-gray-900 dark:text-gray-100">運営者:</strong> <strong className="font-semibold text-gray-900 dark:text-gray-100">PochiTool</strong> 開発・運営者 (個人)</li>
          <li><strong className="font-semibold text-gray-900 dark:text-gray-100">設立目的:</strong> 日本国内のインディーズクリエイター（イラストレーター、VTuberなど）が正当な収益を精密にシミュレーションし、プラットフォームごとの手数料率を最適化することで、創作活動に集中できるよう支援する専門ツールおよび情報を提供すること。</li>
        </ul>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mt-6">
          <p className="text-sm m-0 text-blue-900 dark:text-blue-100">
            ※ 本サイトはプラットフォームの手数料計算のための参考情報を提供するものであり、税務・会計相談を代替するものではありません。正確な税務処理については、専門家や管轄の税務署にご確認ください。
          </p>
        </div>
      </article>
    </div>
  );
}
