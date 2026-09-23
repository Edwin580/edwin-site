// @ts-check
import { defineConfig } from 'astro/config';

// SITE / BASE_PATH are injected by the Pages workflow; defaults work locally.
export default defineConfig({
  site: process.env.SITE ?? 'https://edwin580.github.io',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
