/** Everything the site shows lives here. */

/** Year and month, e.g. "2025-05". */
export type YM = `${number}-${string}`;

export interface Role {
  /** Also the logo file name in src/assets/logos/. */
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
  /** One line saying what it is. */
  summary: string;
  /** How it works, from the source. */
  highlights: string[];
  stack: string[];
  /** Live site, when there is one. */
  live?: string;
  source: string;
}

export const profile = {
  name: 'Edwin Cortazo',
  role: 'Software engineer',
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
      'Built the Manual AI Columns feature end to end and shipped it to production.',
      'Added a caching layer and a schema-level index that cut query latency by 75%.',
      'Designed a system that tracks model deprecations across Snowflake and Databricks and alerts the team in Slack.',
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
      'Built a pipeline that audits shipment reports automatically, keeping data integrity at 99.9%.',
      'Made a dashboard for monitoring KPIs and tuning slow SQL queries.',
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
      'Wrote validation scripts covering 100,000+ records with no downstream errors.',
      'Reconciled invoice and product data across legacy systems, cutting review time by 90%.',
    ],
    stack: ['Python', 'pandas'],
  },
  {
    id: 'lowes',
    org: 'Lowe’s',
    title: 'Software Engineer Intern',
    location: 'Charlotte, NC',
    start: '2025-05',
    end: '2025-08',
    highlights: [
      'Built and deployed ProRange, a platform used in more than 1,700 stores.',
      'Improved backend API performance by 25% and reduced scheduling errors.',
    ],
    stack: ['React', 'Kotlin', 'Java', 'Spring Boot'],
  },
  {
    id: 'vassar',
    org: 'Vassar College',
    title: 'Cognitive Science Programmer',
    location: 'Poughkeepsie, NY',
    start: '2024-09',
    end: '2025-05',
    highlights: [
      'Built browser-based experiments that ran with more than 100 participants.',
      'Automated data processing for 10,000+ trials, cutting preprocessing time by 40%.',
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
      'Built internal tools used daily by more than 50 staff.',
      'Set up CI/CD and a test suite with 90% coverage.',
    ],
    stack: ['Python', 'Flask', 'PostgreSQL'],
  },
];

export const projects: Project[] = [
  {
    name: 'Chapter',
    summary: 'An offline-first RSVP speed reader for EPUB, PDF, and text files, installable as a PWA.',
    highlights: [
      'Parses EPUBs with JSZip and DOMParser (OPF manifest and spine) and PDFs with pdf.js in Web Workers, reading pages in parallel on multi-core machines and stripping running headers.',
      'Times each word against performance.now() deadlines so playback doesn’t drift, weighting length, punctuation, rare words, and first mentions of names, then normalizing so the chosen WPM is the true average.',
      'Full-text search runs in a Web Worker over an Int32Array inverted index, with stemming, prefix matching, and an edit-distance fallback for typos.',
      'Books, progress, and bookmarks persist in IndexedDB. CI runs 196 Vitest unit tests and 67 Playwright tests on desktop and mobile.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'pdf.js', 'IndexedDB', 'Web Workers'],
    live: 'https://edwin580.github.io/RSVP-Reader/',
    source: 'https://github.com/Edwin580/RSVP-Reader',
  },
  {
    name: 'Moral Pop-Out',
    summary: 'A jsPsych experiment, run on Prolific, testing whether a word’s emotional valence biases how bright a gray square looks.',
    highlights: [
      'A custom jsPsych plugin sequences fixation, word, and probe with requestAnimationFrame, logging measured display durations and reaction times on the performance clock.',
      'Seeded, reproducible randomization of 80 trials, with a repeat-detection cover task, an accuracy-gated practice block, and a valence-rating manipulation check.',
      'Analysis runs in the browser and in Node: response rates by valence and cover-task d′ with the Hautus log-linear correction. Results export as CSV.',
      'CI verifies the subresource-integrity hashes of CDN scripts, then runs node:test unit tests and Playwright end-to-end tests.',
    ],
    stack: ['JavaScript', 'jsPsych', 'Playwright'],
    live: 'https://edwin580.github.io/Prolific-Experiment/',
    source: 'https://github.com/Edwin580/Prolific-Experiment',
  },
  {
    name: 'Music Generation',
    summary: 'A PyTorch package that trains melody models on MIDI files and generates new music from a prompt.',
    highlights: [
      'A decoder-only Transformer with rotary position embeddings, pre-LayerNorm, and a sliding-window KV cache, compared against token and piano-roll LSTM baselines.',
      'A REMI-style event tokenizer with tempo-aware quantization. Sampling supports temperature, top-k, and nucleus sampling, a grammar mask, and key constraints estimated with Krumhansl–Schmuckler.',
      'Training uses AdamW with warm-up and cosine decay, mixed precision, and early stopping. Evaluation covers perplexity and Yang & Lerch musical metrics.',
      'YAML-configured CLI, with 66 pytest cases run on Python 3.10–3.12 in CI.',
    ],
    stack: ['Python', 'PyTorch', 'pretty_midi'],
    source: 'https://github.com/Edwin580/music-generator',
  },
];

/* Dates */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parts = (ym: YM) => ym.split('-').map(Number) as [number, number];

/** "Jun – Aug 2026", or "Nov 2025 – May 2026" when the years differ. */
export const dateRange = ({ start, end }: Pick<Role, 'start' | 'end'>): string => {
  const [sy, sm] = parts(start);
  const [ey, em] = parts(end);
  const from = sy === ey ? MONTHS[sm - 1] : `${MONTHS[sm - 1]} ${sy}`;
  return `${from} – ${MONTHS[em - 1]} ${ey}`;
};
