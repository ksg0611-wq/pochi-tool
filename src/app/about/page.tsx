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
      </article>
    </div>
  );
}
