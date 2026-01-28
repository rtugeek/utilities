import type { RouteRecordRaw } from 'vue-router'
import KeyStrokeWidgetRoutes from '@/widgets/key-stroke/KeyStrokeWidgetRoutes'
import NoteWidgetRoutes from '@/widgets/note/NoteWidgetRoutes'

import WaterReminderWidgetRoutes from '@/widgets/water-reminder/WaterReminderWidgetRoutes'
import ForexWidgetRoutes from './forex/ForexWidgetRoutes'
// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...KeyStrokeWidgetRoutes,
  ...WaterReminderWidgetRoutes,
  ...ForexWidgetRoutes,
  ...NoteWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
