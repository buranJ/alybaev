import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn';

/**
 * Экспортируется отдельно от компонента: ссылке-кнопке (<a href>) нужен тот же
 * вид, но семантика ссылки — оборачивать <a> в <button> нельзя.
 */
export const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-body font-medium',
    'whitespace-nowrap transition-colors duration-(--duration-fast) ease-out-expo',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-dark hover:bg-accent-line',
        accent: 'bg-accent text-on-dark hover:bg-accent-line',
        outline: 'border border-accent/30 bg-accent text-on-dark hover:border-accent-line hover:bg-accent-line',
        ghost: 'text-accent hover:bg-accent-soft hover:text-text-strong',
      },
      /* md и lg держат touch-таргет ≥ 44px из §7. */
      size: {
        sm: 'h-9 px-4 text-body-sm',
        md: 'h-11 px-5 text-body-sm',
        lg: 'h-12 px-6 text-body',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export type ButtonProps = ComponentPropsWithoutRef<'button'> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
