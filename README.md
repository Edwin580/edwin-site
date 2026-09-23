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

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`
(set **Settings → Pages → Source** to *GitHub Actions*).
