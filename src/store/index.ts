import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

interface MenuItem {
    key: string,
    label: string,
    url: string,
}

interface IconItem {
    url: string,
    link: string,
    label: string,
}

export interface State {
    audioStatus: boolean,
    noices: string[],
    menuList: MenuItem[],
    theme: string,
    iconList: IconItem[],
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        audioStatus: false,
        noices: ['<span class="text">S</span>', 'C', 'R', 'O', 'L', 'L', '&nbsp', 'T', 'O', '&nbsp', 'D', 'I', 'S', 'C', 'O', 'V', 'E', 'R'],
        menuList: [
            { key: 'home', label: 'Home', url: '/home' },
            { key: 'blog', label: 'My Blog', url: '/blog' },
            // { key: 'timeline', label: 'Timeline', url: '/timeline' },
            { key: 'coolcase', label: 'Cool Case', url: '/case' },
            { key: 'collection', label: 'My Collection', url: '/collection' },
            { key: 'theme', label: 'Custom Theme', url: '/theme' },
            // { key: 'sugar', label: 'The Beauty Of Data', url: '/sugar' },
            { key: 'three', label: 'Three Test', url: '/three' },
        ],
        theme: '',
        iconList: [
            { url: '/src/assets/images/about/vite.svg', link: 'https://vitejs.cn/', label: 'Vite' },
            { url: '/src/assets/images/about/vue.svg', link: 'https://vuejs.org/', label: 'Vue' },
            { url: '/src/assets/images/about/gsap.ico', link: 'https://greensock.com/', label: 'GreenSock' },
            { url: '/src/assets/images/about/threejs_white.ico', link: 'https://threejs.org/', label: 'Three.js' },
            { url: '/src/assets/images/about/elementplus.svg', link: 'https://element-plus.gitee.io/zh-CN/', label: 'Element Plus' },
        ],
    },
    mutations,
    actions,
    modules,
})

export function useStore() {
    return baseUseStore(key)
}
