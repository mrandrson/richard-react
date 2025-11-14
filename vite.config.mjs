import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  base: '/richard-react/',
  plugins: [react(), glsl()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.glsl': 'text',
      },
    },
  },
});
