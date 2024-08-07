import type { RouteRecordRaw } from 'vue-router'
import ForexWidget from './Forex.widget'

const path = ForexWidget.path
const name = ForexWidget.name

const configUrl = ForexWidget.configPagePath!.split('?')[0]
const ForexWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "widgetjs.cn.utilities.forex" */ './ForexWidgetView.vue'
      ),
  },
  {
    path: configUrl!,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.forex.config" */ './ForexWidgetConfigView.vue'),
  },
]

export default ForexWidgetRoutes
