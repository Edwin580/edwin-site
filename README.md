# edwin-site

My personal site: experience, projects, and resume on one page.

- All content lives in `src/data/profile.ts`. Edit roles, projects, and links there.
- Company logos go in `src/assets/logos/`, named after the role id (for example `sigma.png`).
- The link-preview card (`src/assets/og.png`) and the `EC` icons in `public/` are rendered from
  `scripts/og-card.html` and `public/favicon.svg`. Rerun `scripts/og-card.mjs` after changing the name or role.
- Built with Astro as plain static HTML and CSS. It uses system fonts and ships no JavaScript.

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
