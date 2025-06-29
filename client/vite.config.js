import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ← This allows access from LAN (e.g., 192.168.x.x)
    port: 5173,       // optional but good to explicitly set
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
