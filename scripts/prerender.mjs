import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

// Build-time only: deliver readable HTML to crawlers and visitors before React loads.
// No server runtime is included in the deployment artifact.
const server = await createServer({ mode: 'production', server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const html = await readFile('dist/index.html', 'utf8');
  await writeFile('dist/index.html', html.replace('<div id="root"></div>', `<div id="root">${renderToString(createElement(App))}</div>`));
  console.log('Pre-rendered English portfolio into dist/index.html.');
} finally {
  await server.close();
}
