import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // Exclude locked/busy files from the watcher (e.g. Android screenshots still open)
      ignored: ['**/public/img/Screenshot_*.jpg'],
    },
  },
})

