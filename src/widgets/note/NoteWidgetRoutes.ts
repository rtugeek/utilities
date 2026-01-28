import type { RouteRecordRaw } from 'vue-router'
import NoteWidget from './Note.widget'

const path = NoteWidget.path
const name = NoteWidget.name

const NoteWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () => import('./NoteWidgetView.vue'),
  },
]

export default NoteWidgetRoutes
