import { createApp, App as Application } from "vue";
import VMDPreview from '@kangc/v-md-editor/lib/preview'
import createCopyCodePreview from '@kangc/v-md-editor/lib/plugins/copy-code/preview';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import App from "./App.vue";
import 'element-plus/dist/index.css'
import "@/style/index.scss";
import router from "./router";
import { store, key } from "./store/index.js";
import "@/assets/fonts/iconfont.css";
import "@/assets/fonts/iconfont.js";
import directives from "./directives";

VMDPreview.use(vuepressTheme)
VMDPreview.use(createCopyCodePreview())

let app: Application = createApp(App).use(router).use(store, key).use(VMDPreview);

Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key]);
});

app.mount("#app");
