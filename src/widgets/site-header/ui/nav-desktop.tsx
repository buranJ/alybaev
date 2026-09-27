import type { NavDesktopProps } from '../model/types';

export function NavDesktop({ items }: NavDesktopProps) {
  const visibleIds = new Set(['doctor', 'services', 'results', 'reviews', 'education', 'contacts']);
  const visibleItems = items.filter((item) => visibleIds.has(item.id));

  return (
    <nav aria-label="Основная навигация" className="hidden w-[44rem] 2xl:block">
      <ul className="grid w-full grid-cols-6 items-center whitespace-nowrap">
        {visibleItems.map((item) => (
          <li key={item.id} className="text-center">
            <a
              href={item.href}
              className="group relative inline-block py-2 text-body-sm text-text transition-colors duration-(--duration-fast) hover:text-text-strong"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent-line transition-transform duration-(--duration-fast) ease-out-expo group-hover:scale-x-100"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
