import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'https://supportdesk-backend-1.onrender.com',
      changeOrigin: true,
      secure : false,
    }
  }
})
