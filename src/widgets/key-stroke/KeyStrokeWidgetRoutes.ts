import type { RouteRecordRaw } from 'vue-router';
import KeyStrokeWidget from './KeyStroke.widget';

const path = KeyStrokeWidget.path;
const name = KeyStrokeWidget.name;

const KeyStrokeWidgetRoutes: RouteRecordRaw[] = [
  {
    path: path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "cn.example.widget.key_stroke" */ './KeyStrokeWidgetView.vue'
      ),
  },
];

export default KeyStrokeWidgetRoutes;
