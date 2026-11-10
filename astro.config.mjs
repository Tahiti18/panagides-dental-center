import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://panagides-dental-center.netlify.app',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
  // Compile the site script down to ES2017 so older browsers can parse it (Vite's default emits
  // ?. ?? and catch {} that Safari ≤ 13.0, Chrome ≤ 79 and Firefox ≤ 73 reject; one syntax error
  // stops the whole script). The CSS target only expands `inset` into top/right/bottom/left for
  // Safari < 14.1; modern browsers render it identically.
  vite: {
    build: {
      target: ['es2017', 'chrome61', 'edge79', 'firefox60', 'safari11'],
      cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
    },
  },
});
