import { Metadata } from 'next';
import BoothCalculator from './BoothCalculator';

export const metadata: Metadata = {
  title: 'BOOTH 수수료 및 실수령액 계산기 | PochiTool',
  description: 'BOOTH 크리에이터를 위한 결제 수수료(5.6%+22엔) 및 BOOST 후원금이 완벽하게 반영된 정밀 계산기입니다.',
};

export default function BoothPage() {
  return (
    <div className="w-full">
      <BoothCalculator />
    </div>
  );
}
