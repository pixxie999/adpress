import affiliateData from '@/data/affiliate-links.json';

export interface AffiliateLink {
  id: string;
  platform: string;
  product: string;
  url: string;
  discount?: string;
  description?: string;
}

export function getAffiliateLink(id: string): AffiliateLink | undefined {
  return (affiliateData as AffiliateLink[]).find((link) => link.id === id);
}

export function getAllAffiliateLinks(): AffiliateLink[] {
  return affiliateData as AffiliateLink[];
}

export function getAffiliateLinksByPlatform(platform: string): AffiliateLink[] {
  return (affiliateData as AffiliateLink[]).filter(
    (link) => link.platform.toLowerCase() === platform.toLowerCase()
  );
}
