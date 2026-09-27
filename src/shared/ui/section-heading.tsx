import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn';

import { Eyebrow } from './eyebrow';

export type SectionHeadingProps = ComponentPropsWithoutRef<'div'> & {
  eyebrow: string;
  eyebrowShowDot?: boolean;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  eyebrowShowDot = true,
  title,
  description,
  align = 'left',
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)} {...props}>
      <Eyebrow showDot={eyebrowShowDot}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 max-w-[17ch] font-display text-display-lg font-light text-text-strong">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-[56ch] text-body-lg text-text-muted">{description}</p>
      ) : null}
    </div>
  );
}
