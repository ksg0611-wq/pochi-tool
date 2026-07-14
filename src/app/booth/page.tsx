import { Metadata } from 'next';
import BoothCalculator from './BoothCalculator';

export const metadata: Metadata = {
  title: 'BOOTH 手数料・手取り計算機 | PochiTool',
  description: 'BOOTHクリエイターのための決済手数料（5.6%+22円）およびBOOST（上乗せ支援）が完全に反映された高精度な計算機です。',
};

export default function BoothPage() {
  return (
    <div className="w-full">
      <BoothCalculator />
    </div>
  );
}
