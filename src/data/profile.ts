/** Single source of truth for everything rendered on the site. */

import { fmtIndex } from '../scripts/dates';

/** Year-month, e.g. "2025-05". */
export type YM = `${number}-${string}`;

export interface Role {
  id: string;
  org: string;
  /** Letters shown when there is no logo file; defaults to the first letter of `org`. */
  monogram?: string;
  title: string;
  location: string;
  start: YM;
  end: YM;
  highlights: string[];
  stack: string[];
}

export interface Project {
  name: string;
  blurb: string;
  stack: string[];
  /** Live deployment, when there is one. */
  live?: string;
  /** Source code or notebook. */
  source: string;
}

export const profile = {
  name: 'Edwin Cortazo',
  tagline: 'Software engineer',
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
    title: 'Software Engineer Intern',
    location: 'New York, NY',
    start: '2026-06',
    end: '2026-08',
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
    title: 'Data Science Intern',
    location: 'New York, NY',
    start: '2025-11',
    end: '2026-05',
    highlights: [
      'Shipment-audit pipeline at 99.9% data integrity',
      'KPI monitoring suite and SQL performance tuning',
    ],
    stack: ['Python', 'PostgreSQL', 'TypeScript', 'React'],
  },
  {
    id: 'bucherer',
    org: 'Bucherer 1888',
    title: 'Data Management Intern',
    location: 'New York, NY',
    start: '2025-10',
    end: '2026-05',
    highlights: [
      'Validation for 100k+ records, zero downstream errors',
      'Legacy-system reconciliation: −90% review time',
    ],
    stack: ['Python', 'pandas', 'ETL'],
  },
  {
    id: 'lowes',
    org: 'Lowe’s',
    title: 'Software Engineer Intern',
    location: 'Charlotte, NC',
    start: '2025-05',
    end: '2025-08',
    highlights: [
      'Built ProRange, live in 1,700+ stores',
      'Backend API performance +25%',
    ],
    stack: ['React', 'Kotlin', 'Java', 'Spring Boot'],
  },
  {
    id: 'vassar',
    org: 'Vassar Cognitive Science',
    title: 'Programmer',
    location: 'Poughkeepsie, NY',
    start: '2024-09',
    end: '2025-05',
    highlights: [
      'Web experiments for 100+ participants',
      'ETL over 10k+ trials: −40% pre-processing',
    ],
    stack: ['JavaScript', 'jsPsych', 'Python'],
  },
  {
    id: 'seo',
    org: 'Sponsors for Educational Opportunity',
    monogram: 'SEO',
    title: 'Tech Developer Intern',
    location: 'New York, NY',
    start: '2024-06',
    end: '2024-08',
    highlights: [
      'Internal tools used daily by 50+ staff',
      'CI/CD with 90% test coverage',
    ],
    stack: ['Flask', 'PostgreSQL', 'REST'],
  },
];

export const projects: Project[] = [
  {
    name: 'RSVP Reader',
    blurb: 'Speed reader for EPUB, PDF and text: one word at a time, fixed focus point, in-book search',
    stack: ['React', 'TypeScript', 'Vite', 'Web Workers'],
    live: 'https://edwin580.github.io/RSVP-Reader/',
    source: 'https://github.com/Edwin580/RSVP-Reader',
  },
  {
    name: 'Moral Pop-Out',
    blurb: 'Online experiment testing whether word valence changes perceived brightness, with a results dashboard',
    stack: ['JavaScript', 'jsPsych', 'Playwright'],
    live: 'https://edwin580.github.io/Prolific-Experiment/',
    source: 'https://github.com/Edwin580/Prolific-Experiment',
  },
  {
    name: 'Music Generation',
    blurb: 'PyTorch package that learns melodies from MIDI and writes new ones, with Transformer and LSTM models and key-aware sampling',
    stack: ['Python', 'PyTorch', 'Transformer', 'LSTM'],
    source: 'https://github.com/Edwin580/music-generator',
  },
];

/* ---------- date helpers (pure, build-time) ---------- */

export const toIndex = (ym: YM): number => {
  const [y, m] = ym.split('-').map(Number) as [number, number];
  return y * 12 + (m - 1);
};

export const fmt = (ym: YM): string => fmtIndex(toIndex(ym));
