# edwin-site

Personal site. Astro + TypeScript, static output, no client framework.

- `src/data/profile.ts` holds all content: edit roles, projects and links there.
- The hero dot field is a canvas 2D spring simulation that pauses off-screen and respects `prefers-reduced-motion`.
- <kbd>⌘K</kbd> / <kbd>/</kbd> opens the command menu, and <kbd>T</kbd> toggles the theme.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + static build to dist/
```

## Deploys

- **Production:** every push to `main` builds the site and publishes it to the `gh-pages` branch
  (`.github/workflows/deploy.yml`).
- **Previews:** every commit on a pull request is published to
  `https://edwin580.github.io/edwin-site/pr-preview/pr-<number>/`, and a comment on the PR links to it
  (`.github/workflows/preview.yml`). Previews are removed when the PR closes and aren't indexed by search engines.

GitHub Pages must be set to **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.
