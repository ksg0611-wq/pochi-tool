import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | PochiTool',
  description: 'PochiToolのお問い合わせ',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="max-w-none text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">お問い合わせ (Contact)</h1>
        
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-gray-100">PochiTool</strong>をご利用いただきありがとうございます。<br />
        当サイトに関する機能提案、バグ報告、広告掲載のご依頼などは、下記の公式メールアドレスまでお問い合わせください。</p>

        <p className="my-8 text-lg font-medium">
          📬 <strong>公式お問い合わせ窓口</strong><br />
          👉 <a href="mailto:contact@pochi-tool.com" className="text-blue-600 dark:text-blue-400 hover:underline">
            contact@pochi-tool.com
          </a>
        </p>

        <h3 className="text-xl font-bold mb-4 mt-10 text-gray-900 dark:text-gray-100">注意事項</h3>
        <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700 dark:text-gray-300">
          <li className="mb-2">送信いただいた内容はすべて確認しておりますが、内容によってはお返事を差し上げられない場合や、対応にお時間をいただく場合がございます。</li>
          <li className="mb-2">各プラットフォーム公式サービス（pixiv、Skeb、BOOTH等）自体の仕様や障害に関するお問い合わせは、該当サービスの公式サポートへ直接ご連絡ください。</li>
          <li className="mb-2">原則として日本語または英語での対応となりますのでご了承ください。</li>
        </ul>
      </article>
    </div>
  );
}
