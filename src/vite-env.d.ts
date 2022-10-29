/// <reference types="vite/client" />
/// <reference path="node_modules/@types/three/src/Three.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@kangc/v-md-editor/lib/preview-html'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module 'dat.gui';
