import { createRouter, createWebHashHistory } from 'vue-router'
import WidgetRouter from '../widgets/widget-router'

const router = createRouter({
  history: createWebHashHistory('/utilities'),
  routes: [
    ...WidgetRouter,
  ],
})

export default router
