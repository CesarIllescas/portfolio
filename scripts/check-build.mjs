import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { resolveDeployment } from './deployment.mjs';

const html = readFileSync('dist/index.html', 'utf8');
const base = html.match(/<script[^>]+src="([^"]*)assets\//)?.[1];
assert.ok(base, 'The built script must include the Vite base path.');
const assetFile = (url) => {
  assert.ok(url.startsWith(base), `Asset does not use the configured base: ${url}`);
  const relative = url.slice(base.length).split(/[?#]/)[0];
  assert.ok(!relative.includes('..'), 'Asset path must remain inside dist.');
  const file = path.join('dist', relative);
  assert.ok(existsSync(file), `Missing asset: ${file}`);
  return file;
};

for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (url.startsWith('/') && !url.startsWith('//')) assetFile(url);
}
const cssUrl = html.match(/href="([^"]+\.css)"/)?.[1];
assert.ok(cssUrl, 'Production CSS must be linked.');
const css = readFileSync(assetFile(cssUrl), 'utf8');
for (const [, url] of css.matchAll(/url\(["']?([^)'" ]+)["']?\)/g)) {
  if (url.startsWith('/')) assetFile(url);
}
assert.ok(html.includes('AI Customer Support Agent') && html.includes('Outlier / Scale AI'), 'Main content must be pre-rendered.');
assert.ok(!html.includes('href="#"'), 'Placeholder links are not permitted.');
assert.ok(readFileSync('dist/cv/Cesar_Joaquin_Lares_Illescas_CV.pdf').subarray(0, 4).toString() === '%PDF');
const card = readFileSync('dist/og-card.png');
assert.equal(card.readUInt32BE(16), 1200);
assert.equal(card.readUInt32BE(20), 630);
assert.ok(readFileSync('dist/robots.txt', 'utf8').startsWith('User-agent: *'));

if (process.env.GITHUB_REPOSITORY || process.env.VITE_SITE_URL) {
  const expected = resolveDeployment({ repository: process.env.GITHUB_REPOSITORY, siteUrl: process.env.VITE_SITE_URL, basePath: process.env.VITE_BASE_PATH });
  assert.equal(base, expected.base);
  assert.ok(html.includes(`href="${expected.siteUrl}"`), 'Canonical URL must match the real deployment URL.');
  assert.ok(html.includes(`content="${expected.siteUrl}og-card.png"`), 'Open Graph image must use an absolute deployment URL.');
  assert.ok(readFileSync('dist/sitemap.xml', 'utf8').includes(expected.siteUrl));
}
console.log(`Verified pre-rendered HTML, CSS, fonts, CV, social image and asset paths (base: ${base}).`);
