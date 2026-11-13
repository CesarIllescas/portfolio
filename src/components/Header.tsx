import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { translations } from '../data/translations';
import type { Locale } from '../data/types';

export function Header({ locale, onLocale, theme, onTheme, active }: { locale: Locale; onLocale: () => void; theme: 'dark' | 'light'; onTheme: () => void; active: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[locale];
  return <header className="site-header" onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false); }}>
    <div className="nav-shell container">
      <a className="wordmark" href="#top" aria-label={t.homeLabel} onClick={() => setMenuOpen(false)}>cl<span>.</span></a>
      <nav aria-label={t.navLabel} id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
        {Object.entries(t.nav).map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}{id === 'contact' && <ArrowUpRight size={13} aria-hidden="true" />}</a>)}
      </nav>
      <div className="nav-controls">
        <button className="language-toggle" onClick={onLocale} aria-label={t.language}><span lang="en" className={locale === 'en' ? 'selected-language' : ''}>EN</span><span className="language-divider">/</span><span lang="es" className={locale === 'es' ? 'selected-language' : ''}>ES</span></button>
        <span className="control-divider" />
        <button className="icon-button" onClick={onTheme} aria-label={theme === 'dark' ? t.themeLight : t.themeDark}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button className="icon-button mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.menu} aria-expanded={menuOpen} aria-controls="main-navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </div>
  </header>;
}
