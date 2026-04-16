'use client';

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

export const trackAffiliateClick = (platform: string, product: string, link: string) => {
  trackEvent('affiliate_click', {
    event_category: 'Affiliate',
    event_label: `${platform}-${product}`,
    value: link,
  });
};

export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', {
    event_category: 'Engagement',
    event_label: source,
  });
};

export const trackDownload = (resource: string) => {
  trackEvent('download', {
    event_category: 'Resource',
    event_label: resource,
  });
};
