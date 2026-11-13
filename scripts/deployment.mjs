/** Resolve Pages paths without assuming a GitHub identity or repository name. */
export function resolveDeployment({ repository = '', origin = '', basePath = '', siteUrl = '' } = {}) {
  const fromOrigin = origin.match(/^(?:https?:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)([^/]+)\/([^/]+?)(?:\.git)?\/?$/i);
  const slug = repository || (fromOrigin ? `${fromOrigin[1]}/${fromOrigin[2]}` : '');
  if (slug && !/^[\w.-]+\/[\w.-]+$/.test(slug)) throw new Error('Invalid GitHub repository slug.');
  const [owner, repo] = slug.split('/');
  const rootRepo = owner && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  const configuredUrl = siteUrl ? new URL(siteUrl) : null;
  const urlBase = configuredUrl ? `${configuredUrl.pathname.replace(/\/$/, '')}/` : '';
  const base = basePath || urlBase || (repo && !rootRepo ? `/${repo}/` : '/');
  if (!/^\/(?:[\w.-]+\/)*$/.test(base) || base.includes('/../') || base.includes('/./')) {
    throw new Error('VITE_BASE_PATH must be / or /repository/ with a trailing slash.');
  }
  let url = siteUrl || (owner ? `https://${owner.toLowerCase()}.github.io${base}` : '');
  if (url) {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.search || parsed.hash || parsed.username || parsed.password) {
      throw new Error('VITE_SITE_URL must be a public HTTP(S) URL without a query or fragment.');
    }
    url = `${url.replace(/\/$/, '')}/`;
  }
  return { base, siteUrl: url, repository: slug };
}
