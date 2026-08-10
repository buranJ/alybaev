import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn';

export type ContainerProps = ComponentPropsWithoutRef<'div'>;

/** Единственное место, где живёт горизонтальный ритм страницы. */
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-(--container-max) px-(--container-pad)', className)}
      {...props}
    />
  );
}
