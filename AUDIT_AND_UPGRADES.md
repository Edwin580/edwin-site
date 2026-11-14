# Audit and upgrades, November 2026

An audit of edwincortazo.com and the seven projects it shows, what was changed as a result, and what was left alone.
The work is on the branch `claude/portfolio-audit-upgrades-videos-r60h48` in each repository.

## How it was audited

- Read each project's repository: source, docs, benchmarks and tests, not only the README.
- Ran every repository's own checks (results under "Checks run").
- Loaded edwincortazo.com and the six live project sites in headless Chromium at 1280 px and 375 px, recording
  console errors, failed requests, sideways overflow, small tap targets, unlabelled controls and transfer size, and
  requested every link on each page (74 in all).
- Recorded a clip with better-video on Linux, then exercised the paths the demos don't use: 60 fps, WebM, GIF, styled
  frames, `--json` with `bv stop`, odd-sized regions, a region past the screen edge, follow zoom, trim, and
  re-exporting a kept raw take.

## 1. Bugs and regressions

| Where | Found | Outcome |
|---|---|---|
| EEG replication page | Three links to the page's own scripts 404 (`/blob/main/site/js/…`; the files are under `docs/site/js/`). | Fixed, with a test that checks every link from the page into the repository names a file that exists. It fails on the old links. |
| better-video (Linux) | `--region` past the screen edge printed "Recording…" and then failed with ffmpeg's "Error opening input file :99+600,400. Invalid argument", exit 1. | Fixed: the X screen's size is checked first, the message says which edge the region crosses, exit 2 like other bad arguments. Unit-tested. |
| edwincortazo.com | The email link is a 19 px-tall tap target on a phone. | Fixed: 35 px, nothing moves. |
| edwincortazo.com | Chapter's card says "196 Vitest unit tests and 67 Playwright tests"; main has 212 and 78. better-video's says 99; main has 97. | Reworded so the numbers don't go stale ("more than 200", "about 100"). |
| edwincortazo.com | stems is live and is the largest project by engineering, and isn't on the site. | Added. |
| Demo recordings | Chapter's driver no longer ran: the settings menu changed (the pacer is two switches now, not "Both"). | Driver updated; all drivers moved to a window with no browser chrome. |
| Demo clips | 960×600 at 24 fps: soft on a 2x screen, and the zoom and pointer visibly step. | Re-recorded at 1280×800, 60 fps (section 3). |

Checked and found clean: no console errors or failed requests on any of the seven sites; no sideways overflow at
375 px (a `<pre>` on the music page scrolls inside its own box); every image has alt text; the two "unlabelled
inputs" on Chapter and stems are hidden file inputs behind labelled buttons. Of 74 links, the only non-200s besides
the EEG ones are sites that refuse automated requests (doi.org, LinkedIn, the city's open-data portal).

Not fixed, because they are choices rather than faults: several project pages use small text links (15–22 px tall)
in running prose and navigation. That is how the plain, paper-like pages are designed, and all but Chapter are
written for desktop reading.

## 2. Engineering the cards weren't showing

The cards had a one-line summary and four bullets behind "How it works". The bullets were accurate, but the repos
hold a good deal more that a reader would never find: measured benchmarks with budgets and misses, architecture
decision records, a parity test between two implementations of a model, a statistical bug found in a published
paper. Each card now opens four panels, one at a time:

- **How it works**: the original bullets.
- **Architecture**: the data's path as numbered stages (marked where a stage runs in a worker, on the audio thread or
  in the browser), then the hard parts and how each was solved.
- **Code**: a short excerpt copied word for word from the repository by `scripts/snippets.mjs`, with a link to the
  exact lines at that commit.
- **Benchmarks**: a small table, how it was measured, and what fell short.

Three measured numbers sit on the card itself, and a second quiet line under the stack says how it is tested.

| Project | Figures on the card | Excerpt |
|---|---|---|
| Receipts | 1.2–1.35 s to load and verify 7.1M rows; ≤ 15 ms to trace 443,530 rows; 63 ms vs a 2.5 s re-run | Exact leave-one-out percentiles in one pass |
| Chapter | 147 ms to index Moby-Dick; about 1 ms a search; 278 KB first visit | The drift-free playback clock |
| stems | 3.4–3.8× FFT in WASM SIMD; 2.8 s to analyse 5 minutes; 394 → 24 MB heap | Sample-accurate seam alignment |
| Music Generation | 810,240 parameters in 1.6 MB; about 1.5 ms a token; notes in key 0.79 → 1.00 | Attention over the KV cache in plain JavaScript |
| Does Morality Pop Out? | 1.5 GB → 2.3 MB; 0.35 ms a refit; 1e-12 agreement with R | The gee package's moment estimates, from sums alone |
| Brightness Perception | half a frame; 1,000 simulated studies; 7 of 7 scripts hash-verified | The half-frame rule on animation frames |
| better-video | 8.3 ms pointer samples; 60 fps; no network | Changed-tile recording |

Where the numbers come from: each project's own benchmark docs and READMEs, except two sets measured for this page.
Chapter's search timings were taken by running the app's search module over Moby-Dick (median of 25 runs).
better-video's were taken from the recordings in section 3. Nothing is estimated, and results that fell short are
shown next to the ones that didn't: Receipts' full sort misses its budget on one thread, stems didn't reach
sub-second analysis, the Transformer trails the LSTM on perplexity and never reuses a motif.

The panels follow the site as it is: system fonts, the same quiet chevron the old dropdown had, no pills or colour.
Without JavaScript all four panels are simply on the page under their headings, and printing shows them all.

