import { getPostBySlug, getPostSlugs } from '@/lib/content';
import { generateMetadataForPost } from '@/lib/seo';
import { notFound } from 'next/navigation';
import MDXRemote from '@/components/content/MDXRemote';
import RelatedPosts from '@/components/content/RelatedPosts';
import ShareButtons from '@/components/content/ShareButtons';
import CTABox from '@/components/monetization/CTABox';

export async function generateStaticParams() {
  const slugs = getPostSlugs('tips');
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'tips');
  if (!post) return { title: 'Not Found' };
  return generateMetadataForPost(post.meta);
}

export default async function TipPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'tips');

  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { '@type': 'Organization', name: 'AdPress' },
    publisher: { '@type': 'Organization', name: 'AdPress' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[768px] mx-auto w-full py-12">
        <header className="mb-8">
          <div className="text-sm text-accent-600 font-medium mb-2">실전 팁</div>
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
        <CTABox
          title="광고 수익 최적화 뉴스레터 구독"
          description="매주 실전 팁과 최신 수익화 전략을 이메일로 받아보세요."
          href="/#newsletter"
          buttonText="무료 구독하기"
        />
        <ShareButtons title={post.meta.title} />
        <RelatedPosts currentSlug={slug} category="tips" tags={post.meta.tags || []} />
      </article>
    </>
  );
}
