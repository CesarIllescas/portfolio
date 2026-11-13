import { ArrowUpRight, ChevronDown, LockKeyhole } from 'lucide-react';
import type { Locale, Project } from '../data/types';
import { translations } from '../data/translations';
import { ProjectDiagram } from './Diagrams';
import { ExternalLink } from './ExternalLink';
import { Tags } from './Tags';

export function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const t = translations[locale].projects;
  return <article className="project-card" id={`project-${project.id}`}>
    <div className="project-topline"><span>{project.category[locale]}</span><span className="project-number">/ 0{index + 1}</span></div>
    <ProjectDiagram kind={project.diagram} locale={locale} />
    <div className="project-body">
      <h3>{project.title}</h3>
      <p className="project-subtitle">{project.subtitle[locale]}</p>
      <p className="project-problem">{project.problem[locale]}</p>
      <Tags items={project.technologies} />
      <div className="project-result">{project.metric ? <><strong>{project.metric.value}</strong><span>{project.metric.label[locale]}</span></> : <span>{project.outcome[locale]}</span>}</div>
      <details className="case-study">
        <summary>{t.details}<ChevronDown size={16} aria-hidden="true" /></summary>
        <div className="case-content"><h4>{t.problem}</h4><p>{project.problem[locale]}</p><h4>{t.solution}</h4><p>{project.solution[locale]}</p><h4>{t.outcome}</h4><p>{project.outcome[locale]}</p></div>
      </details>
      <div className="project-footer">{project.url ? <><span className="public-label"><span className="status-dot" />{t.public}</span><ExternalLink href={project.url}>{t.open}<ArrowUpRight size={15} aria-hidden="true" /></ExternalLink></> : <span className="private-label"><LockKeyhole size={13} aria-hidden="true" />{t.private}</span>}</div>
    </div>
  </article>;
}
