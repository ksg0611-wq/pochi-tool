import { Metadata } from 'next';
import SkebCalculator from './SkebCalculator';

export const metadata: Metadata = {
  title: 'Skeb 手数料・手取り計算機 | PochiTool',
  description: 'SkebクリエイターのためのX（Twitter）連携や過去30日募集の割引条件（最大6.8%）および振込手数料無料が反映された手取り計算機です。',
};

export default function SkebPage() {
  return (
    <div className="w-full">
      <SkebCalculator />
    </div>
  );
}
