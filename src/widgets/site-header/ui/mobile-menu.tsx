'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';

import { siteConfig } from '@/shared/config/site';
import { ArrowUpRight, buttonVariants, Eyebrow } from '@/shared/ui';

import type { MobileMenuProps } from '../model/types';

/**
 * Radix Dialog взят ради фокус-трапа, Esc и блокировки скролла — писать это
 * руками означало бы хуже повторить уже проверенное поведение.
 */
export function MobileMenu({ items, brand, cta, eyebrow }: MobileMenuProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Открыть меню"
        className="-mr-3 grid size-11 place-items-center rounded-full text-text-strong transition-colors duration-(--duration-fast) hover:bg-surface-muted lg:hidden"
      >
        <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="menu-panel fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg px-(--container-pad) pb-10 lg:hidden"
        >
          <Dialog.Title className="sr-only">Меню сайта</Dialog.Title>

          <div className="flex h-(--spacing-header) shrink-0 items-center justify-between">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-full border border-border-strong font-mono text-caption text-text-strong"
            >
              {brand.monogram}
            </span>
            <Dialog.Close
              aria-label="Закрыть меню"
              className="-mr-3 grid size-11 place-items-center rounded-full text-text-strong transition-colors duration-(--duration-fast) hover:bg-surface-muted"
            >
              <X size={22} strokeWidth={1.5} aria-hidden="true" />
            </Dialog.Close>
          </div>

          <Eyebrow className="mt-6">{eyebrow}</Eyebrow>

          <ul className="mt-6 border-t border-border">
            {items.map((item) => (
              <li key={item.id} className="border-b border-border">
                <Dialog.Close asChild>
                  <a
                    href={item.href}
                    className="flex items-center justify-between py-5 font-display text-heading-2 font-light text-text-strong"
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 text-text-muted" />
                  </a>
                </Dialog.Close>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <Dialog.Close asChild>
              <a
                href={cta.href}
                className={buttonVariants({ variant: 'accent', size: 'lg', className: 'group w-full' })}
              >
                {cta.label}
                <ArrowUpRight className="transition-transform duration-(--duration-fast) group-hover:rotate-45" />
              </a>
            </Dialog.Close>

            <a
              href={`tel:${siteConfig.phone.e164}`}
              className="mt-6 block font-mono text-body-sm tabular-nums text-text-strong"
            >
              {siteConfig.phone.display}
            </a>
            <p className="mt-1 text-caption text-text-muted">{siteConfig.address.full}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
