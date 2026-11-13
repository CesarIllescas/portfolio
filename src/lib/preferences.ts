import type { Locale } from '../data/types';

export function readPreference<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value as T) ? value as T : fallback;
  } catch { return fallback; }
}

export function savePreference(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Preferences still work in memory. */ }
}

export function formatPeriod(start: string, end: string | null, locale: Locale, present: string) {
  const format = (date: string) => {
    const [year, month] = date.split('-').map(Number);
    return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, 1)));
  };
  return `${format(start)} — ${end ? format(end) : present}`;
}

export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
