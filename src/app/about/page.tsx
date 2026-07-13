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
          PochiToolは、日本のクリエイター（イラストレーター、漫画家、VTuber、인디 크리에이터 등）の皆様が、より賢く、効率的に活動 수익을 관리할 수 있도록 돕기 위해 개발된 <strong>クリエイター専用の手数料計算・比較ツール</strong>です。
        </p>

        <h3>提供中の機能</h3>
        <ul>
          <li><strong>FANBOX 手数料計算:</strong> 전연령 및 R-18 설정에 따른 최신 수수료 정밀 연산</li>
          <li><strong>Skeb 手数料計算:</strong> X（旧Twitter） 연동 여부에 따른 차등 요율 적용 계산</li>
          <li><strong>BOOTH 手数料計算:</strong> BOOST（상차 지원금） 및 고정 수수료를 포함한 실수령액 산출</li>
          <li><strong>プラットフォーム統合比較（Compare）:</strong> 여러 플랫폼의 정산액을 실시간 랭킹으로 한눈에 비교</li>
        </ul>

        <p>
          PochiTool은 크리에이터 여러분이 수수료 계산에 드는 시간을 줄이고、오롯이 창작 활동에만 집중할 수 있는 환경을 만드는 것을 목표로 합니다。앞으로도 플랫폼들의 정책 변화에 발맞춰 가장 빠르고 정확한 데이터를 제공하겠습니다。
        </p>
      </article>
    </div>
  );
}
