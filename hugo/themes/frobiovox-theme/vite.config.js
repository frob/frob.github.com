import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'static',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: 'src/main.js',
        mermaid: 'src/mermaid.js',
      },
      output: {
        entryFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'css/[name][extname]'
          return '[name][extname]'
        },
      },
    },
  },
})
