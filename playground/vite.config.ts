import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fast-computing/tokens': path.resolve(__dirname, '../packages/tokens/src'),
      '@fast-computing/mui-theme': path.resolve(__dirname, '../packages/mui-theme/src'),
      '@fast-computing/components': path.resolve(__dirname, '../packages/components/src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
