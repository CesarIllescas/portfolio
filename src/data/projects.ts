import type { Project } from './types';

// Metrics are limited to the results documented in the CV and project brief.
export const projects: Project[] = [
  {
    id: 'agent',
    diagram: 'agent',
    title: 'AI Customer Support Agent',
    subtitle: { en: 'From a question to an action.', es: 'De una pregunta a una acción.' },
    category: { en: 'Conversational AI', es: 'IA conversacional' },
    problem: {
      en: 'Support teams needed to answer recurring questions and carry out tasks across internal systems.',
      es: 'El equipo de soporte necesitaba resolver consultas recurrentes y ejecutar tareas en distintos sistemas internos.',
    },
    solution: {
      en: 'A production Python agent orchestrated with LangGraph. RAG retrieves relevant information, while tool calling connects Gemini to business APIs and databases. Stateful workflows include conversational memory, response validation and human escalation.',
      es: 'Un agente en producción con Python y LangGraph. RAG recupera información relevante y las herramientas conectan Gemini con APIs de negocio y bases de datos. Los flujos con estado incluyen memoria conversacional, validación de respuestas y escalamiento humano.',
    },
    outcome: { en: 'Approximately 30% less support workload.', es: 'Reducción aproximada del 30% en la carga de soporte.' },
    metric: { value: '≈30%', label: { en: 'less support workload', es: 'menos carga de soporte' } },
    technologies: ['Python', 'LangGraph', 'Gemini', 'RAG', 'FAISS', 'LangSmith'],
  },
  {
    id: 'logistics',
    diagram: 'logistics',
    title: 'Logistics & Shipping Automation',
    subtitle: { en: 'Less manual work. Orders in motion.', es: 'Menos trabajo manual. Pedidos en marcha.' },
    category: { en: 'Backend & automation', es: 'Backend y automatización' },
    problem: {
      en: 'Shipping-label creation, carrier selection and order preparation involved repetitive operational work.',
      es: 'La generación de guías, la selección de paqueterías y la preparación de pedidos requerían trabajo operativo repetitivo.',
    },
    solution: {
      en: 'Backend integrations with DHL, Estafeta and FedEx automate label generation and shipment tracking through REST APIs. Grouping similar products streamlines order preparation.',
      es: 'Integraciones backend con DHL, Estafeta y FedEx automatizan la creación de guías y el seguimiento mediante APIs REST. La agrupación de productos similares agiliza la preparación de pedidos.',
    },
    outcome: { en: '50% reduction in shipping-label generation time.', es: 'Reducción del 50% en el tiempo de generación de guías.' },
    metric: { value: '50%', label: { en: 'less label-generation time', es: 'menos tiempo al generar guías' } },
    technologies: ['REST APIs', 'DHL API', 'Estafeta API', 'FedEx API'],
  },
  {
    id: 'forecast',
    diagram: 'forecast',
    title: 'Demand Forecasting',
    subtitle: { en: 'Making demand patterns useful.', es: 'Convertir patrones de demanda en información útil.' },
    category: { en: 'Machine learning', es: 'Machine learning' },
    problem: {
      en: 'Planning requires understanding how demand changes over time, beyond a snapshot of current sales.',
      es: 'La planeación requiere entender cómo cambia la demanda en el tiempo, más allá de las ventas del momento.',
    },
    solution: {
      en: 'Time-series forecasting using Prophet, NeuralProphet and SARIMAX to model demand over time and account for trends and seasonality.',
      es: 'Predicción de series de tiempo con Prophet, NeuralProphet y SARIMAX para modelar la demanda y considerar tendencias y estacionalidad.',
    },
    outcome: { en: 'Demand forecasts to support operational planning.', es: 'Pronósticos de demanda para apoyar la planeación operativa.' },
    technologies: ['Python', 'Prophet', 'NeuralProphet', 'SARIMAX'],
  },
  {
    id: 'freshhire',
    diagram: 'freshhire',
    title: 'FreshHire',
    subtitle: { en: 'Verified ATS Job Changes API', es: 'Verified ATS Job Changes API' },
    category: { en: 'Public API · Apify', es: 'API pública · Apify' },
    problem: {
      en: 'Job feeds need reliable change detection across ATS providers, without repeatedly comparing entire listings.',
      es: 'Los flujos de vacantes necesitan detectar cambios entre proveedores ATS sin comparar manualmente listados completos.',
    },
    solution: {
      en: 'A public Apify Actor normalizes Greenhouse, Lever and Ashby job boards. Persistent snapshots identify new, updated, closed and reopened jobs. Closures require two complete successful scans to avoid false signals from partial or failed requests.',
      es: 'Un Actor público en Apify normaliza vacantes de Greenhouse, Lever y Ashby. Las instantáneas persistentes permiten identificar altas, cambios, cierres y reaperturas. Los cierres requieren dos escaneos completos exitosos para evitar señales falsas por solicitudes parciales o fallidas.',
    },
    outcome: { en: 'Published on Apify with structured change events and persistent monitoring.', es: 'Publicado en Apify con eventos de cambio estructurados y monitoreo persistente.' },
    technologies: ['Python', 'Apify SDK', 'HTTPX', 'REST APIs'],
    url: 'https://apify.com/cesarjaks/freshhire-verified-ats-job-changes-api',
  },
];
