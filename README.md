# edwin-site

My personal site: experience, projects, and resume on one page.

- All content lives in `src/data/profile.ts`. Edit roles, projects, and links there. Each project carries what its
  card opens: how it works, the architecture (the data's path and the hard parts), a table of measured results, and
  what its code excerpt shows.
- The code excerpts are copied out of the projects' own repositories into `src/data/snippets.json`, with a link to
  the exact lines. With the project checkouts next to this one, `node edwin-site/scripts/snippets.mjs` (run from the
  folder that holds them) refreshes them.
- Each project's clip is recorded with better-video; `scripts/demos/` has a driver per project.
- The link-preview card is `src/assets/og.jpg`, rendered from `src/assets/og.svg` (text only).
  The `EC` icons in `public/` come from `public/favicon.svg`. Rerun `scripts/images.mjs` after changing either SVG.
- Built with Astro as plain static HTML and CSS, with system fonts. The only JavaScript is a few inline lines that
  play each project video while it is on screen and open one "under the hood" panel at a time; without it the page
  shows the screenshots and every panel, one after another.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + static build to dist/
```

## Deploys

- **Production:** every push to `main` builds the site and publishes it to the `gh-pages` branch, served at
  `https://edwincortazo.com` (`.github/workflows/deploy.yml`).
- **Previews:** every commit on a pull request is published to
  `https://edwincortazo.com/pr-preview/pr-<number>/`, and a comment on the PR links to it
  (`.github/workflows/preview.yml`). Previews are removed when the PR closes and aren't indexed by search engines.

GitHub Pages must be set to **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**, with
**Custom domain** set to `edwincortazo.com`. The deploy keeps the `CNAME` file GitHub writes to `gh-pages`.
