import { getAllPosts } from '@/lib/content';
import Link from 'next/link';

export const metadata = {
  title: '플랫폼 리뷰 | AdPress',
  description: '애드센스, 애드포스트 등 광고 플랫폼 및 수익화 도구 리뷰',
};

export default function ReviewsPage() {
  const posts = getAllPosts('reviews');

  return (
    <div className="max-w-[768px] mx-auto w-full py-12">
      <h1 className="text-3xl font-bold mb-2">플랫폼 리뷰</h1>
      <p className="text-gray-500 mb-8">광고 플랫폼과 수익화 도구 솔직 리뷰</p>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link href={`/reviews/${post.slug}`} key={post.slug}>
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
          <p className="text-gray-500 text-center py-10">아직 등록된 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
