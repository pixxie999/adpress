import { Metadata } from 'next';
import IncomeCalculator from '@/components/interactive/IncomeCalculator';

export const metadata: Metadata = {
  title: '광고 수익 계산기 | AdPress',
  description: '애드센스, 애드포스트 예상 수익을 페이지뷰와 RPM으로 계산해보세요.',
};

export default function IncomeCalculatorPage() {
  return (
    <div className="max-w-[768px] mx-auto w-full py-12">
      <h1 className="text-3xl font-bold mb-2">광고 수익 계산기</h1>
      <p className="text-gray-500 mb-8">
        페이지뷰, RPM, CTR을 입력해 예상 광고 수익을 계산해보세요.
      </p>
      <IncomeCalculator />
    </div>
  );
}
