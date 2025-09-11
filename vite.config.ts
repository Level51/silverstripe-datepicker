import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: './client/index.ts',
      name: 'silverstripeDatepicker',
      fileName: () => 'silverstripeDatepicker.js',
      formats: ['iife'],
    },
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./client', import.meta.url)),
    },
  },
});
