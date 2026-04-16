'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface IncomeData {
  month: string;
  adsense: number;
  adpost: number;
  coupang: number;
  affiliate: number;
}

interface Props {
  data: IncomeData[];
}

const formatKRW = (value: number) => `${(value / 10000).toFixed(0)}만원`;

export default function IncomeChart({ data }: Props) {
  return (
    <div className="w-full my-6">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatKRW} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${Number(value).toLocaleString()}원`]}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <Bar dataKey="adsense" name="애드센스" fill="#059669" radius={[4, 4, 0, 0]} />
          <Bar dataKey="adpost" name="애드포스트" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="coupang" name="쿠팡파트너스" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="affiliate" name="제휴마케팅" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
