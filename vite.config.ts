import { defineConfig } from 'vite';

export default defineConfig({
  // Menentukan base path relatif agar aman saat di-hosting
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});