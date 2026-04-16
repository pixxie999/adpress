import { Metadata } from 'next';
import { PostMeta } from './content';

export function generateMetadataForPost(postMeta: PostMeta): Metadata {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adpress.kr'}/${postMeta.category}/${postMeta.slug}`;

  return {
    title: `${postMeta.title} | AdPress`,
    description: postMeta.description,
    keywords: postMeta.tags || [],
    authors: [{ name: 'AdPress' }],
    openGraph: {
      title: `${postMeta.title} | AdPress`,
      description: postMeta.description,
      type: 'article',
      publishedTime: postMeta.date,
      authors: ['AdPress'],
      url,
      images: [
        {
          url: postMeta.thumbnail || '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: postMeta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: postMeta.title,
      description: postMeta.description,
      images: [postMeta.thumbnail || '/images/og-default.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}
