import type { NavDesktopProps } from '../model/types';

export function NavDesktop({ items }: NavDesktopProps) {
  return (
    <nav aria-label="Основная навигация" className="hidden 2xl:block">
      <ul className="flex items-center gap-7">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="group relative inline-block py-1 text-body-sm text-text transition-colors duration-(--duration-fast) hover:text-text-strong"
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
