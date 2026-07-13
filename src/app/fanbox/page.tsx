import { Metadata } from 'next';
import FanboxCalculator from './FanboxCalculator';

export const metadata: Metadata = {
  title: 'FANBOX 수수료 및 실수령액 계산기 | PochiTool',
  description: 'FANBOX 크리에이터를 위한 최신 개정 수수료 요율(R-18 설정 및 정액 출금 수수료 반영) 기반 정밀 계산기입니다.',
};

export default function FanboxPage() {
  return (
    <div className="w-full">
      <FanboxCalculator />
    </div>
  );
}
