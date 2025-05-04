import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // ← this must match your repo name
  base: '/portfolio/',
  plugins: [react()],
  build: {
    // output to docs/ so GitHub Pages can serve it
    outDir: 'docs'
  }
})
