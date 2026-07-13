import { Metadata } from 'next';
import SkebCalculator from './SkebCalculator';

export const metadata: Metadata = {
  title: 'Skeb 수수료 및 실수령액 계산기 | PochiTool',
  description: 'Skeb 크리에이터を 위한 X(트위터) 연동 할인 수수료(6.8%) 및 무료 출금 정책이 완벽 반영된 실수령액 계산기입니다.',
};

export default function SkebPage() {
  return (
    <div className="w-full">
      <SkebCalculator />
    </div>
  );
}
