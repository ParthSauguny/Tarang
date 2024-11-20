import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/request':{
        target: "http://localhost:8000/",
        changeOrigin: true,
      },
    }
  },
  plugins: [react()],
})