## 3. Clips, recorded with better-video

Every clip was re-recorded by driving the live site with a real pointer while `bv` recorded, zooming on each click.

| Clip | What it shows | Length | MP4 | WebM |
|---|---|---|---|---|
| Receipts | Pick a complaint type and borough, drill into a district, read the complaints behind the number | 21 s | 984 KB | 1,627 KB |
| Chapter | Add a free book, word mode, glance back, typo-tolerant search, page mode in sepia, a timed session | 48 s | 1,372 KB | 1,947 KB |
| stems (new) | Load the demo song, play, Jumpy style, the circle map, split stems, the instrumental preset, mute drums | 35 s | 798 KB | 1,153 KB |
| Music Generation | Drag the temperature, take another sample, play it | 18 s | 518 KB | 742 KB |
| Does Morality Pop Out? | Run the masked-word task, switch analysis windows, switch the comparison | 25 s | 1,389 KB | 1,739 KB |
| Brightness Perception | Run trials, then the power simulation with a smaller effect and more participants | 25 s | 1,357 KB | 1,765 KB |
| better-video | The Windows tray picker, then a terminal running `bv doctor` and `bv record`, the clip it made, and the result line | 42 s | 467 KB | 665 KB |

- **Before:** 960×600, 24 fps, recorded with the browser's tab strip cropped off.
- **After:** 1280×800, 60 fps. The page is laid out at 1024×640 and drawn at 1.25×, in a window with no browser
  chrome, so the layout is a small laptop's and the text is sharp in a card on a 2x screen.
- Clips are fetched only when their card scrolls into view, play muted and looped, pause off screen, and are neither
  shown nor downloaded under reduced motion; the poster is the clip's first frame. This was already how the page
  worked and is unchanged.
- H.264 is listed first and is what every current browser plays. The VP9 files came out larger than the H.264 ones
  at matching quality on this content, so they are only a fallback for browsers built without H.264.

Not done: there is no hero video. The page opens with a name and a list of jobs, and a clip above that would work
against it.

## 4. Open pull requests

Thirteen were open across four repositories. Each was checked against current main. Relevant ones were merged into
this branch of their repository, with conflicts resolved and the full checks rerun; nothing was pushed to the pull
requests' own branches, and none was closed.

| PR | Verdict | What happened |
|---|---|---|
| edwin-site #25, reduced motion and date ranges | Stale | Both changes are already on main, done differently in #26. Safe to close. |
| better-video #25, one recordings folder, `bv list`, `--pretty` | Relevant | In this branch; the region fix sits on top of it. 104 tests pass. |
| stems #21, iOS look, new song maps | Relevant | Merged in. |
| stems #19, 8D audio | Relevant | Merged in. It and #21 both rewire the player's output; the Live map's analyser now taps the output after the 8D stage. 70 tests pass. |
| Chapter #74, reading calendar | Relevant | Merged in. |
| Chapter #72, review fixes | Relevant | Merged in. A restore now keeps both a missing cover (main) and a read mark (#72). |
| Chapter #63, Focus mode | Relevant | Merged in. |
| Chapter #67, Download to device | Relevant | Merged in. |
| Chapter #65, highlight bookmarks | Relevant | Merged in, threaded through the page renderer that replaced the code it was written against. It broke an existing regression test (#66) on phones: the Save highlight button pushed the text up under the finger. The button now floats. |
| Chapter #64, Paper theme | Stale | Written against the settings menu and stylesheet from before the redesign; it conflicts in five files and would need redoing, not rebasing. |
| Chapter #53, don't restart a finished book | Stale | Main has since decided the opposite: pressing play on a finished book starts it again and moves it back to the Reading shelf. |
| Chapter #45, numbered pages | Stale | 45 merges behind; pagination has been rewritten since. |
| Chapter #56, audiobook sync | Parked | 4,900 lines, 16 conflicts, and it adds a YouTube player to an app whose pitch is that it works offline. A product decision, not a rebase. |

## Checks run

| Repository | Result |
|---|---|
| edwin-site | `astro check` 0 errors, build passes. In headless Chromium at 1280, 390 and 320 px: 7 cards, each clip plays at 1280×800 with 120 frames in 2 s and none dropped, each panel opens alone and closes, no sideways scroll, buttons at least 44 px tall on phones, no console errors, 28 of 29 links return 200 (LinkedIn refuses bots). No video requests under reduced motion; all 28 panels visible without JavaScript. |
| better-video | `cargo fmt --check`, `clippy -D warnings`, 104 tests pass. The `tray` feature can't be built here (no GTK headers); CI covers it. |
| Chapter | Type-check, lint and UI rules clean; 228 unit tests; Playwright 176 passed, 18 skipped by design, 0 failed. |
| stems | Type-check clean, 70 tests, build passes. |
| EEG replication | 9 tests pass. |
| Receipts | 100 Rust tests pass. Unchanged. |
| Music Generation | pytest passes. Unchanged. |
| Brightness Perception | 23 unit tests, 7 of 7 SRI hashes verified. Unchanged. |

## Left for you

- **Merging.** The project branches hold other people's pull requests merged together, so they are best reviewed as
  a stack: better-video, stems and Chapter each need one pull request from this branch, after which the PRs marked
  Relevant above can be closed as included.
- **Chapter's merged features** pass every test, but Focus, Download and highlights were written before the redesign
  and have not been looked at on a real phone since.
- **The site's numbers** for Chapter and better-video describe main, not these branches.
- **Receipts' live snapshot** now reads "September 2026" while its README says July 2025.
