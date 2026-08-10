import type { HeaderContent, NavItem } from '@/content/header';

export type HeaderBrand = HeaderContent['brand'];
export type HeaderCta = HeaderContent['cta'];

export type NavDesktopProps = {
  readonly items: readonly NavItem[];
};

export type MobileMenuProps = {
  readonly items: readonly NavItem[];
  readonly brand: HeaderBrand;
  readonly cta: HeaderCta;
  readonly eyebrow: string;
};
