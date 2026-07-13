import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | PochiTool',
  description: 'PochiToolのお問い合わせ',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="prose dark:prose-invert max-w-none">
        <h1>お問い合わせ</h1>
        
        <p>PochiToolをご利用いただきありがとうございます。<br />
        当サイト에 대한 기능 제안、오류 제보、광고 문의 등은 아래의 <strong>Google Form</strong>을 통해 전달해 주시기 바랍니다。</p>

        <p className="my-8 text-lg font-medium">
          👉 <a href="mailto:contact@pochi-tool.com" className="text-blue-600 dark:text-blue-400 hover:underline">
            PochiTool お問い合わせ窓口（Google Form）
          </a>
        </p>

        <h3>주의사항</h3>
        <ul>
          <li>送信いただいた内容はすべて確認しておりますが、内容によってはお返事を差し上げられない場合や、対応にお時間をいただく場合がございます。</li>
          <li>各プラットフォーム公式サービス（pixiv、Skeb、pixiv工場 등） 자체에 대한 문의는 해당 서비스의 고객센터로 직접 문의해 주시기 바랍니다。</li>
        </ul>
      </article>
    </div>
  );
}
