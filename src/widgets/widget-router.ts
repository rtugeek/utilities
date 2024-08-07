import type { RouteRecordRaw } from 'vue-router'
import ForexWidgetRoutes from './forex/ForexWidgetRoutes'
import KeyStrokeWidgetRoutes from '@/widgets/key-stroke/KeyStrokeWidgetRoutes'
import WaterReminderWidgetRoutes from '@/widgets/water-reminder/WaterReminderWidgetRoutes'

// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...KeyStrokeWidgetRoutes,
  ...WaterReminderWidgetRoutes,
  ...ForexWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
