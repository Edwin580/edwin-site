/** Single source of truth for everything rendered on the site. */

import { fmtIndex } from '../scripts/dates';

/** Year-month, e.g. "2025-05". */
export type YM = `${number}-${string}`;

export interface Role {
  id: string;
  org: string;
  /** Compact label for the timeline. */
  short: string;
  title: string;
  location: string;
  start: YM;
  end: YM;
  kind: 'engineering' | 'data' | 'research';
  highlights: string[];
  stack: string[];
}

export interface Project {
  name: string;
  blurb: string;
  stack: string[];
  href: string;
}

export const profile = {
  name: 'Edwin Cortazo',
  tagline: 'Software engineer',
  about: 'CS & Cognitive Science, Vassar College',
  location: 'New York',
  resume: 'Edwin_Cortazo_Resume.pdf',
  email: 'edwincortazo@gmail.com',
  links: {
    github: 'https://github.com/Edwin580',
    linkedin: 'https://www.linkedin.com/in/edwin-cortazo',
  },
} as const;

export const roles: Role[] = [
  {
    id: 'sigma',
    org: 'Sigma',
    short: 'Sigma',
    title: 'Software Engineer Intern',
    location: 'New York, NY',
    start: '2026-06',
    end: '2026-08',
    kind: 'engineering',
    highlights: [
      'Shipped Manual AI Columns end-to-end to production',
      'Caching layer + schema index: −75% query latency',
      'Model-deprecation tracking across Snowflake & Databricks',
    ],
    stack: ['TypeScript', 'React', 'Snowflake', 'Databricks'],
  },
  {
    id: 'zwilling',
    org: 'Zwilling J.A. Henckels',
    short: 'Zwilling',
    title: 'Data Science Intern',
    location: 'New York, NY',
    start: '2025-11',
    end: '2026-05',
    kind: 'data',
    highlights: [
      'Shipment-audit pipeline at 99.9% data integrity',
      'KPI monitoring suite and SQL performance tuning',
    ],
    stack: ['Python', 'PostgreSQL', 'TypeScript', 'React'],
  },
  {
    id: 'bucherer',
    org: 'Bucherer 1888',
    short: 'Bucherer',
    title: 'Data Management Intern',
    location: 'New York, NY',
    start: '2025-10',
    end: '2026-05',
    kind: 'data',
    highlights: [
      'Validation for 100k+ records, zero downstream errors',
      'Legacy-system reconciliation: −90% review time',
    ],
    stack: ['Python', 'pandas', 'ETL'],
  },
  {
    id: 'lowes',
    org: 'Lowe’s',
    short: 'Lowe’s',
    title: 'Software Engineer Intern',
    location: 'Charlotte, NC',
    start: '2025-05',
    end: '2025-08',
    kind: 'engineering',
    highlights: [
      'Built ProRange, live in 1,700+ stores',
      'Backend API performance +25%',
    ],
    stack: ['React', 'Kotlin', 'Java', 'Spring Boot'],
  },
  {
    id: 'vassar',
    org: 'Vassar Cognitive Science',
    short: 'Vassar',
    title: 'Programmer',
    location: 'Poughkeepsie, NY',
    start: '2024-09',
    end: '2025-05',
    kind: 'research',
    highlights: [
      'Web experiments for 100+ participants',
      'ETL over 10k+ trials: −40% pre-processing',
    ],
    stack: ['JavaScript', 'jsPsych', 'Python'],
  },
  {
    id: 'seo',
    org: 'Sponsors for Educational Opportunity',
    short: 'SEO',
    title: 'Tech Developer Intern',
    location: 'New York, NY',
    start: '2024-06',
    end: '2024-08',
    kind: 'engineering',
    highlights: [
      'Internal tools used daily by 50+ staff',
      'CI/CD with 90% test coverage',
    ],
    stack: ['Flask', 'PostgreSQL', 'REST'],
  },
];

export const projects: Project[] = [
  {
    name: 'Music Generation',
    blurb: 'Seq2seq LSTM trained on 2,000+ MIDI files',
    stack: ['TensorFlow', 'Keras'],
    href: 'https://colab.research.google.com/drive/1UsDg6tmIFOnkcv2W6baZCRSZXRJBvvjX?usp=sharing',
  },
  {
    name: 'EcoHealth',
    blurb: 'Environmental analytics for 100+ cities',
    stack: ['React', 'Flask', 'AWS'],
    href: 'https://github.com/DafneArreola/EcoHealth',
  },
  {
    name: 'Moral Pop-Out',
    blurb: 'Replication study with a full-stack web experiment',
    stack: ['JavaScript', 'R'],
    href: 'https://github.com/Edwin580/Prolific-Experiment',
  },
];

/* ---------- date helpers (pure, build-time) ---------- */

export const toIndex = (ym: YM): number => {
  const [y, m] = ym.split('-').map(Number) as [number, number];
  return y * 12 + (m - 1);
};

export const fmt = (ym: YM): string => fmtIndex(toIndex(ym));

/** Inclusive month count. */
export const duration = (r: Role): number => toIndex(r.end) - toIndex(r.start) + 1;
