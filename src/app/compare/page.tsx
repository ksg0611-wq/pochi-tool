import { Metadata } from 'next';
import CompareCalculator from './CompareCalculator';

export const metadata: Metadata = {
  title: 'プラットフォーム別手数料 統合比較 (FANBOX vs Skeb vs BOOTH) | PochiTool',
  description: '同じ金額を稼いだ場合、どこが一番手数料が安いか？ FANBOX、Skeb、BOOTHの手取り額を一目で比較できます。',
};

export default function ComparePage() {
  return (
    <div className="w-full">
      <CompareCalculator />
    </div>
  );
}
