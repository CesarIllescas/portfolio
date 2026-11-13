import type { Locale } from './types';

const en = {
  navLabel: 'Main navigation', homeLabel: 'cl. — César Lares — Home',
  nav: { projects: 'Projects', experience: 'Experience', skills: 'Skills', about: 'About', contact: 'Contact' },
  skip: 'Skip to content', menu: 'Toggle navigation', language: 'EN / ES — Change language to Spanish', themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme',
  hero: {
    eyebrow: 'BACKEND SYSTEMS. APPLIED INTELLIGENCE.',
    intro: 'I’m César Joaquín Lares Illescas.',
    description: 'I build AI solutions and the backend systems that make them work in production. From agents that take action to APIs that connect the moving parts.',
    cta: 'Explore my work', cv: 'Download CV', contact: 'Get in touch',
    note: 'Python · TypeScript · Applied AI', scroll: 'A closer look at the work',
  },
  system: { title: 'Connecting intelligence to action', input: 'Request', agent: 'Agent', context: 'Context', tools: 'Tools', api: 'Backend API', data: 'Data', output: 'Action', caption: 'A focus on the whole system.', sub: 'Retrieval, orchestration and backend integration.' },
  projects: { eyebrow: '01 / SELECTED WORK', title: 'Built to solve real problems.', description: 'A selection of AI systems, backend integrations and automation work.', private: 'Private project · Technical case study', public: 'Public project', open: 'View on Apify', details: 'Explore case study', problem: 'The problem', solution: 'The implementation', outcome: 'The outcome', diagram: 'Conceptual diagram', forecast: 'Conceptual time series · not measured results', history: 'Historical demand', prediction: 'Forecast', freshhire: 'Normalize → compare → emit changes', pipeline: 'Retrieve → reason → act', shipping: 'Orders → group → select carrier → ship' },
  experience: { eyebrow: '02 / EXPERIENCE', title: 'Engineering, in practice.', description: 'Building software and evaluating how well AI can build it.', present: 'Present' },
  skills: { eyebrow: '03 / TECHNICAL TOOLKIT', title: 'The tools behind the work.', description: 'Technologies I have used across backend development, AI and deployment.' },
  about: {
    eyebrow: '04 / ABOUT', title: 'A systems mindset.',
    first: 'My background in mechatronics shaped how I approach engineering: understand the system, connect its parts and make the result useful.',
    second: 'Today I work at the intersection of backend development and applied AI. I’m interested in what happens beyond a model’s response: how information is retrieved, how tools are used and how a workflow fits into day-to-day operations.',
    education: 'EDUCATION', languages: 'Spanish · Native / English · B2',
  },
  contact: { eyebrow: '05 / CONTACT', title: 'Let’s build something useful.', description: 'Have a backend or AI engineering role in mind? I’d like to hear about the team and the problems you’re working on.', email: 'Send an email', elsewhere: 'ALSO FIND ME ON' },
  footer: { built: 'Built with React & TypeScript.', top: 'Back to top', location: 'Based in' },
  seo: { description: 'César Joaquín Lares Illescas — Backend & AI Engineer. Production AI agents, Python and TypeScript backend systems, process automation and demand forecasting.' },
};

// Matching keys are enforced by TypeScript; content stays out of components.
type Translation = typeof en;
const es: Translation = {
  navLabel: 'Navegación principal', homeLabel: 'cl. — César Lares — Inicio',
  nav: { projects: 'Proyectos', experience: 'Experiencia', skills: 'Tecnologías', about: 'Sobre mí', contact: 'Contacto' },
  skip: 'Saltar al contenido', menu: 'Abrir o cerrar navegación', language: 'EN / ES — Cambiar idioma a inglés', themeLight: 'Cambiar a tema claro', themeDark: 'Cambiar a tema oscuro',
  hero: {
    eyebrow: 'SISTEMAS BACKEND. INTELIGENCIA APLICADA.',
    intro: 'Soy César Joaquín Lares Illescas.',
    description: 'Desarrollo soluciones de IA y los sistemas backend que las hacen funcionar en producción. Desde agentes que ejecutan acciones hasta APIs que conectan cada parte.',
    cta: 'Explorar proyectos', cv: 'Descargar CV', contact: 'Contactar',
    note: 'Python · TypeScript · IA aplicada', scroll: 'Una mirada al trabajo',
  },
  system: { title: 'Conectar inteligencia con acción', input: 'Solicitud', agent: 'Agente', context: 'Contexto', tools: 'Herramientas', api: 'API backend', data: 'Datos', output: 'Acción', caption: 'Una visión del sistema completo.', sub: 'Recuperación, orquestación e integración backend.' },
  projects: { eyebrow: '01 / PROYECTOS SELECCIONADOS', title: 'Soluciones para problemas reales.', description: 'Una selección de sistemas de IA, integraciones backend y automatizaciones.', private: 'Proyecto privado · Caso de estudio técnico', public: 'Proyecto público', open: 'Ver en Apify', details: 'Explorar caso de estudio', problem: 'El problema', solution: 'La implementación', outcome: 'El resultado', diagram: 'Diagrama conceptual', forecast: 'Serie conceptual · no representa resultados medidos', history: 'Demanda histórica', prediction: 'Pronóstico', freshhire: 'Normalizar → comparar → emitir cambios', pipeline: 'Recuperar → razonar → actuar', shipping: 'Pedidos → agrupar → elegir paquetería → enviar' },
  experience: { eyebrow: '02 / EXPERIENCIA', title: 'Ingeniería en la práctica.', description: 'Desarrollar software y evaluar qué tan bien puede hacerlo la IA.', present: 'Actualidad' },
  skills: { eyebrow: '03 / HERRAMIENTAS', title: 'La tecnología detrás del trabajo.', description: 'Tecnologías que he utilizado en desarrollo backend, IA y despliegue.' },
  about: {
    eyebrow: '04 / SOBRE MÍ', title: 'Pensar en sistemas.',
    first: 'Mi formación en mecatrónica definió cómo abordo la ingeniería: entender el sistema, conectar sus partes y lograr un resultado útil.',
    second: 'Hoy trabajo en la intersección del desarrollo backend y la IA aplicada. Me interesa lo que ocurre más allá de la respuesta de un modelo: cómo se recupera la información, cómo se usan las herramientas y cómo se integra un flujo en la operación diaria.',
    education: 'FORMACIÓN', languages: 'Español · Nativo / Inglés · B2',
  },
  contact: { eyebrow: '05 / CONTACTO', title: 'Construyamos algo útil.', description: '¿Tienes una oportunidad en backend o ingeniería de IA? Me gustaría conocer al equipo y los problemas que buscan resolver.', email: 'Enviar un correo', elsewhere: 'TAMBIÉN ME ENCUENTRAS EN' },
  footer: { built: 'Desarrollado con React y TypeScript.', top: 'Volver al inicio', location: 'Desde' },
  seo: { description: 'César Joaquín Lares Illescas — Backend & AI Engineer. Agentes de IA en producción, sistemas backend con Python y TypeScript, automatización y predicción de demanda.' },
};

export const translations: Record<Locale, Translation> = { en, es };
