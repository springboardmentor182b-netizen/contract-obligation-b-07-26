import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

const jsxInJavaScriptFiles = {
  name: 'contractiq-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.includes('/src/') || !id.endsWith('.js')) return null
    return transformWithOxc(code, id, {
      lang: 'jsx',
      jsx: { runtime: 'automatic' },
    })
  },
}

export default defineConfig({
  oxc: {
    include: /\.[jt]sx?$/,
    jsx: {
      runtime: 'automatic',
    },
  },
  plugins: [
    jsxInJavaScriptFiles,
    react({
      include: /\.[jt]sx?$/,
      babel: {
        presets: [
          ['@babel/preset-react', {
            runtime: 'automatic'
          }]
        ],
      }
    }),
  ],
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        warn(warning)
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
