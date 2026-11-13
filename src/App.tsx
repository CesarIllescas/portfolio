import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Download, CodeXml as Github, GraduationCap, BriefcaseBusiness as Linkedin, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ExternalLink } from './components/ExternalLink';
import { SectionHeading } from './components/SectionHeading';
import { SkillIcons, SystemDiagram } from './components/Diagrams';
import { ProjectCard } from './components/ProjectCard';
import { Tags } from './components/Tags';
import { experiences } from './data/experience';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { skills } from './data/skills';
import { translations } from './data/translations';
import type { Locale } from './data/types';
import { assetPath, formatPeriod, readPreference, savePreference } from './lib/preferences';

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => readPreference('portfolio-language', ['en', 'es'], 'en'));
  const [theme, setTheme] = useState<'dark' | 'light'>(() => readPreference('portfolio-theme', ['dark', 'light'], 'dark'));
  const [active, setActive] = useState('');
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    savePreference('portfolio-language', locale);
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.seo.description);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.seo.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', locale === 'en' ? 'en_US' : 'es_MX');
    document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute('content', locale === 'en' ? 'es_MX' : 'en_US');
  }, [locale, t]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101216' : '#f7f8fa');
    savePreference('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <Header locale={locale} onLocale={() => setLocale(locale === 'en' ? 'es' : 'en')} theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} active={active} />
    <main id="main" className="container" tabIndex={-1}>
      <section className="hero" id="top" aria-labelledby="hero-heading">
        <div className="hero-main">
          <p className="eyebrow hero-eyebrow"><span className="blue-rule" />{t.hero.eyebrow}</p>
          <p className="hero-intro">{t.hero.intro}</p>
          <h1 id="hero-heading">Backend &<br /><span>AI Engineer<span className="heading-dot">.</span></span></h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions"><a href="#projects" className="button button-primary">{t.hero.cta}<ArrowRight size={17} aria-hidden="true" /></a>{profile.links.cv && <a className="button button-secondary" href={assetPath(profile.links.cv)} download>{t.hero.cv}<Download size={16} aria-hidden="true" /></a>}</div>
          <div className="hero-links">{profile.links.github && <ExternalLink href={profile.links.github}><Github size={16} aria-hidden="true" />GitHub<ArrowUpRight size={12} aria-hidden="true" /></ExternalLink>}{profile.links.linkedin && <ExternalLink href={profile.links.linkedin}><Linkedin size={16} aria-hidden="true" />LinkedIn<ArrowUpRight size={12} aria-hidden="true" /></ExternalLink>}<a href="#contact"><Mail size={16} aria-hidden="true" />{t.hero.contact}</a></div>
        </div>
        <SystemDiagram locale={locale} />
        <div className="hero-bottom"><p><MapPin size={13} aria-hidden="true" />{profile.location[locale]}<span className="tiny-dot" />{t.hero.note}</p><a href="#projects">{t.hero.scroll}<ArrowDown size={14} aria-hidden="true" /></a></div>
      </section>
      <section id="projects" className="section projects-section" aria-labelledby="projects-title">
        <div id="projects-title"><SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} /></div>
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} locale={locale} />)}</div>
      </section>
      <section id="experience" className="section experience-section" aria-labelledby="experience-title">
        <div id="experience-title"><SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} description={t.experience.description} /></div>
        <div className="experience-list">{experiences.map(experience => <article className="experience-company" key={experience.company}>
          <header className="company-heading"><h3>{experience.company}</h3>{experience.relationship && <p>{experience.relationship[locale]}</p>}</header>
          <div className="company-roles">{experience.roles.map(role => <div className="experience-role" key={role.title}>
            <div className="role-heading"><h4>{role.title}</h4><p className="role-dates">{formatPeriod(role.start, role.end, locale, t.experience.present)}</p></div>
            <ul className="contributions">{role.contributions.map((item, index) => <li key={index}>{item[locale]}</li>)}</ul>
            <Tags items={role.technologies} />
          </div>)}</div>
        </article>)}</div>
      </section>
      <section id="skills" className="section" aria-labelledby="skills-title">
        <div id="skills-title"><SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} description={t.skills.description} /></div>
        <div className="skills-grid">{skills.map((skill, index) => { const Icon = SkillIcons[index]; return <article className="skill-group" key={skill.label.en}><div className="skill-label"><Icon size={18} aria-hidden="true" /><h3>{skill.label[locale]}</h3></div><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></article>; })}</div>
      </section>
      <section id="about" className="section about-section" aria-labelledby="about-title">
        <div className="about-copy"><div id="about-title"><SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} /></div><p>{t.about.first}</p><p>{t.about.second}</p></div>
        <aside className="education-card"><GraduationCap size={23} aria-hidden="true" /><p className="eyebrow">{t.about.education}</p><h3>{profile.education.degree[locale]}</h3><p>{profile.education.institution}</p><span className="education-period">{profile.education.period}</span><div className="education-languages">{t.about.languages}</div></aside>
      </section>
      <section id="contact" className="section contact-section" aria-labelledby="contact-title">
        <p className="eyebrow">{t.contact.eyebrow}</p><h2 id="contact-title">{t.contact.title}</h2><p className="contact-description">{t.contact.description}</p>
        {profile.links.email && <a className="contact-email" href={`mailto:${profile.links.email}`}>{profile.links.email}<ArrowUpRight size={26} aria-hidden="true" /></a>}
        <div className="contact-social"><span className="eyebrow">{t.contact.elsewhere}</span>{profile.links.github && <ExternalLink href={profile.links.github}>GitHub<ArrowUpRight size={14} aria-hidden="true" /></ExternalLink>}{profile.links.linkedin && <ExternalLink href={profile.links.linkedin}>LinkedIn<ArrowUpRight size={14} aria-hidden="true" /></ExternalLink>}</div>
      </section>
    </main>
    <footer className="site-footer container"><p>© {new Date().getFullYear()} {profile.shortName}<span className="footer-separator">/</span><span>{t.footer.built}</span></p><a href="#top">{t.footer.top}<ArrowUp size={14} aria-hidden="true" /></a></footer>
  </>;
}
