import { Metadata } from 'next';
import FanboxCalculator from './FanboxCalculator';

export const metadata: Metadata = {
  title: 'FANBOX 手数料・手取り計算機 | PochiTool',
  description: 'FANBOXクリエイターのための最新手数料率（R-18設定および定額振込手数料反映）に基づいた高精度な計算機です。',
};

export default function FanboxPage() {
  return (
    <div className="w-full">
      <FanboxCalculator />
    </div>
  );
}
