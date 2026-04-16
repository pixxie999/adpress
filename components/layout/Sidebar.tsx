import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import NewsletterForm from '@/components/interactive/NewsletterForm';

export default function Sidebar() {
  const popularGuides = getAllPosts('guides').slice(0, 5);

  return (
    <aside className="w-[300px] shrink-0 hidden lg:flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">인기 가이드</h3>
        <ul className="flex flex-col gap-2">
          {popularGuides.length === 0 && (
            <li className="text-sm text-gray-400">가이드가 없습니다.</li>
          )}
          {popularGuides.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/guides/${post.slug}`}
                className="text-sm text-gray-700 hover:text-primary-600 transition line-clamp-2"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">무료 도구</h3>
        <Link
          href="/tools/income-calculator"
          className="block text-sm text-primary-600 hover:underline"
        >
          광고 수익 계산기 →
        </Link>
      </div>

      <NewsletterForm />
    </aside>
  );
}
