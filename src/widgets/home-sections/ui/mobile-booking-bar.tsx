'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { siteConfig } from '@/shared/config/site';

export function MobileBookingBar() {
  const message = encodeURIComponent('Здравствуйте! Хочу записаться на консультацию к доктору Алыбаеву.');
  const [isBookingVisible, setIsBookingVisible] = useState(false);

  useEffect(() => {
    const booking = document.querySelector('#booking');

    if (!booking) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsBookingVisible(entry?.isIntersecting ?? false),
      { threshold: 0.08 },
    );

    observer.observe(booking);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`fixed inset-x-4 bottom-4 z-40 flex items-center gap-3 rounded-full border border-on-dark/10 bg-text-strong/95 p-2 pl-5 text-on-dark shadow-float backdrop-blur-xl transition-[transform,opacity] duration-(--duration-base) lg:hidden ${isBookingVisible ? 'pointer-events-none translate-y-6 opacity-0' : 'translate-y-0 opacity-100'}`}>
      <span className="flex flex-1 items-center gap-2 text-body-sm">
        <span className="size-2 rounded-full bg-accent-line" />
        Приём в Бишкеке
      </span>
      <a href={`${siteConfig.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-body-sm font-medium text-on-dark transition-colors hover:bg-accent-line">
        <MessageCircle aria-hidden="true" className="size-4" /> Записаться
      </a>
    </div>
  );
}
