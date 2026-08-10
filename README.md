# PROJECT_NAME

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind v4.

Требования: Node 20+, pnpm. Установка: `pnpm install`.

Команды: `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `test`, `analyze`.

Архитектура — FSD в `src/`: `app → widgets → features → entities → shared`,
импорт разрешён только вниз по цепочке (правило `import/no-restricted-paths`).
`content` — слой данных, без логики.

Дизайн-токены — единственный источник правды: блок `@theme` в `src/app/globals.css`.

Этап 1 — скелет: секций, UI-компонентов и контента ещё нет.
