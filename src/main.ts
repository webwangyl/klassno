import { createApp } from 'vue'
import App from './App.vue'
import '@/style/index.scss'
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
createApp(App).mount('#app')
