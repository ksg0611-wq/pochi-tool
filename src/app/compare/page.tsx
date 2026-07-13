import { Metadata } from 'next';
import CompareCalculator from './CompareCalculator';

export const metadata: Metadata = {
  title: '플랫폼별 수수료 통합 비교기 (FANBOX vs Skeb vs BOOTH) | PochiTool',
  description:
    '같은 금액을 벌었을 때 어디서 수수료를 제일 적게 뗄까? FANBOX, Skeb, BOOTH의 실수령액을 한눈에 비교해 보세요.',
};

export default function ComparePage() {
  return (
    <div className="w-full">
      <CompareCalculator />
    </div>
  );
}
