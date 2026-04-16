import { getAllPosts } from '@/lib/content';
import Link from 'next/link';

export const metadata = {
  title: '실전 팁 | AdPress',
  description: '애드센스, 애드포스트 수익을 즉시 올릴 수 있는 실전 팁 모음',
};

export default function TipsPage() {
  const posts = getAllPosts('tips');

  return (
    <div className="max-w-[768px] mx-auto w-full py-12">
      <h1 className="text-3xl font-bold mb-2">실전 팁</h1>
      <p className="text-gray-500 mb-8">즉시 적용 가능한 광고 수익 최적화 팁</p>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link href={`/tips/${post.slug}`} key={post.slug}>
            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition flex items-start gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{post.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                  <span>{post.date}</span>
                  <span>{post.readingTime}분 소요</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-10">아직 등록된 팁이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
