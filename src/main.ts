import { createApp } from 'vue'
import App from './App.vue'
import '@/style/index.scss'
import router from './router'
import { store, key } from './store/index.js'

createApp(App).use(router).use(store, key).mount('#app')
