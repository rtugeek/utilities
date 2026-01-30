import type { RouteRecordRaw } from 'vue-router'
import ConvertWidget from './Convert.widget'

const path = ConvertWidget.path
const name = ConvertWidget.name

const ConvertWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () => import('./ConvertWidgetView.vue'),
  },
]

export default ConvertWidgetRoutes
