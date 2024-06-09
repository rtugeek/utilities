import { WidgetJsPlugin } from '@widget-js/vue3'
import '@widget-js/vue3/dist/style.css'
import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(MotionPlugin)
app.use(router)
app.use(WidgetJsPlugin)
app.mount('#app')
