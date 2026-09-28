import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({ svgrOptions: { exportType: 'default' } })],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  css: { preprocessorOptions: { less: { javascriptEnabled: true } } },
  server: { port: 3000, strictPort: true },
  build: { outDir: 'build' },
});
