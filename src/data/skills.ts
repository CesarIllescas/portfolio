import type { Localized } from './types';

export const skills: { label: Localized; items: string[] }[] = [
  { label: { en: 'Languages', es: 'Lenguajes' }, items: ['Python', 'TypeScript', 'SQL'] },
  { label: { en: 'Backend', es: 'Backend' }, items: ['Node.js', 'FastAPI', 'Django', 'NestJS', 'REST APIs', 'GraphQL', 'OpenAPI'] },
  { label: { en: 'AI & Machine Learning', es: 'IA y Machine Learning' }, items: ['LangGraph', 'LangChain', 'RAG', 'Embeddings', 'Tool calling', 'Gemini', 'PyTorch', 'TensorFlow', 'pandas', 'Prophet', 'NeuralProphet', 'SARIMAX'] },
  { label: { en: 'Databases', es: 'Bases de datos' }, items: ['PostgreSQL', 'pgvector', 'FAISS', 'MongoDB'] },
  { label: { en: 'Cloud & DevOps', es: 'Cloud y DevOps' }, items: ['AWS EC2', 'AWS S3', 'AWS SageMaker', 'Docker', 'Nginx', 'Git', 'CI/CD', 'Apify'] },
  { label: { en: 'Testing & Observability', es: 'Testing y observabilidad' }, items: ['Pytest', 'Unit testing', 'Regression testing', 'LLM evaluation', 'LangSmith'] },
];
