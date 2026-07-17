import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | PochiTool',
  description: 'PochiToolのプライバシーポリシー',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="max-w-none text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">プライバシーポリシー</h1>
        
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-gray-100">PochiTool</strong>（以下、「当サイト」といいます）は、ユーザーの個人情報の保護を極めて重要視しており、以下の通りプライバシーポリシーを定めます。</p>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">1. 広告の配信について（<strong className="font-semibold text-gray-900 dark:text-gray-100">Googleアドセンス</strong>）</h3>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          当サイトでは、第三者配信の広告サービス「<strong className="font-semibold text-gray-900 dark:text-gray-100">Googleアドセンス</strong>」を利用しています。<br />
          広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「<strong className="font-semibold text-gray-900 dark:text-gray-100">Cookie</strong>」（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。<br />
          ユーザーは、Googleの広告設定でパーソナライズ広告を無効にできます。また、<a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">www.aboutads.info</a> にアクセスし、パーソナライズ広告に使われる第三者配信事業者の <strong className="font-semibold text-gray-900 dark:text-gray-100">Cookie</strong> を無効にすることもできます。
        </p>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">2. アクセス解析ツールについて</h3>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。<br />
          このGoogleアナリティクスはトラフィックデータの収集のために<strong className="font-semibold text-gray-900 dark:text-gray-100">Cookie</strong>を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は<strong className="font-semibold text-gray-900 dark:text-gray-100">Cookie</strong>を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </p>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">3. <strong className="font-semibold text-gray-900 dark:text-gray-100">免責事項</strong>・著作権</h3>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          当サイトのコンテンツ・情報について、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </p>

        <p className="text-right mt-8 text-sm text-gray-500">
          策定日：2026年7月14日
        </p>
      </article>
    </div>
  );
}
