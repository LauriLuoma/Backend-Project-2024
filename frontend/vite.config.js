import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      proxy: {
        '/api': 'http://localhost:3000'
      },
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, '../node_modules/react'),
        'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      },
      preserveSymlinks: true,
    },
    cacheDir: path.resolve(__dirname, '../.vite-cache'),
});
