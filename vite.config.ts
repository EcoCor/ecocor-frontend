/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  // TODO: Make sure PROXY_PATH is configured without trailing '/' everywhere
  const proxyPath = env.PROXY_PATH || '/exist/restxq/ecocor';

  return {
    base: '/',
    plugins: [
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
      react(),
      tailwindcss(),
    ],
    build: {
      outDir: 'build',
    },
    server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8090/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, proxyPath),
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      css: true,
      reporters: ['verbose'],
    },
  };
});
