import { getAllPosts, PostMeta } from '@/lib/content';
import Link from 'next/link';

interface Props {
  currentSlug: string;
  category: string;
  tags: string[];
}

export default function RelatedPosts({ currentSlug, category, tags }: Props) {
  const all = getAllPosts(category);
  const related = all
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => p.tags?.some((t) => tags.includes(t)))
    .slice(0, 3);

  const fallback = all.filter((p) => p.slug !== currentSlug).slice(0, 3);
  const posts: PostMeta[] = related.length > 0 ? related : fallback;

  if (posts.length === 0) return null;

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">관련 글</h3>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link href={`/${category}/${post.slug}`} key={post.slug}>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
              <p className="font-medium text-gray-900 text-sm">{post.title}</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
