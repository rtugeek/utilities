import { createRouter, createWebHashHistory } from 'vue-router'
import WidgetRouter from '../widgets/widget-router'

const router = createRouter({
  history: createWebHashHistory('/utilities'),
  routes: [
    ...WidgetRouter,
    {
      path: '/',
      name: `${name}.config`,
      component: () => import(/* webpackChunkName: "com.wisdom.widgets.water_reminder.config" */ '../widgets/LandingPage.vue'),
    },
  ],
})

export default router
