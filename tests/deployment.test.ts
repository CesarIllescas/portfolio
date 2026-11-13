import { describe, expect, it } from 'vitest';
import { resolveDeployment } from '../scripts/deployment.mjs';

describe('GitHub Pages deployment paths', () => {
  it('works locally without Git or a configured domain', () => {
    expect(resolveDeployment()).toEqual({ base: '/', siteUrl: '', repository: '' });
  });
  it('detects a user site without adding the repository to its path', () => {
    expect(resolveDeployment({ repository: 'Engineer/engineer.github.io' })).toMatchObject({ base: '/', siteUrl: 'https://engineer.github.io/' });
  });
  it('detects a project site from Actions', () => {
    expect(resolveDeployment({ repository: 'Engineer/portfolio' })).toMatchObject({ base: '/portfolio/', siteUrl: 'https://engineer.github.io/portfolio/' });
  });
  it.each(['https://github.com/Engineer/portfolio.git', 'git@github.com:Engineer/portfolio.git', 'ssh://git@github.com/Engineer/portfolio.git'])('detects origin %s', origin => {
    expect(resolveDeployment({ origin }).base).toBe('/portfolio/');
  });
  it('uses Actions identity before a local origin', () => {
    expect(resolveDeployment({ repository: 'Engineer/new', origin: 'git@github.com:Engineer/old.git' }).base).toBe('/new/');
  });
  it('supports custom domains and explicit base paths', () => {
    expect(resolveDeployment({ repository: 'Engineer/portfolio', basePath: '/', siteUrl: 'https://portfolio.test' })).toMatchObject({ base: '/', siteUrl: 'https://portfolio.test/' });
  });
  it('infers a custom-domain root directly from configure-pages metadata', () => {
    expect(resolveDeployment({ repository: 'Engineer/portfolio', siteUrl: 'https://portfolio.test' })).toMatchObject({ base: '/', siteUrl: 'https://portfolio.test/' });
  });
  it.each(['portfolio', '/portfolio', '//evil.test/', '/../', '/./', '/test/?x=1'])('rejects ambiguous base path %s', basePath => {
    expect(() => resolveDeployment({ basePath })).toThrow();
  });
  it('does not infer GitHub metadata from unrelated remote hosts', () => {
    expect(resolveDeployment({ origin: 'https://gitlab.com/Engineer/portfolio.git' }).siteUrl).toBe('');
  });
});
