import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | PochiTool',
  description: 'PochiTool（ポチツール）について',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="prose dark:prose-invert max-w-none">
        <h1>PochiTool（ポチツール）について</h1>
        
        <p>
          PochiToolは、日本のクリエイター（イラストレーター、漫画家、VTuber、インディーズクリエイターなど）の皆様が、より賢く、効率的に活動収益を管理できるようサポートするために開発された<strong>クリエイター専用の手数料計算・比較ツール</strong>です。
        </p>

        <h3>提供中の機能</h3>
        <ul>
          <li><strong>FANBOX 手数料計算:</strong> 全年齢およびR-18設定に応じた最新の手数料を精密に演算</li>
          <li><strong>Skeb 手数料計算:</strong> X（旧Twitter）連携の有無による段階的な手数料率を適用して計算</li>
          <li><strong>BOOTH 手数料計算:</strong> BOOST（上乗せ支援金）および固定手数料を含めた手取り額を算出</li>
          <li><strong>プラットフォーム統合比較（Compare）:</strong> 複数のプラットフォームの精算額をリアルタイムランキングで一目で比較</li>
        </ul>

        <p>
          PochiToolは、クリエイターの皆様が手数料の計算にかける時間を減らし、創作活動だけに集中できる環境を作ることを目指しています。今後も各プラットフォームのポリシー変更に合わせて、最も迅速で正確なデータを提供してまいります。
        </p>

        <h3>運営者情報</h3>
        <ul>
          <li><strong>運営者:</strong> PochiTool 運営事務局</li>
          <li><strong>設立目的:</strong> 日本国内のインディーズクリエイター（イラストレーター、VTuberなど）が正当な収益を精密にシミュレーションし、プラットフォームごとの手数料率を最適化することで、創作活動に集中できるよう支援する専門ツールおよび情報を提供すること。</li>
        </ul>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mt-6">
          <p className="text-sm m-0 text-blue-900 dark:text-blue-100">
            💡 <strong>情報の信頼性について:</strong> 当サイトのすべての計算ロジックおよび税務情報は、各プラットフォームの公式ガイドラインおよび現行税率（2026年基準）に基づいて定期的に検証および更新されています。
          </p>
        </div>
      </article>
    </div>
  );
}
