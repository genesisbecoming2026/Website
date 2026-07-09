import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Genesis Becoming — production build config.
// `npm run build` outputs a static site to /dist (Netlify publish directory).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
