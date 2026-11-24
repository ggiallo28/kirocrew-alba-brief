import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

// Il nome del bundle contiene la versione: il dashboard non può riusare una copia vecchia in memoria.
const { version } = JSON.parse(readFileSync(new URL('../app.json', import.meta.url), 'utf8'))

export default defineConfig({
  plugins: [react()],
  define: { __ALBA_VERSION__: JSON.stringify(version) },
  build: {
    lib: { entry: 'src/pages/Alba.tsx', formats: ['es'], fileName: () => `alba-${version}.mjs` },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@kirocrew/app-sdk', '@kirocrew/app-sdk/ui', 'lucide-react'],
    },
  },
})
