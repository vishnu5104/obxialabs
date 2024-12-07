import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  // Optional: Server-side rendering configuration
  output: 'server', // or 'server' if you want SSR
});
