import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | PochiTool',
  description: 'PochiToolの利用規約',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="max-w-none text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">利用規約</h1>
        
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">この利用規約（以下、「本規約」といいます）は、<strong className="font-semibold text-gray-900 dark:text-gray-100">PochiTool</strong>（以下、「当サイト」といいます）が提供するサービス（以下、「本サービス」といいます）の利用条件を定めるものです。</p>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">1. 利用条件</h3>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">ユーザーは、本規約に従って本サービスを利用するものとします。当サイトが提供する各種計算ツールは、各プラットフォームの公開された手数料率をベースにしたシミュレーション結果を提供します。</p>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">2. <strong className="font-semibold text-gray-900 dark:text-gray-100">免責事項</strong>（重要）</h3>
        <ol className="list-decimal pl-6 mb-8 space-y-3 text-gray-700 dark:text-gray-300">
          <li className="mb-2">当サイトは、本サービスによって提供される計算結果の正確性、完全性、最新性について細心の注意を払っておりますが、実際の精算金額や振込金額との完全な一致を保証するものではありません。</li>
          <li className="mb-2">各プラットフォーム（FANBOX、Skeb、BOOTH等）の手数料改定や計算ロジックの変更により、一時的に実際の仕様と異なる場合があります。</li>
          <li className="mb-2">ユーザーが当サイトの計算結果を元に行った意思決定（価格設定、プラットフォームの移行など）によって生じたあらゆる損害や不利益に対しても、当サイトは一切の責任を負いません。実際の取引や価格設定の際は、必ず各公式プラットフォームの最新情報をご確認ください。</li>
        </ol>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">3. 規約の変更</h3>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。</p>
      </article>
    </div>
  );
}
