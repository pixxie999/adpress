import { MDXRemote as NextMDXRemote } from 'next-mdx-remote/rsc';
import AdSense from '@/components/monetization/AdSense';
import AffiliateLink from '@/components/monetization/AffiliateLink';

// MDX 컨텐츠 내에서 사용할 수 있는 커스텀 컴포넌트 매핑
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<string, any> = {
  AdSense,
  AffiliateLink,
  h2: ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-8 mb-4" {...rest}>{children}</h2>
  ),
  h3: ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold mt-6 mb-3" {...rest}>{children}</h3>
  ),
  a: ({ children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary-600 hover:text-primary-700 underline underline-offset-2" {...rest}>
      {children}
    </a>
  ),
};

export default function MDXRemote({ content }: { content: string }) {
  return (
    <NextMDXRemote
      source={content}
      components={components}
    />
  );
}
