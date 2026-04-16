import { getPostBySlug, getPostSlugs } from '@/lib/content';
import { generateMetadataForPost } from '@/lib/seo';
import { notFound } from 'next/navigation';
import MDXRemote from '@/components/content/MDXRemote';
import ShareButtons from '@/components/content/ShareButtons';
import RelatedPosts from '@/components/content/RelatedPosts';

export async function generateStaticParams() {
  const slugs = getPostSlugs('reviews');
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'reviews');
  if (!post) return { title: 'Not Found' };
  return generateMetadataForPost(post.meta);
}

export default async function ReviewPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'reviews');

  if (!post) notFound();

  return (
    <article className="max-w-[768px] mx-auto w-full py-12">
      <header className="mb-8">
        <div className="text-sm text-secondary-600 font-medium mb-2">리뷰</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{post.meta.title}</h1>
        <p className="text-gray-600 text-lg mb-4">{post.meta.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{post.meta.date}</span>
          <span>·</span>
          <span>{post.meta.readingTime}분 소요</span>
        </div>
      </header>
      <div className="prose prose-lg prose-primary max-w-none">
        <MDXRemote content={post.content} />
      </div>
      <ShareButtons title={post.meta.title} />
      <RelatedPosts currentSlug={slug} category="reviews" tags={post.meta.tags || []} />
    </article>
  );
}
