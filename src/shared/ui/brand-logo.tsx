import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

interface BrandLogoProps {
  readonly className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative block h-14 w-20 shrink-0 overflow-hidden',
        className,
      )}
    >
      <Image
        src="/images/brand-logo.svg"
        alt=""
        width={1080}
        height={1080}
        unoptimized
        className="pointer-events-none absolute -top-3.5 left-1/2 w-24 max-w-none -translate-x-1/2 select-none"
      />
    </span>
  );
}
