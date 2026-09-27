import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn';

export type EyebrowProps = ComponentPropsWithoutRef<'span'> & {
  showDot?: boolean;
};

/** Надзаголовок с точкой — «● БЕНЕФИТЫ» из референсов. */
export function Eyebrow({ className, children, showDot = true, ...props }: EyebrowProps) {
  return (
    <span className={cn('type-eyebrow inline-flex items-center gap-2 text-text-muted', className)} {...props}>
      {showDot ? <span aria-hidden="true" className="size-1 rounded-full bg-accent" /> : null}
      {children}
    </span>
  );
}
