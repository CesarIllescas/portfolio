import { execFileSync } from 'node:child_process';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { resolveDeployment } from './scripts/deployment.mjs';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  let origin = '';
  try {
    origin = execFileSync('git', ['config', '--get', 'remote.origin.url'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch { /* A fresh local checkout does not require Git. */ }
  const deployment = resolveDeployment({ repository: env.GITHUB_REPOSITORY, origin, basePath: env.VITE_BASE_PATH, siteUrl: env.VITE_SITE_URL });

  return {
    base: deployment.base,
    plugins: [react(), {
      name: 'portfolio-metadata',
      transformIndexHtml() {
        if (!deployment.siteUrl) return [];
        return [
          { tag: 'link', attrs: { rel: 'canonical', href: deployment.siteUrl }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: deployment.siteUrl }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${deployment.siteUrl}og-card.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${deployment.siteUrl}og-card.png` }, injectTo: 'head' },
        ];
      },
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${deployment.siteUrl ? `Sitemap: ${deployment.siteUrl}sitemap.xml\n` : ''}` });
        if (!deployment.siteUrl) return;
        const xmlUrl = deployment.siteUrl.replaceAll('&', '&amp;');
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xmlUrl}</loc></url></urlset>` });
      },
    }],
  };
});
