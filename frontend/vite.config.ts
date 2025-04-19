import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Erro no proxy:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Enviando requisição:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Resposta recebida:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
}) 