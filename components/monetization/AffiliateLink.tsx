'use client';

import { ReactNode } from 'react';

interface Props {
  href: string;
  platform: string;
  product: string;
  children: ReactNode;
  discount?: string;
}

export default function AffiliateLink({ 
  href, 
  platform, 
  product, 
  children,
  discount 
}: Props) {
  const handleClick = () => {
    // trackAffiliateClick(platform, product, href);
    console.log(`Tracked affiliate click: ${platform} - ${product}`);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium break-all"
    >
      {children}
      {discount && (
        <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded flex-shrink-0">
          {discount} 할인
        </span>
      )}
      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded flex-shrink-0">
        제휴링크
      </span>
    </a>
  );
}
