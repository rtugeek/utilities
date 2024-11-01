import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import widget from '@widget-js/vite-plugin-widget'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
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
