import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:5001', // Your backend's port
        target: 'https://lost-and-found-e790.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})