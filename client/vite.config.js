import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'treat-source-js-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (id.includes('/src/') && id.endsWith('.js')) {
          return transformWithOxc(code, id, { lang: 'jsx', jsx: { runtime: 'automatic' } })
        }
      },
    },
    react({ include: /\.[jt]sx?$/ }),
  ],
})
