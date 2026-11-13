import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    company: 'Outlier / Scale AI',
    relationship: { en: 'Independent contributor via Outlier', es: 'Colaborador independiente a través de Outlier' },
    roles: [{
      title: 'AI Engineer, Frontier Model Evaluation',
      start: '2025-11', end: null,
      contributions: [
        { en: 'Evaluate frontier LLMs and coding agents on technical reasoning, tool use and functional correctness in software engineering tasks.', es: 'Evaluación de LLMs de frontera y agentes de programación: razonamiento técnico, uso de herramientas y corrección funcional en tareas de ingeniería de software.' },
        { en: 'Reproduce repository issues, run unit and regression tests, and assess generated patches, including SWE-bench Pro tasks.', es: 'Reproducción de problemas en repositorios, ejecución de pruebas unitarias y de regresión, y evaluación de parches generados, incluidas tareas de SWE-bench Pro.' },
      ],
      technologies: ['LLM evaluation', 'Unit & regression testing', 'Peer QA'],
    }],
  },
  {
    company: 'B Life',
    roles: [
      {
        title: 'AI Developer', start: '2024-01', end: '2025-11',
        contributions: [
          { en: 'Built a production support agent with LangGraph, Gemini, RAG and business-system integrations; used LangSmith to trace and debug agent workflows.', es: 'Desarrollo de un agente de soporte en producción con LangGraph, Gemini, RAG e integraciones de negocio; uso de LangSmith para trazar y depurar los flujos del agente.' },
          { en: 'Built FastAPI services with Pytest coverage, deployed Docker containers on AWS, and deployed ML models with SageMaker. Optimized MongoDB aggregations to reduce query time by 40%.', es: 'Desarrollo de servicios FastAPI con pruebas Pytest, despliegue de contenedores Docker en AWS y modelos de ML en SageMaker. Optimización de agregaciones MongoDB con una reducción del 40% en el tiempo de consulta.' },
        ],
        technologies: ['Python', 'LangGraph', 'FastAPI', 'AWS', 'MongoDB'],
      },
      {
        title: 'Backend Developer', start: '2023-07', end: '2024-01',
        contributions: [
          { en: 'Developed NestJS/TypeScript services and REST APIs with MongoDB, JWT authentication and OpenAPI documentation. Integrated Amazon, Mercado Libre and shipping-provider APIs.', es: 'Desarrollo de servicios NestJS/TypeScript y APIs REST con MongoDB, autenticación JWT y documentación OpenAPI. Integración de APIs de Amazon, Mercado Libre y paqueterías.' },
          { en: 'Implemented CI/CD for AWS EC2 deployments and configured Nginx, reducing deployment time by 50%.', es: 'Implementación de CI/CD para despliegues en AWS EC2 y configuración de Nginx, reduciendo un 50% el tiempo de despliegue.' },
        ],
        technologies: ['TypeScript', 'NestJS', 'REST / GraphQL', 'AWS EC2', 'Nginx'],
      },
    ],
  },
];
