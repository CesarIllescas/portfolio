import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from '../src/components/ProjectCard';
import { projects } from '../src/data/projects';
import { translations } from '../src/data/translations';
import { profile } from '../src/data/profile';
import { formatPeriod, readPreference } from '../src/lib/preferences';

function leaves(value: unknown): string[] {
  return typeof value === 'string' ? [value] : Object.values(value as object).flatMap(leaves);
}

describe('portfolio content contracts', () => {
  it('has four unique projects, with a real public link only for FreshHire', () => {
    expect(new Set(projects.map(p => p.id)).size).toBe(4);
    expect(projects.filter(p => p.url).map(p => p.id)).toEqual(['freshhire']);
    expect(projects.find(p => p.id === 'freshhire')?.url).toBe('https://apify.com/cesarjaks/freshhire-verified-ats-job-changes-api');
  });
  it('provides nonempty translations with matching keys', () => {
    const keys = (v: object): string[] => Object.entries(v).flatMap(([k, x]) => typeof x === 'object' ? keys(x).map(child => `${k}.${child}`) : [k]).sort();
    expect(keys(translations.en)).toEqual(keys(translations.es));
    expect(leaves(translations).every(v => v.trim().length > 0)).toBe(true);
  });
  it.each(['en', 'es'] as const)('renders all case studies and correct privacy controls in %s', locale => {
    for (const [index, project] of projects.entries()) {
      const html = renderToStaticMarkup(<ProjectCard project={project} index={index} locale={locale} />);
      expect(html).toContain(project.title.replaceAll('&', '&amp;'));
      expect(html).toContain(translations[locale].projects.details);
      expect(html).toContain(project.url ? 'noopener noreferrer' : translations[locale].projects.private);
      expect(html).not.toContain('href="#"');
    }
  });
  it('keeps documented support workload and label-generation metrics distinct', () => {
    expect(projects[0].metric?.value).toBe('≈30%');
    expect(projects[1].metric?.value).toBe('50%');
    expect(projects[2].metric).toBeUndefined();
  });
  it('has verified personal links and a relative CV asset', () => {
    expect(profile.links.github).toBe('https://github.com/CesarIllescas');
    expect(profile.links.linkedin).toBe('https://linkedin.com/in/cesarjli0120');
    expect(profile.links.cv).not.toMatch(/^\//);
  });
  it('formats dates consistently without timezone shifts', () => {
    expect(formatPeriod('2023-07', '2024-01', 'en', 'Present')).toBe('Jul 2023 — Jan 2024');
    expect(formatPeriod('2025-11', null, 'es', 'Actualidad')).toContain('nov 2025 — Actualidad');
  });
  it('uses safe preferences when browser storage is unavailable', () => {
    expect(readPreference('missing-key', ['en', 'es'], 'en')).toBe('en');
  });
});
