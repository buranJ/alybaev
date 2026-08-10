import path from 'node:path';
import { fileURLToPath } from 'node:url';

import next from 'eslint-config-next/core-web-vitals';

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Слои FSD, сверху вниз. Импорт разрешён только вниз по списку:
 * app → widgets → features → entities → shared. Слой content — чистые данные.
 */
const layerRules = {
  'import/no-restricted-paths': [
    'error',
    {
      basePath: root,
      zones: [
        {
          target: './src/shared',
          from: ['./src/app', './src/widgets', './src/features', './src/entities', './src/content'],
          message: 'shared — нижний слой: он не знает о вышестоящих слоях и о content.',
        },
        {
          target: './src/entities',
          from: ['./src/app', './src/widgets', './src/features'],
          message: 'entities может импортировать только из shared.',
        },
        {
          target: './src/features',
          from: ['./src/app', './src/widgets'],
          message: 'features может импортировать только из entities и shared.',
        },
        {
          target: './src/widgets',
          from: ['./src/app'],
          message: 'widgets не импортирует из app.',
        },
        {
          target: './src/content',
          from: ['./src/app', './src/widgets', './src/features', './src/entities'],
          message: 'content — слой данных: только типы из shared, никакой логики слоёв.',
        },
      ],
    },
  ],
};

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'coverage/**'],
  },
  ...next,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: layerRules,
  },
];

export default config;
