import { getAllPosts } from '@/lib/content';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export const metadata = {
  title: '수익 리포트 | AdPress',
  description: '매월 공개되는 AdPress 블로그 광고 수익 실적 리포트',
};

export default function IncomeReportsPage() {
  const posts = getAllPosts('income-reports');

  return (
    <div className="max-w-[768px] mx-auto w-full py-12">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-7 h-7 text-primary-600" />
        <h1 className="text-3xl font-bold">수익 리포트</h1>
      </div>
      <p className="text-gray-500 mb-8">투명하게 공개하는 매월 광고 수익 실적</p>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link href={`/income-reports/${post.slug}`} key={post.slug}>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{post.date}</span>
                <span>{post.readingTime}분 소요</span>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-10">아직 등록된 리포트가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
