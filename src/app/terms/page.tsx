import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | PochiTool',
  description: 'PochiToolの利用規約',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="prose dark:prose-invert max-w-none">
        <h1>利用規約</h1>
        
        <p>この利用規約（以下、「本規約」といいます）は、PochiTool（以下、「当サイト」といいます）が提供するサービス（以下、「本サービス」といいます）の利用条件を定めるものです。</p>

        <h3>1. 利用条件</h3>
        <p>ユーザーは、本規約に従って本サービスを利用するものとします。当サイトが提供する各種計算ツールは、各プラットフォームの公開된 수수료 요율을 기반으로 시뮬레이션 결과를 제공합니다。</p>

        <h3>2. 免責事項（重要）</h3>
        <ol>
          <li>当サイトは、本サービスによって提供される計算結果の正確性、完全性、最新性について細心の注意を払っておりますが、<strong>実際の精算金額や振込金額との完全な 일치를 보장하지는 않습니다。</strong></li>
          <li>各プラットフォーム（FANBOX、Skeb、BOOTH等）の手数料改定や計算ロジックの変更により、一時的に実際の仕様と異なる場合があります。</li>
          <li>ユーザーが当サイトの計算結果を元に行った意思決定（価格設定、プラットフォームの移行など）によって生じた<strong> 어떠한 손해や不利益に対しても、当サイトは一切の責任を負いません。</strong> 実際の取引や価格設定の際は、必ず各公式プラットフォームの最新情報をご確認ください。</li>
        </ol>

        <h3>3. 規約の変更</h3>
        <p>当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。</p>
      </article>
    </div>
  );
}
