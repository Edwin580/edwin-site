// @ts-check
import { defineConfig } from 'astro/config';

// SITE / BASE_PATH are injected by the deploy and preview workflows; defaults work locally.
export default defineConfig({
  site: process.env.SITE || 'https://edwin580.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  // 'assets' rather than the default '_astro': GitHub Pages branch builds hide _-prefixed folders.
  build: { inlineStylesheets: 'always', assets: 'assets' },
  compressHTML: true,
});
