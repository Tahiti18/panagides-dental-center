import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://panagides-dental-center.netlify.app',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
