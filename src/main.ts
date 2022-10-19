import { createApp, App as Application } from "vue";
import App from "./App.vue";
import 'element-plus/dist/index.css'
import "@/style/index.scss";
import router from "./router";
import { store, key } from "./store/index.js";
import "@/assets/fonts/iconfont.css";
import "@/assets/fonts/iconfont.js";
import directives from "./directives";

import VMdEditor from '@kangc/v-md-editor';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

VMdEditor.xss.extend({
  whiteList: {
    source: [],
    iframe: ['src', 'width', 'height'],
  },
})
VMdEditor.use(vuepressTheme)


let app: Application = createApp(App).use(router).use(store, key).use(VMdEditor);

Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key]);
});

app.mount("#app");
