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
  /** Also the screenshot file name in src/assets/projects/. */
  id: string;
  name: string;
  /** One line saying what it is. */
  summary: string;
  /** How it works, from the source. */
  highlights: string[];
  stack: string[];
  /** Live site, for projects that run in the browser. */
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
      'Extended AI columns with a manual mode that runs only when triggered, with cells that can be rerun individually.',
      'Added controls that let admins disable models for builders.',
      'Added a caching layer and a schema-level index that cut AI query latency by 75%.',
      'Built a reusable cache so AI columns on disabled models keep their results and can be saved with a newly assigned model.',
      'Fixed bugs in AI columns and the PDF renderer.',
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
    id: 'receipts',
    name: 'Receipts',
    summary:
      'A query engine in Rust, compiled to WebAssembly, that lets you click any number computed from NYC 311 data and see the rows behind it.',
    highlights: [
      'Runs over content-addressed Arrow IPC snapshots in 64Ki-row chunks. The browser re-derives every BLAKE3 hash on load and refuses data that doesn’t match.',
      'Captures lineage at every operator (selection vectors, CSR group membership) for backward and forward tracing, adding about 6% to execution time on 7.1M rows.',
      'Computes exact counterfactuals: it re-derives a result without chosen rows, recomputing only the affected groups when it can, and matches a full re-run bit for bit.',
      'The Rayon-parallel WASM build loads and verifies all 7.1M rows in under 2 seconds. Nine workspace crates, property tests, and a pyarrow differential oracle.',
    ],
    stack: ['Rust', 'WebAssembly', 'Apache Arrow', 'BLAKE3', 'Rayon'],
    live: 'https://edwin580.github.io/receipts-engine/',
    source: 'https://github.com/Edwin580/receipts-engine',
  },
  {
    id: 'chapter',
    name: 'Chapter – a reading app',
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
    id: 'music-generation',
    name: 'Music Generation',
    summary:
      'A PyTorch melody model that continues a musical prompt, with a demo that runs the trained Transformer in your browser.',
    highlights: [
      'A decoder-only Transformer with rotary position embeddings, pre-LayerNorm, and a sliding-window KV cache, compared against token and piano-roll LSTM baselines.',
      'A REMI-style event tokenizer with tempo-aware quantization. Sampling supports temperature, top-k, and nucleus sampling, a grammar mask, and key constraints estimated with Krumhansl–Schmuckler.',
      'The demo reimplements the forward pass in JavaScript over 1.6 MB of float16 weights in a Web Worker, parity-tested against the PyTorch logits.',
      'Trained with AdamW, warm-up and cosine decay, and early stopping, and evaluated with perplexity and Yang & Lerch musical metrics. 84 pytest cases run on Python 3.10–3.12 in CI.',
    ],
    stack: ['Python', 'PyTorch', 'JavaScript', 'pretty_midi'],
    live: 'https://edwin580.github.io/music-generator/',
    source: 'https://github.com/Edwin580/music-generator',
  },
  {
    id: 'morality-pop-out',
    name: 'Does Morality Pop Out?',
    summary:
      'An EEG replication of Gantman et al. (2020) with 34 participants, published as an interactive page that refits the statistics in the browser.',
    highlights: [
      'Found a bug in the original analysis: R’s gee() only clusters contiguous rows, so the published models fit about 5,000 one-trial clusters instead of 34 participants. Fixing it changes one conclusion.',
      'Ported the gee package’s exchangeable-correlation GEE with sandwich variance to JavaScript, matching 66 reference fits from R to about 1e-12.',
      'Compressed 1.5 GB of EEG data into 2.3 MB of per-participant moments in 25 ms bins, so any time window can be refit in about 0.35 ms.',
      'Includes a one-minute version of the masked word task with requestAnimationFrame timing. The full report is written in Quarto and R.',
    ],
    stack: ['R', 'Quarto', 'JavaScript', 'Python'],
    live: 'https://edwin580.github.io/EEG-Study-Replication/',
    source: 'https://github.com/Edwin580/EEG-Study-Replication',
  },
  {
    id: 'brightness-perception',
    name: 'Brightness Perception',
    summary:
      'A jsPsych experiment, run on Prolific, testing whether a word’s emotional valence biases how bright a gray square looks.',
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
    id: 'better-video',
    name: 'better-video',
    summary:
      'A command-line screen recorder that turns a clip into a small MP4 or GIF for a pull request, zooming in on each click so reviewers can see what changed.',
    highlights: [
      'Recording and export are separate: ffmpeg grabs the screen into a visually lossless MKV while a background thread samples the cursor every 8 ms into a JSON track, so recording stays cheap and a clip can be re-exported with different settings.',
      'A zoom planner picks a viewport for every frame, easing toward the cursor with a frame-rate-independent time constant, holding after each click and clamping to the screen.',
      'Zoomed frames are decoded to raw RGBA, cropped and scaled bilinearly in one pass with taps precomputed per frame, then piped back to ffmpeg. GIFs use a one-pass palettegen/paletteuse tuned for static UI.',
      'Two crates (a core library and the bv CLI) with unit tests for the planner and renderer. It recorded every demo on this page.',
    ],
    stack: ['Rust', 'ffmpeg', 'X11'],
    source: 'https://github.com/Edwin580/better-video',
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
