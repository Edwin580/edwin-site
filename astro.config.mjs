// @ts-check
import { defineConfig } from 'astro/config';

// SITE / BASE_PATH are injected by the deploy and preview workflows; defaults work locally.
export default defineConfig({
  site: process.env.SITE || 'https://edwincortazo.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  // 'assets' rather than the default '_astro': GitHub Pages branch builds hide _-prefixed folders.
  build: { inlineStylesheets: 'always', assets: 'assets' },
  // Lets the build rasterize the text-only link-preview card (src/assets/og.svg) to a JPEG.
  image: { dangerouslyProcessSVG: true },
  compressHTML: true,
});
