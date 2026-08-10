import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn';

export type ArrowUpRightProps = ComponentPropsWithoutRef<'svg'>;

/** Кастомная стрелка ↗ под 45° — из lucide такой геометрии нет. */
export function ArrowUpRight({ className, ...props }: ArrowUpRightProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('size-4', className)}
      {...props}
    >
      <path d="M5 11 11 5" />
      <path d="M5.75 5H11v5.25" />
    </svg>
  );
}
