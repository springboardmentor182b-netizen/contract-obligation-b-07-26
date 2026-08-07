import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to transform JSX in .js files using oxc
const transformJsxInJs = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.match(/.*\.js$/)) {
      return null;
    }

    return await transformWithOxc(code, id, {
      lang: 'jsx',
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    transformJsxInJs(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
