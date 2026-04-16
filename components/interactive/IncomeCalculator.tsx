'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function IncomeCalculator() {
  const [pageviews, setPageviews] = useState(10000);
  const [rpm, setRpm] = useState(2000);
  const [ctr, setCtr] = useState(1.5);

  const adsenseIncome = Math.round((pageviews / 1000) * rpm);
  const clicks = Math.round((pageviews * ctr) / 100);
  const annualIncome = adsenseIncome * 12;

  const format = (n: number) => n.toLocaleString('ko-KR');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-bold text-gray-900">수익 계산기</h2>
      </div>

      <div className="grid gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            월 페이지뷰
          </label>
          <input
            type="number"
            value={pageviews}
            onChange={(e) => setPageviews(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            min={0}
          />
          <p className="text-xs text-gray-400 mt-1">예: 10,000 (월 만 페이지뷰)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RPM (1,000 페이지뷰당 수익, 원)
          </label>
          <input
            type="number"
            value={rpm}
            onChange={(e) => setRpm(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            min={0}
          />
          <p className="text-xs text-gray-400 mt-1">한국 평균: 1,500~3,000원</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTR (광고 클릭률, %)
          </label>
          <input
            type="number"
            value={ctr}
            onChange={(e) => setCtr(Number(e.target.value))}
            step={0.1}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            min={0}
            max={100}
          />
          <p className="text-xs text-gray-400 mt-1">일반적으로 0.5~3%</p>
        </div>
      </div>

      <div className="bg-primary-50 border border-primary-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">예상 수익</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{format(adsenseIncome)}원</p>
            <p className="text-xs text-gray-500 mt-1">월 예상 수익</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{format(annualIncome)}원</p>
            <p className="text-xs text-gray-500 mt-1">연 예상 수익</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{format(clicks)}회</p>
            <p className="text-xs text-gray-500 mt-1">월 예상 클릭</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
          * 실제 수익은 콘텐츠, 시즌, 광고 단가에 따라 다를 수 있습니다.
        </p>
      </div>
    </div>
  );
}
