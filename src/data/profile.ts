/** Everything the site shows lives here. */

/** Year and month, e.g. "2025-05". */
type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
export type YM = `${number}-${Month}`;

export interface Role {
  org: string;
  title: string;
  location: string;
  start: YM;
  end: YM;
  highlights: string[];
  stack: string[];
}

export interface Project {
  /** Also the screenshot and demo file names in src/assets/, and the key in snippets.json. */
  id: string;
  name: string;
  /** One line saying what it is. */
  summary: string;
  /** How it works, from the source. */
  highlights: string[];
  /** Three measured numbers, shown on the card. */
  figures: { value: string; label: string }[];
  /** The path data takes through the system, in order. `where` names the place a stage runs when that matters. */
  flow: { name: string; note: string; where?: string }[];
  /** The hard parts, and how each was solved. */
  problems: { title: string; body: string }[];
  /** Measured results: a small table, how it was measured, what fell short, and where the numbers come from. */
  bench: { caption: string; columns: string[]; rows: string[][]; note: string; source: string };
  /** What the excerpt in snippets.json (scripts/snippets.mjs) shows. */
  code: { title: string; note: string };
  stack: string[];
  /** How it is tested. */
  tests: string[];
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
    org: 'Sigma',
    title: 'Software Engineer Intern',
    location: 'New York, NY',
    start: '2026-06',
    end: '2026-08',
    highlights: [
      'Built manual AI columns that run only when a user triggers them.',
      'Added rerunnable cells, so a single AI cell can be recomputed without rerunning the whole column.',
      'Added selectable rerunnable cells, so users can select a subset of cells and rerun only those.',
      'Added admin controls to disable specific models for builders.',
      'Added a caching layer and a schema-level index that cut AI query latency by 75%.',
      'Built a reusable cache so columns on disabled models keep their results and can be saved under a newly assigned model.',
      'Fixed bugs in AI columns and the PDF renderer.',
    ],
    stack: ['TypeScript', 'React', 'SQL'],
  },
  {
    org: 'Zwilling J.A. Henckels',
    title: 'Data Science Intern',
    location: 'New York, NY',
    start: '2025-11',
    end: '2026-05',
    highlights: [
      'Built an automated pipeline that audits shipment reports and detects fraud in orders, maintaining 99.9% data integrity.',
      'Built a KPI monitoring dashboard and used it to find and tune slow SQL queries.',
    ],
    stack: ['Python', 'PostgreSQL', 'TypeScript', 'React'],
  },
  {
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
    org: 'Sponsors for Educational Opportunity',
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
      'Nine workspace crates, 100 Rust tests including property tests, a pyarrow differential oracle, and a check that the WASM build’s output equals the native engine’s byte for byte.',
    ],
    figures: [
      { value: '1.2–1.35 s', label: 'to load and verify 7.1M rows in the browser' },
      { value: '≤ 15 ms', label: 'to trace a number back to 443,530 rows' },
      { value: '63 ms', label: 'to re-derive a result without one row (2.5 s re-run)' },
    ],
    flow: [
      { name: 'Socrata API', note: '143 pages of 50,000 records, 3.1 GB of JSON' },
      { name: 'Snapshot CLI', note: 'clean, dedupe, sort; BLAKE3 over 64Ki-row chunks' },
      { name: 'Arrow IPC + manifest', note: 'LZ4 buffers, 239 MB, named by its hash' },
      { name: 'Verify on load', note: 'WASM re-derives every hash before use', where: 'browser' },
      { name: 'Plan', note: 'a validated, hashed DAG, described in plain English', where: 'browser' },
      { name: 'Operators + lineage', note: 'selection vectors, CSR group membership', where: 'browser' },
      { name: 'Trace and what-if', note: 'rows behind a number; the number without them', where: 'browser' },
    ],
    problems: [
      {
        title: 'Data the page can prove it didn’t alter',
        body: 'The engine trusts nothing it is handed. A dependency-free Arrow IPC reader, bounds-checked on every read, decodes the file and re-derives the manifest, chunk, dictionary and column hashes and the sort order row ids depend on. A flipped byte or a truncated download is refused with a sentence saying what didn’t match.',
      },
      {
        title: 'Counterfactuals that are exact, not estimated',
        body: 'Removing rows before a single aggregate only changes their groups, so only those are recomputed, and the result is compared bit for bit with a full re-run. Cost follows the size of the affected group, not the table: one Bronx row out of 443,530 takes 63 ms where a re-run takes 2.5 s.',
      },
      {
        title: 'The same answer on one thread or four',
        body: 'Parallel code only splits work whose result doesn’t depend on order (hashing, decoding, filtering, stable sort). Aggregation stays sequential so decimal sums round the same way, and the property tests run with and without the parallel feature.',
      },
    ],
    bench: {
      caption: 'Headless Chromium on a 4-vCPU cloud container, real 7,111,809-row snapshot, median of 3 runs.',
      columns: ['', '1 thread', '4 workers'],
      rows: [
        ['WASM size', '0.78 MB', '1.27 MB'],
        ['Load + full verification (LZ4 snapshot)', '3.6–4.2 s', '1.20–1.35 s'],
        ['Filter, group, median by borough', '880–885 ms', '628–692 ms'],
        ['Trace 443,530 rows, cold', '17–20 ms', '10–15 ms'],
        ['Exclude one row, incrementally', '67–76 ms', '65–72 ms'],
        ['Leave-one-out for 443k rows', '90–103 ms', '83–84 ms'],
        ['Full sort of 7.1M rows', '5.7–5.8 s', '2.1–2.3 s'],
      ],
      note: 'The full sort misses its 3 s budget on one thread; a top-k path is the planned fix. The live page uses the one-thread build on a one-month snapshot, because GitHub Pages can’t send the headers WASM threads need.',
      source: 'https://github.com/Edwin580/receipts-engine/blob/main/docs/benchmarks/m4.md',
    },
    code: {
      title: 'A percentile without each row, for every row at once',
      note: 'Leave-one-out over a sorted group: removing a value shifts the rank by at most one place, so 443,530 exact answers take one pass.',
    },
    stack: ['Rust', 'WebAssembly', 'Apache Arrow', 'BLAKE3', 'Rayon'],
    tests: ['cargo test', 'proptest', 'pyarrow oracle', 'WASM = native parity', 'node:test'],
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
      'Books, progress, and bookmarks persist in IndexedDB. CI runs more than 200 Vitest unit tests and the Playwright suite on desktop and phone, plus a checker for the interface’s own rules.',
    ],
    figures: [
      { value: '147 ms', label: 'to index all 216,820 words of Moby-Dick' },
      { value: '≈ 1 ms', label: 'per search, typos and prefixes included' },
      { value: '278 KB', label: 'transferred on a first visit; offline after that' },
    ],
    flow: [
      { name: 'EPUB, PDF, TXT, MD', note: 'JSZip + DOMParser; pdf.js in up to two workers' },
      { name: 'Parse worker', note: 'words, paragraphs, chapters, pictures', where: 'worker' },
      { name: 'IndexedDB', note: 'books by content hash, progress, bookmarks' },
      { name: 'Search worker', note: 'inverted index, names, pacing extras', where: 'worker' },
      { name: 'Timeline', note: 'a Float32Array of weights that averages to your WPM' },
      { name: 'Playback clock', note: 'each word due at an absolute time' },
      { name: 'Word or page view', note: 'pinned focus letter, or a pacer over real pages' },
    ],
    problems: [
      {
        title: 'A rhythm that doesn’t drift',
        body: 'Chained timers add their lateness to every word. Each word is instead scheduled against the time it was due, so a late timer shortens the next wait rather than pushing the whole book back, and a tab that falls a second behind resyncs instead of racing to catch up.',
      },
      {
        title: 'The speed you set is the speed you get',
        body: 'Long words, punctuation, rare words and a character’s first appearance all get extra time. The weights are then normalized across the book, so 300 wpm is the true average and the time-left estimates stay accurate.',
      },
      {
        title: 'Search that stays instant on a long book',
        body: 'Indexing runs in a worker when a book opens, into typed arrays: sorted term ids for binary-search prefix matching and one Int32Array of positions per term. A misspelt word falls back to the closest term by bounded edit distance.',
      },
      {
        title: 'An interface with rules that are tested',
        body: 'The design rules (tokens only, 44px targets, sheets that close three ways, nothing wider than a 320px screen) are checked by a script over the source and a Playwright suite over the running app, so a regression fails CI rather than waiting to be noticed on a phone.',
      },
    ],
    bench: {
      caption: 'Vitest in Node on a 4-vCPU cloud container; search timings are the median of 25 runs on Moby-Dick (216,820 words, 17,567 distinct terms).',
      columns: ['', 'Result'],
      rows: [
        ['Build the search index', '147 ms'],
        ['Two-word query (“white whale”)', '0.50 ms'],
        ['Prefix as you type (“harpoo”)', '1.27 ms'],
        ['Two typos (“whyte wale”)', '0.75 ms'],
        ['Related passages (“ship captain sea”)', '0.53 ms'],
        ['First visit, transferred', '278 KB'],
      ],
      note: 'Measured for this page with the app’s own search module; the app runs the same code in a Web Worker.',
      source: 'https://github.com/Edwin580/RSVP-Reader/blob/main/src/lib/search.ts',
    },
    code: {
      title: 'The playback clock',
      note: 'The next word is due at the previous word’s due time plus its duration, not “now plus a delay”, so lateness never accumulates.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'pdf.js', 'IndexedDB', 'Web Workers', 'Service Worker'],
    tests: ['Vitest', 'Playwright (desktop + phone)', 'oxlint', 'UI-rule checker'],
    live: 'https://edwin580.github.io/RSVP-Reader/',
    source: 'https://github.com/Edwin580/RSVP-Reader',
  },
  {
    id: 'stems',
    name: 'stems',
    summary:
      'An infinite jukebox: it finds the moments in a song that match and plays it forever, splicing between them where you can’t hear the seam.',
    highlights: [
      'All the DSP is written from scratch in TypeScript: STFT, mel and chroma features, onset detection, a dynamic-programming beat tracker, self-similarity and phrase structure. The FFT is also AssemblyScript compiled to WASM SIMD.',
      'Every jump is bar-aligned, scored over four beats of context on each side, then aligned to the exact sample by cross-correlation, with a crossfade chosen from that correlation that never splits a drum hit.',
      'Playback runs in an AudioWorklet over SharedArrayBuffer PCM and starts as soon as the file is decoded; analysis and stem separation run in workers and hand over mid-block.',
      'Separates drums, bass, vocals and other with a built-in DSP separator, or with HTDemucs through onnxruntime-web on WebGPU or WASM. Nothing leaves the device.',
    ],
    figures: [
      { value: '3.4–3.8×', label: 'faster FFT in WASM SIMD than in JavaScript' },
      { value: '2.8 s', label: 'to analyse a 5-minute track' },
      { value: '394 → 24 MB', label: 'page heap with stems, using shared memory' },
    ],
    flow: [
      { name: 'Audio file', note: 'decoded to PCM in a SharedArrayBuffer' },
      { name: 'AudioWorklet', note: 'plays at once, straight through, until seams arrive', where: 'audio thread' },
      { name: 'Analysis worker', note: 'STFT → onsets → tempo → beats → features', where: 'worker' },
      { name: 'Beat graph', note: 'beat distances, meter, phrases, jump edges', where: 'worker' },
      { name: 'Planner', note: 'Tarjan SCC keeps playback out of dead ends' },
      { name: 'Seam builder', note: 'align, adaptive fade, varispeed, loudness' },
      { name: 'Splicer per stem', note: 'each stem gets its own crossfade law', where: 'audio thread' },
    ],
    problems: [
      {
        title: 'Seams you can’t hear',
        body: 'Beat times are only good to about 10 ms, which is audible. At each jump a small range of lags is searched for the offset where the incoming audio best matches the outgoing audio, so bass waveforms and transients line up in phase; the same correlation picks a constant-gain or equal-power fade.',
      },
      {
        title: 'Music that can never run out',
        body: 'Beats and jump edges form a graph. Playback is kept inside its largest strongly connected component, found with an iterative Tarjan, where every beat can reach every other, so there is no dead end near the end of the song.',
      },
      {
        title: 'Keeping the main thread out of the audio path',
        body: 'Jumps are planned well ahead inside the worklet, so a throttled background tab doesn’t interrupt the music. Sharing PCM instead of copying cut the stall when stems arrive from 564 ms to 132 ms. A service worker adds the COOP and COEP headers GitHub Pages can’t send.',
      },
    ],
    bench: {
      caption: 'Measured in the project’s own tests and in headless desktop Chromium.',
      columns: ['', 'Result'],
      rows: [
        ['2048-point FFT, WASM SIMD vs JavaScript', '3.4–3.8× faster'],
        ['Analyse a 5-minute track', '2.8 s (was 5.4 s)'],
        ['Built-in DSP separator', 'about 25× real time'],
        ['Main-thread stall when stems arrive', '564 → 132 ms'],
        ['Page heap with stems', '394 → 24 MB'],
        ['Tempo glide 110 → 126 BPM, median beat error', 'under 20 ms'],
        ['HTDemucs vocals, SDR on a synthetic song', '22.8 dB'],
      ],
      note: 'The goal of analysing a track in under a second was not reached: the time left is in feature loops and the O(n²) beat matrices, not the FFT.',
      source: 'https://github.com/Edwin580/stems/blob/main/docs/PLAN.md',
    },
    code: {
      title: 'Lining a seam up to the sample',
      note: 'Normalised cross-correlation between the outgoing and incoming audio. The lag that maximises it is where the jump lands.',
    },
    stack: ['TypeScript', 'Web Audio', 'AudioWorklet', 'WebAssembly SIMD', 'AssemblyScript', 'ONNX Runtime', 'WebGPU'],
    tests: ['Vitest on synthetic songs with ground truth'],
    live: 'https://edwin580.github.io/stems/',
    source: 'https://github.com/Edwin580/stems',
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
      'Trained with AdamW, warm-up and cosine decay, and early stopping, and evaluated with perplexity and Yang & Lerch musical metrics. The pytest suite runs on Python 3.10–3.12 in CI.',
    ],
    figures: [
      { value: '810,240', label: 'parameters, shipped as 1.6 MB of float16' },
      { value: '≈ 1.5 ms', label: 'per token for the JavaScript forward pass' },
      { value: '0.79 → 1.00', label: 'notes in key once sampling is key-constrained' },
    ],
    flow: [
      { name: 'MIDI files', note: 'loaded with repair for bad meta events' },
      { name: 'Beat-grid quantizer', note: '16th-note steps at any tempo; skyline melody' },
      { name: 'REMI tokens', note: 'bar, position, velocity, pitch, duration; 148 in all' },
      { name: 'Transformer', note: '4 layers, 4 heads, d = 128, RoPE, KV cache' },
      { name: 'Constrained sampling', note: 'grammar and key masks, then top-p' },
      { name: 'Web export', note: 'float16 weights + held-out prompts' },
      { name: 'Browser', note: 'the same forward pass in a Web Worker', where: 'browser' },
    ],
    problems: [
      {
        title: 'Two implementations that must agree',
        body: 'The browser demo is a second forward pass, written by hand in JavaScript. A pytest module runs it under Node and checks it against PyTorch: logits from the same weights with and without the sliding cache, token encodings and grammar masks along random walks, filtered probabilities and the musical metrics.',
      },
      {
        title: 'Output that is always valid music',
        body: 'The token grammar is regular (position, velocity, pitch, duration; positions rise within a bar), so the set of legal next tokens is computed at every step and sampling is masked to it. Key, register and monophony go through the same mask, with no retraining.',
      },
      {
        title: 'Rebuilding a notebook that looked like it worked',
        body: 'The original coursework notebook had fifteen faults, documented one by one: frames per second mistaken for steps per beat, validation windows overlapping training windows by 47 of 48 frames, a softmax over independent note probabilities. Each has a fix and a test.',
      },
    ],
    bench: {
      caption: '32 continuations of held-out prompts, 12 bars each, compared with the real next 12 bars. A short CPU run on a synthetic corpus, so read it as a comparison between models.',
      columns: ['', 'Transformer', '+ key constraint', 'Real music'],
      rows: [
        ['Notes in the best-fitting scale', '0.794', '1.000', '1.000'],
        ['Key clarity', '0.644', '0.799', '0.762'],
        ['Rhythm (onset) overlap with real music', '0.98', '0.99', ''],
        ['Interval overlap with real music', '0.69', '0.75', ''],
        ['Motif repetition ratio', '0.00', '0.00', '0.55'],
      ],
      note: 'Held-out perplexity is 3.01, behind the token LSTM’s 2.62 at this scale, and no model reuses motifs the way real music does. Both are in the README.',
      source: 'https://github.com/Edwin580/music-generator#results',
    },
    code: {
      title: 'Attention over the cache, by hand',
      note: 'One head of causal self-attention in plain JavaScript: scores against every cached key, a stable softmax, then a weighted sum of cached values.',
    },
    stack: ['Python', 'PyTorch', 'JavaScript', 'Web Workers', 'pretty_midi'],
    tests: ['pytest', 'PyTorch ↔ JavaScript parity', 'CI on Python 3.10–3.12'],
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
    figures: [
      { value: '1.5 GB → 2.3 MB', label: 'of EEG data, with nothing the model needs lost' },
      { value: '0.35 ms', label: 'to refit a model as you drag a time window' },
      { value: '1e-12', label: 'agreement with R across 66 reference fits' },
    ],
    flow: [
      { name: 'Raw recordings', note: 'eeg.csv, 1.5 GB, on OSF' },
      { name: 'Moment builder', note: 'Python: counts, sums, cross products per 25 ms bin' },
      { name: 'eeg.json', note: '2.3 MB of per-participant moments' },
      { name: 'GEE in JavaScript', note: 'a port of the gee package’s ugee.c', where: 'browser' },
      { name: 'SVG charts', note: 'hand-written; refit on every drag', where: 'browser' },
      { name: 'R reference fits', note: '66 models from the real package, checked in tests', where: 'tests' },
    ],
    problems: [
      {
        title: 'A published analysis that clustered nothing',
        body: 'gee() treats rows as one cluster only when they sit next to each other. The original code sorted by trial, so each row came from a different participant than the one before, and the “robust” errors were plain HC0 errors from trial-level OLS. The published numbers match that fit to every printed digit. Sorting by subject moves one effect from p = .027 to p = .057.',
      },
      {
        title: 'Refitting 1.5 GB in a browser tab',
        body: 'With one 0/1 predictor, the estimator only needs each participant’s count, sum and sum of squares per condition, plus cross products between time bins for an arbitrary window. Storing those instead of trials makes any window refit in a third of a millisecond.',
      },
      {
        title: 'Matching R, not approximating it',
        body: 'The port follows the C source: the same start from the glm fit, the same moment estimates for scale and correlation, the same stopping rule, then the sandwich variance. It agrees to about twelve digits on the analysis windows and seven on binned ones, where the moments are stored as 32-bit floats.',
      },
    ],
    bench: {
      caption: 'The JavaScript port against R 4.3.3 with gee 4.13-26, in the repository’s Node tests.',
      columns: ['', 'Result'],
      rows: [
        ['Reference fits compared', '66'],
        ['Relative difference, analysis windows', 'about 1e-12'],
        ['Relative difference, binned windows', 'about 2e-7'],
        ['One fit', 'about 0.35 ms'],
        ['Clusters in the published fit', 'about 5,000 (should be 34)'],
        ['Fashion N2 effect at Pz, published → corrected', 'p = .027 → .057'],
      ],
      note: 'Task timing is reported, not claimed: a browser is not a lab display, so the page shows the measured durations and frame rate.',
      source: 'https://github.com/Edwin580/EEG-Study-Replication#technical-notes',
    },
    code: {
      title: 'Scale and correlation, estimated the way gee does',
      note: 'One iteration’s moment estimates from per-participant sums alone. The cross term is every pair of residuals within a participant, without visiting a single trial.',
    },
    stack: ['R', 'Quarto', 'JavaScript', 'Python', 'SVG'],
    tests: ['node:test against R fixtures', 'link checker'],
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
    figures: [
      { value: '½ frame', label: 'the most a 400 ms word can miss its target by' },
      { value: '1,000', label: 'simulated studies per run of the power figure' },
      { value: '7 of 7', label: 'CDN scripts pinned and hash-verified in CI' },
    ],
    flow: [
      { name: 'Config + word lists', note: 'every timing, grey level and key in one file' },
      { name: 'Design', note: 'seeded order, six repeats, a break halfway' },
      { name: 'Word-probe plugin', note: 'cross → word → square, on animation frames' },
      { name: 'Data rows', note: 'answers plus measured durations per trial' },
      { name: 'Analysis', note: 'rates by valence; d′ for the cover task' },
      { name: 'Debrief + CSV', note: 'exported in the browser; nothing uploaded' },
    ],
    problems: [
      {
        title: 'Honest timing on an unknown display',
        body: 'A 400 ms word can only last a whole number of frames. The plugin measures the frame interval as it runs and switches on the frame where less than half a frame of the target is left, then saves the measured durations on every row, so a dropped frame is visible in the data instead of silently lengthening the prime.',
      },
      {
        title: 'Two answers from one trial',
        body: 'In the original design, pressing Space for a repeated word replaced the brightness judgement. Here the repeat key is listened for from word onset to the end of the trial, separately, so the cover task never costs a data point.',
      },
      {
        title: 'A power analysis you can check by eye',
        body: 'The project page simulates 1,000 studies in the browser, tests each with a one-sample t test built on the regularized incomplete beta function, and plots them beside an analytic curve. The two agree within a few points.',
      },
    ],
    bench: {
      caption: 'How a 400 ms word rounds to whole frames, by the plugin’s half-frame rule.',
      columns: ['Display', 'Frames', 'Shown for'],
      rows: [
        ['60 Hz', '24', '400.0 ms'],
        ['75 Hz', '30', '400.0 ms'],
        ['90 Hz', '36', '400.0 ms'],
        ['120 Hz', '48', '400.0 ms'],
        ['144 Hz', '58', '402.8 ms'],
      ],
      note: 'The page’s own “Frames” figure measures this live on your display. 23 unit tests and 8 Playwright tests cover the design, scoring and a full simulated session.',
      source: 'https://github.com/Edwin580/Prolific-Experiment#technical-notes',
    },
    code: {
      title: 'Changing the display on the right frame',
      note: 'Each animation frame, the plugin updates its estimate of the frame interval and commits a change when the next frame would land past the target.',
    },
    stack: ['JavaScript', 'jsPsych 8', 'requestAnimationFrame', 'Prolific'],
    tests: ['node:test', 'Playwright', 'SRI hash check'],
    live: 'https://edwin580.github.io/Prolific-Experiment/',
    source: 'https://github.com/Edwin580/Prolific-Experiment',
  },
  {
    id: 'better-video',
    name: 'better-video',
    summary:
      'A screen recorder for pull requests: pick an area from the tray, choose GIF or MP4, and get a small clip that zooms in on each click. A CLI does the same from a terminal or an agent. Every clip on this page was recorded with it.',
    highlights: [
      'Recording and export are separate. On Windows, a native engine grabs frames with DXGI desktop duplication, keeps only the 32×32 tiles that changed, and writes them LZ4-compressed; elsewhere ffmpeg records, and the same exporter takes over.',
      'GIFs come from a built-in encoder: an exact palette when a clip uses 255 colours or fewer (median cut otherwise), an LZW coder, and frames that store only the rectangle that changed. MP4 uses Windows’ own H.264 encoder.',
      'Zooms are planned like an editor would cut them: nearby clicks share one view, the camera holds still between them and moves on a critically damped spring, and no zoom hides a click.',
      'The pointer is sampled at about 120 Hz and drawn at export as a smoothed, anti-aliased arrow, with optional click rings. For scripts and agents there is --json output, bv stop and a Claude skill. About 100 tests, no network access.',
    ],
    figures: [
      { value: '8.3 ms', label: 'between pointer samples, measured on these clips' },
      { value: '60 fps', label: 'exports, with the zoom and pointer redrawn each frame' },
      { value: '0', label: 'network connections, in bv or its dependencies' },
    ],
    flow: [
      { name: 'Capture', note: 'DXGI duplication or GDI; ffmpeg on macOS and Linux' },
      { name: 'Changed tiles', note: '32×32 tiles, a whole band skipped in one compare' },
      { name: '.bvraw + pointer track', note: 'LZ4 frames; position and buttons at 120 Hz' },
      { name: 'Zoom planner', note: 'shots planned from the whole take’s clicks', where: 'export' },
      { name: 'Renderer', note: 'crop and scale, drawn pointer, rings, frame', where: 'export' },
      { name: 'Encoders', note: 'built-in GIF; H.264 or VP9 for video', where: 'export' },
    ],
    problems: [
      {
        title: 'A camera that is already there when you click',
        body: 'Zoom is applied at export, when the whole recording is known. Clicks less than 3 s apart that fit one view share a zoom, the camera is fully in half a second before the first click, and two zooms are never closer than 1.5 s, so the clip doesn’t yo-yo.',
      },
      {
        title: 'Recording that costs almost nothing when the screen is still',
        body: 'Frames are compared in the capture buffer, a band of tiles at a time; an unchanged band is settled by one comparison, and only changed tiles are copied and compressed. The exporter then re-renders only the rows under changed pixels.',
      },
      {
        title: 'A pointer drawn after the fact',
        body: 'The pointer isn’t in the captured frames. Its path is smoothed with a spring, pulled back onto the recorded path around each click so it is exactly where you clicked, and drawn as a signed-distance arrow through the zoom. A still pointer leaves frames identical, which keeps GIFs small.',
      },
      {
        title: 'A command line an agent can drive',
        body: 'With --json, stdout is exactly one line; exit codes separate errors, bad arguments and cancelled takes; bv stop ends a background recording and waits for the export. Recording this page’s clips found one gap, a region past the screen edge failing with ffmpeg’s bare “Invalid argument”, which is now caught up front.',
      },
    ],
    bench: {
      caption: 'Measured while recording this page’s clips: Linux, Xvfb, the ffmpeg engine, 1280×800.',
      columns: ['', 'Result'],
      rows: [
        ['Pointer sample interval, median', '8.3 ms'],
        ['Longest gap between pointer samples', '16.2 ms'],
        ['Distinct frames in 1.8 s of motion at --fps 60', '108'],
        ['Capture gaps over 50 ms in a 21 s take', '0'],
        ['A 36 s, 60 fps clip, exported by bv', '1.0 MB'],
      ],
      note: 'The native Windows engine (DXGI capture, built-in GIF and H.264) can’t be measured from Linux, so there are no numbers for it here.',
      source: 'https://github.com/Edwin580/better-video#how-it-works',
    },
    code: {
      title: 'Keeping only the tiles that changed',
      note: 'The inner loop of the raw recorder: an unchanged band of tiles is skipped with one comparison, and a changed tile is copied into both the record and the reference frame.',
    },
    stack: ['Rust', 'Win32', 'DXGI', 'Media Foundation', 'LZ4', 'ffmpeg', 'X11'],
    tests: ['cargo test', 'clippy -D warnings', 'CI on Linux, macOS, Windows'],
    source: 'https://github.com/Edwin580/better-video',
  },
];

/* Dates */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parts = (ym: YM) => ym.split('-').map(Number) as [number, number];

/** ["Jun", "Aug 2026"], or ["Nov 2025", "May 2026"] when the years differ. */
export const dateRange = ({ start, end }: Pick<Role, 'start' | 'end'>): [from: string, to: string] => {
  const [sy, sm] = parts(start);
  const [ey, em] = parts(end);
  return [sy === ey ? MONTHS[sm - 1]! : `${MONTHS[sm - 1]} ${sy}`, `${MONTHS[em - 1]} ${ey}`];
};
