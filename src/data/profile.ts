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
  description: string;
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
    name: 'RSVP Reader',
    description:
      'A speed-reading app. Open an EPUB, PDF, or text file and it shows the book one word at a time, with search and saved progress.',
    stack: ['React', 'TypeScript'],
    live: 'https://edwin580.github.io/RSVP-Reader/',
    source: 'https://github.com/Edwin580/RSVP-Reader',
  },
  {
    name: 'Moral Pop-Out',
    description:
      'An online experiment testing whether a word’s emotional tone changes how bright a gray square looks, run with real participants.',
    stack: ['JavaScript', 'jsPsych'],
    live: 'https://edwin580.github.io/Prolific-Experiment/',
    source: 'https://github.com/Edwin580/Prolific-Experiment',
  },
  {
    name: 'Music Generation',
    description: 'A Python package that learns melodies from MIDI files and writes new ones, using Transformer and LSTM models.',
    stack: ['Python', 'PyTorch'],
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
