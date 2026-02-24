import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { getLocalIPv4 } from './config/getLocalIP';

const localIP = getLocalIPv4();
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  define: {
    'import.meta.env.VITE_LOCAL_IP': JSON.stringify(localIP),
  },
  plugins: [react(), tailwindcss()],
  // server: { port: 3000 },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
