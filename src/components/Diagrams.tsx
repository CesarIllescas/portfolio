import { ArrowRight, Bot, Box, Braces, Database, FileText, Layers, Network, PackageCheck, Route, ScanLine, Server, Workflow, Wrench } from 'lucide-react';
import { translations } from '../data/translations';
import type { DiagramKind, Locale } from '../data/types';

export function SystemDiagram({ locale }: { locale: Locale }) {
  const t = translations[locale].system;
  return <aside className="system-card" aria-label={t.title}>
    <div className="system-heading"><span className="status-dot" /> {t.title}<Network size={15} aria-hidden="true" /></div>
    <div className="system-map" aria-hidden="true">
      <div className="map-node map-input"><Braces size={18} /><span>{t.input}</span></div>
      <div className="map-connector vertical" />
      <div className="map-node map-agent"><Bot size={21} /><span>{t.agent}</span><span className="node-code">LLM</span></div>
      <div className="map-branches"><i /><i /></div>
      <div className="map-pair"><div className="map-node"><Layers size={16} />{t.context}</div><div className="map-node"><Wrench size={16} />{t.tools}</div></div>
      <div className="map-branches reversed"><i /><i /></div>
      <div className="map-node map-api"><Server size={18} />{t.api}<Database size={16} /></div>
      <div className="map-connector vertical" />
      <div className="map-output"><span className="status-dot" />{t.output}<ArrowRight size={15} /></div>
    </div>
    <div className="system-caption"><p>{t.caption}</p><span>{t.sub}</span></div>
  </aside>;
}

export function ProjectDiagram({ kind, locale }: { kind: DiagramKind; locale: Locale }) {
  const t = translations[locale].projects;
  return <figure className={`project-visual visual-${kind}`} aria-label={`${t.diagram}: ${kind}`}>
    {kind === 'agent' && <>
      <div className="mini-flow" aria-hidden="true"><div className="flow-box"><FileText /><span>RAG</span></div><div className="flow-line" /><div className="flow-box flow-focus"><Bot /><span>LangGraph</span></div><div className="flow-line" /><div className="flow-box"><Wrench /><span>{translations[locale].system.tools}</span></div></div>
      <figcaption>{t.pipeline}</figcaption>
    </>}
    {kind === 'logistics' && <>
      <div className="mini-flow" aria-hidden="true"><div className="parcel-stack"><Box /><Box /><Box /></div><div className="flow-line" /><div className="flow-box flow-focus"><Route /><span>REST API</span></div><div className="flow-line" /><div className="flow-box"><PackageCheck /><span>DHL · FedEx</span></div></div>
      <figcaption>{t.shipping}</figcaption>
    </>}
    {kind === 'forecast' && <>
      <svg viewBox="0 0 440 112" className="forecast-svg" aria-hidden="true"><g className="chart-grid"><path d="M10 20H430M10 55H430M10 90H430" /></g><path className="forecast-band" d="M285 61L308 34 331 40 354 14 377 25 400 7 428 15V60L400 47 377 63 354 52 331 77 308 70 285 61Z" /><path className="history-line" d="M10 87L31 72 52 79 73 54 94 66 115 43 136 58 157 40 178 63 199 45 220 51 241 28 262 43 285 61" /><path className="forecast-line" d="M285 61L308 52 331 59 354 33 377 44 400 27 428 38" /><path className="chart-divider" d="M285 8V102" /><circle cx="285" cy="61" r="4" className="chart-point" /></svg>
      <figcaption>{t.forecast}</figcaption>
    </>}
    {kind === 'freshhire' && <>
      <div className="mini-flow ats-flow" aria-hidden="true"><div className="ats-sources"><span>Greenhouse</span><span>Lever</span><span>Ashby</span></div><div className="flow-line" /><div className="flow-box flow-focus"><ScanLine /><span>FreshHire</span></div><div className="flow-line" /><div className="change-events"><span>new</span><span>updated</span><span>closed</span></div></div>
      <figcaption>{t.freshhire}</figcaption>
    </>}
  </figure>;
}

export const SkillIcons = [Braces, Server, Workflow, Database, Box, ScanLine];
