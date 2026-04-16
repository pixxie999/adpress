import { getPostBySlug, getPostSlugs } from '@/lib/content';
import { generateMetadataForPost } from '@/lib/seo';
import { notFound } from 'next/navigation';
import MDXRemote from '@/components/content/MDXRemote';
import TableOfContents from '@/components/content/TableOfContents';
import RelatedPosts from '@/components/content/RelatedPosts';
import ShareButtons from '@/components/content/ShareButtons';
import CTABox from '@/components/monetization/CTABox';

export async function generateStaticParams() {
  const slugs = getPostSlugs('guides');
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'guides');
  if (!post) {
    return { title: 'Not Found' };
  }
  return generateMetadataForPost(post.meta);
}

export default async function GuidePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'guides');

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.description,
    image: post.meta.thumbnail,
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
      <div className="flex gap-8 max-w-[1100px] mx-auto w-full py-12">
        <article className="flex-1 min-w-0 max-w-[768px]">
          <header className="mb-10">
            <div className="text-sm text-primary-600 font-medium mb-2">가이드</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{post.meta.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{post.meta.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{post.meta.date}</span>
              <span>·</span>
              <span>{post.meta.readingTime}분 소요</span>
            </div>
          </header>
          <TableOfContents content={post.content} />
          <div className="prose prose-lg prose-primary max-w-none mt-8">
            <MDXRemote content={post.content} />
          </div>
          <CTABox
            title="애드센스 승인 체크리스트 무료 다운로드"
            description="승인률을 높이는 35가지 항목을 PDF로 정리했습니다."
            href="/downloads/adsense-checklist.pdf"
            buttonText="무료 다운로드"
          />
          <ShareButtons title={post.meta.title} />
          <RelatedPosts currentSlug={slug} category="guides" tags={post.meta.tags || []} />
        </article>
      </div>
    </>
  );
}
