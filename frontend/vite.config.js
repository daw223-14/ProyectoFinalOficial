import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: '0.0.0.0', // Configura la dirección IP de tu servidor aquí
  },
});
