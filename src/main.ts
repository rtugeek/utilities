import { MotionPlugin } from '@vueuse/motion'
import { WidgetJsPlugin } from '@widget-js/vue3'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@widget-js/vue3/dist/style.css'
import '@/assets/main.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(MotionPlugin)
app.use(router)
app.use(WidgetJsPlugin)
app.mount('#app')
