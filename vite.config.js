import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': '/src' } },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-i18n':     ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-icons':    ['lucide-react'],
          'candidate':       ['./src/pages/candidate/AuthPage.jsx','./src/pages/candidate/Dashboard.jsx'],
          'admin':           ['./src/pages/admin/AdminDashboard.jsx'],
        }
      }
    },
    minify: 'esbuild',
    terserOptions: { compress: { drop_console: true, drop_debugger: true } },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react','react-dom','react-router-dom','react-i18next','i18next','@supabase/supabase-js','lucide-react']
  },
  server: { port: 5173, host: true },
  preview: { port: 4173 }
})
