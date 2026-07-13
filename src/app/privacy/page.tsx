import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | PochiTool',
  description: 'PochiToolのプライバシーポリシー',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="prose dark:prose-invert max-w-none">
        <h1>プライバシーポリシー</h1>
        
        <p>PochiTool（以下、「当サイト」といいます）は、ユーザーの個人情報の保護を極めて重要視しており、以下の通りプライバシーポリシーを定めます。</p>

        <h3>1. 広告の配信について（Googleアドセンス）</h3>
        <p>
          当サイトでは、第三者配信の広告サービス「Googleアドセンス」を利用しています。<br />
          広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。<br />
          ユーザーは、Googleの広告設定でパーソナライズ広告を無効にできます。また、<a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a> にアクセスし、パーソナライズ広告に使われる第三者配信事業者の Cookie を無効にすることもできます。
        </p>

        <h3>2. アクセス解析ツールについて</h3>
        <p>
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。<br />
          このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </p>

        <h3>3. 免責事項・著作権</h3>
        <p>
          当サイトのコンテンツ・情報について、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </p>

        <p className="text-right mt-8 text-sm text-gray-500">
          策定日：2026年7月14日
        </p>
      </article>
    </div>
  );
}
