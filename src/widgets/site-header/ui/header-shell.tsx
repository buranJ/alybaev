'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * Единственная задача клиентского листа — флаг «страницу прокрутили».
 * Вся геометрия состояний живёт в CSS (.site-header в globals.css).
 */
export function HeaderShell({ children }: { readonly children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-50 h-(--header-h) transition-[height,background-color,box-shadow] duration-(--duration-base) ease-out-expo data-[scrolled=true]:bg-surface data-[scrolled=true]:shadow-float"
    >
      {children}
    </header>
  );
}
