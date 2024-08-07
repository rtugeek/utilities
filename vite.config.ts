import { URL, fileURLToPath } from 'node:url'
import widget from '@widget-js/vite-plugin-widget'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/utilities',
  plugins: [vue(), UnoCSS(), widget({ generateFullNamePackage: true }), AutoImport({
    resolvers: [ElementPlusResolver()],
  }), Components({
    resolvers: [ElementPlusResolver()],
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
