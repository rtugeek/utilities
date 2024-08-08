import type { RouteRecordRaw } from 'vue-router'
import ForexWidget from './Forex.widget'

const path = ForexWidget.path
const name = ForexWidget.name

const ForexWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "widgetjs.cn.utilities.forex" */ './ForexWidgetView.vue'
      ),
  },
]

export default ForexWidgetRoutes
