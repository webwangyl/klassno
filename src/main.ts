import { createApp, App as Application } from "vue";
import App from "./App.vue";
import 'element-plus/dist/index.css'
import "@/style/index.scss";
import router from "./router";
import { store, key } from "./store/index.js";
import "@/assets/fonts/iconfont.css";
import "@/assets/fonts/iconfont.js";
import directives from "./directives";

let app: Application = createApp(App).use(router).use(store, key);

Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key]);
});

app.mount("#app");
